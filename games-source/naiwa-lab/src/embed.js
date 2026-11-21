/* Same-origin Wiki integration; inactive for normal standalone play. */
(()=>{
  if(new URLSearchParams(location.search).get('embed')!=='1'||parent===window)return;
  const style=document.createElement('style');
  style.textContent='.site-nav,.wiki-placeholder,#entry{display:none!important}body{overflow:hidden}#game{display:block!important}.lab{max-width:none}';
  document.head.append(style);
  let pending=false,lastHeight=0;
  const send=()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;const height=Math.ceil(document.getElementById('game').getBoundingClientRect().height);if(height===lastHeight)return;lastHeight=height;parent.postMessage({type:'naiwa-lab:resize',height},location.origin);});};
  new ResizeObserver(send).observe(document.getElementById('game'));
  window.addEventListener('resize',send);send();
  document.getElementById('exit').addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();parent.postMessage({type:'naiwa-lab:close'},location.origin);},true);
})();
