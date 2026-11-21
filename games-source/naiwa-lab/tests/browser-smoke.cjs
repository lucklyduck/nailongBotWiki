'use strict';
// Optional, dependency-free CDP test. Requires Node >=22 and BROWSER_PATH.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {spawn}=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),delay=ms=>new Promise(r=>setTimeout(r,ms));
let server,proc,socket,watchdog;
(async()=>{
  assert(process.env.BROWSER_PATH&&fs.existsSync(process.env.BROWSER_PATH),'Set BROWSER_PATH to Chrome/Chromium executable.');
  assert(typeof WebSocket==='function','Browser smoke test requires Node.js 22 or newer.');
  const profile=path.join(root,'.qa','profile-'+Date.now());fs.mkdirSync(profile,{recursive:true});
  server=http.createServer((req,res)=>{
    let name;
    try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
    const file=name==='/'?path.join(root,'integration/plain-html.html'):path.resolve(root,'dist',name.replace(/^\/games\/naiwa-lab\//,''));
    const rel=path.relative(path.join(root,'dist'),file);
    if(name!=='/'&&(rel.startsWith('..')||path.isAbsolute(rel))){res.writeHead(403);res.end();return;}
    if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[path.extname(file)]||'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  proc=spawn(process.env.BROWSER_PATH,['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
  proc.on('error',e=>{console.error(e.message);process.exitCode=1;});
  watchdog=setTimeout(()=>{proc.kill();socket?.close();server.close();console.error('Browser test timed out');process.exit(1);},60000);
  const portFile=path.join(profile,'DevToolsActivePort');
  for(let i=0;i<50&&!fs.existsSync(portFile);i++)await delay(200);
  assert(fs.existsSync(portFile),'Chrome did not expose its debugging port.');
  const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
  const tabs=await(await fetch('http://127.0.0.1:'+port+'/json')).json();
  socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  let seq=0;const pending=new Map(),errors=[];
  socket.onmessage=e=>{const msg=JSON.parse(e.data);if(msg.id&&pending.has(msg.id)){const p=pending.get(msg.id);pending.delete(msg.id);clearTimeout(p.timer);msg.error?p.reject(Error(JSON.stringify(msg.error))):p.resolve(msg.result);}if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.text);};
  const cmd=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method));},12000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params}));});
  const js=async expression=>{const r=await cmd('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const game=expression=>js('document.querySelector("iframe").contentWindow.eval('+JSON.stringify(expression)+')');
  const ready=async()=>{for(let i=0;i<60;i++){if(await js('!!document.querySelector("iframe")?.contentWindow.RogueLab')&&await game('!!document.getElementById("stock").textContent'))return;await delay(100);}throw Error('Game iframe did not initialize');};
  await cmd('Runtime.enable');await cmd('Page.enable');
  await cmd('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await cmd('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/'});await delay(300);
  assert.equal(await js('document.querySelectorAll("iframe").length'),0,'Load game only after entry click');
  await js('document.getElementById("open").click()');await ready();await delay(300);
  assert.equal(await game('getComputedStyle(document.querySelector(".site-nav")).display'),'none');
  assert.equal(await game('getComputedStyle(document.getElementById("game")).display'),'block');
  assert.equal(await game('s.stock'),4);
  await game('document.querySelector("[data-choose]").click()');assert.equal(await game('s.freeClaimed'),true);
  await game('document.getElementById("initialize").click()');
  await game('document.getElementById("train").click()');await delay(800);assert.equal(await game('s.model.level'),1);
  await game('location.reload()');await delay(500);await ready();assert.equal(await game('s.model.level'),1);
  assert.equal(await game('s.stock'),3);assert.equal(await game('s.hexes.length'),1);
  for(const width of [1440,390]){
    await cmd('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<600});await delay(350);
    if(width<600){await game('setTab("hex")');await delay(250);}
    const heights=await js('({frame:parseFloat(document.querySelector("iframe").style.height),game:document.querySelector("iframe").contentDocument.getElementById("game").getBoundingClientRect().height})');
    assert(Math.abs(heights.frame-Math.min(2400,Math.max(420,Math.ceil(heights.game))))<=1,'Height message at '+width);
    assert(await js('document.documentElement.scrollWidth<=innerWidth'),'Parent overflow at '+width);
    assert(await game('document.documentElement.scrollWidth<=innerWidth'),'Iframe overflow at '+width);
    const shot=await cmd('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(root,'.qa','embed-'+width+'.png'),Buffer.from(shot.data,'base64'));
  }
  await game('document.getElementById("exit").click()');await delay(150);
  assert.equal(await js('document.querySelectorAll("iframe").length'),0);assert.equal(await js('document.getElementById("hero").hidden'),false);
  await js('document.getElementById("open").click()');await ready();assert.equal(await game('s.model.level'),1);
  await js('document.getElementById("close").click()');assert.equal(await js('document.querySelectorAll("iframe").length'),0);
  assert.deepEqual(errors,[]);console.log('PASS: lazy iframe, embed mode, training, free choice, reload/reopen persistence, desktop/mobile height, both close controls, no JS exceptions');
  await cmd('Browser.close');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>{clearTimeout(watchdog);socket?.close();proc?.kill();server?.close();});
