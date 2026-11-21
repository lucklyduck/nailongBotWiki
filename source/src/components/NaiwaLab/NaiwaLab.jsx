import React, {useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './NaiwaLab.module.css';

/** Wrap the existing homepage hero. Keep the rest of the Wiki outside this component. */
export default function NaiwaLab({children, mascotSrc}) {
  const [open,setOpen]=useState(false);
  const [height,setHeight]=useState(760);
  const iframe=useRef(null),trigger=useRef(null);
  const src=useBaseUrl('/games/naiwa-lab/index.html?embed=1');
  const close=()=>{setOpen(false);requestAnimationFrame(()=>trigger.current?.focus());};
  useEffect(()=>{
    const receive=event=>{
      if(event.origin!==window.location.origin||event.source!==iframe.current?.contentWindow)return;
      if(event.data?.type==='naiwa-lab:resize'&&Number.isFinite(event.data.height))setHeight(Math.min(2400,Math.max(420,event.data.height)));
      if(event.data?.type==='naiwa-lab:close')close();
    };
    window.addEventListener('message',receive);
    return()=>window.removeEventListener('message',receive);
  },[]);
  return <div className={styles.root}>
    <div hidden={open}>
      {children}
      <button ref={trigger} className={styles.trigger} onClick={()=>setOpen(true)} aria-expanded={open} aria-controls="naiwa-lab-frame">
        {mascotSrc&&<img src={mascotSrc} alt="奶蛙训练助手" />}
        <span>点一下试试</span>
      </button>
    </div>
    {open&&<section className={styles.game} aria-label="奶蛙奇点实验室">
      <div className={styles.toolbar}><span>奶蛙 · 奇点实验室</span><button onClick={close}>返回 Wiki ↗</button></div>
      <iframe ref={iframe} id="naiwa-lab-frame" src={src} title="奶蛙奇点实验室小游戏" style={{height}} />
    </section>}
  </div>;
}
