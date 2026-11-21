'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../dist'),port=Number(process.env.PORT||4173);
if(!fs.existsSync(path.join(root,'index.html'))){console.error('Run npm run build first.');process.exit(1);}
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav'};
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
const target=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));const relative=path.relative(root,target);
if(relative.startsWith('..')||path.isAbsolute(relative)){res.writeHead(403);res.end();return;}
fs.stat(target,(err,info)=>{if(err||!info.isFile()){res.writeHead(404);res.end('Not found');return;}
res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(target).pipe(res);});
}).listen(port,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:'+port));
