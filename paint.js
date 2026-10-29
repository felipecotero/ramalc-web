// Decorative paper and brush work stays separate from source text and images.
(() => {
  const ns='http://www.w3.org/2000/svg';
  const selectors='.sur-mosaic,.inner-masthead,.format-mosaic,.constructive-archive,.edition-navigation,.edition-feature,.network-strip,.home-news,.media-home,.article-layout,.contact-layout,.red-layout,.encuentro-layout,.campaign-strip,.edition-archive>.wp-block-columns';
  let pending=0;
  const observed=new WeakSet();
  const observer=new ResizeObserver(schedule);
  function schedule(){
    if(pending)return;
    pending=requestAnimationFrame(()=>{pending=0;paint()});
  }
  function pigment(x1,y1,x2,y2,seed){
    const length=Math.hypot(x2-x1,y2-y1);
    if(length<1)return '';
    const nx=-(y2-y1)/length,ny=(x2-x1)/length;
    const steps=Math.max(2,Math.ceil(length/11));
    const top=[],bottom=[];
    for(let i=0;i<=steps;i++){
      const t=i/steps,x=x1+(x2-x1)*t,y=y1+(y2-y1)*t;
      const taper=(i===0||i===steps)?0.87:1;
      const a=(4.5+Math.sin(i*1.79+seed)*.7+Math.sin(i*.53+seed*2)*.55)*taper;
      const b=(4.5+Math.sin(i*1.31+seed+2)*.65+Math.cos(i*.71+seed)*.6)*taper;
      top.push([x+nx*a,y+ny*a]);bottom.unshift([x-nx*b,y-ny*b]);
    }
    return 'M'+top.concat(bottom).map(p=>p.map(v=>v.toFixed(2)).join(',')).join('L')+'Z';
  }
  function paint(){
    for(const surface of document.querySelectorAll(selectors)){
      surface.classList.add('brush-surface');
      if(!observed.has(surface)){observer.observe(surface);observed.add(surface)}
      let overlay=[...surface.children].find(x=>x.classList.contains('brush-overlay'));
      if(!overlay){overlay=document.createElementNS(ns,'svg');overlay.setAttribute('class','brush-overlay');overlay.setAttribute('aria-hidden','true');overlay.setAttribute('focusable','false');surface.append(overlay)}
      const bounds=surface.getBoundingClientRect();
      if(bounds.width<1||bounds.height<1)continue;
      const horizontal=new Map(),vertical=new Map();
      function line(axis,at,from,to){
        const key=(Math.round(at*2)/2).toFixed(1);
        const map=axis==='h'?horizontal:vertical;
        if(!map.has(key))map.set(key,[]);
        map.get(key).push([Math.min(from,to),Math.max(from,to)]);
      }
      const box=getComputedStyle(surface);
      const insetLeft=parseFloat(box.borderLeftWidth)||0,insetTop=parseFloat(box.borderTopWidth)||0;
      // SVG absolute coordinates start inside the containing block's border.
      const width=surface.clientWidth,height=surface.clientHeight;
      const originX=bounds.left+insetLeft,originY=bounds.top+insetTop;
      overlay.setAttribute('viewBox',`0 0 ${width} ${height}`);
      for(const child of surface.children){
        if(child===overlay||getComputedStyle(child).display==='none')continue;
        const r=child.getBoundingClientRect();
        if(!r.width||!r.height)continue;
        const l=r.left-originX-4.5,t=r.top-originY-4.5;
        const rr=r.right-originX+4.5,bb=r.bottom-originY+4.5;
        line('h',t,l,rr);line('h',bb,l,rr);line('v',l,t,bb);line('v',rr,t,bb);
      }
      for(const child of surface.querySelectorAll('*')){
        if(child.closest('.brush-overlay')||child.closest('.brush-surface')!==surface)continue;
        const s=getComputedStyle(child),r=child.getBoundingClientRect();
        if(!r.width||!r.height)continue;
        let painted=false;
        for(const side of ['Top','Right','Bottom','Left']){
          const w=parseFloat(s[`border${side}Width`]);
          if(w<8)continue;
          painted=true;
          const l=r.left-originX,rr=r.right-originX,t=r.top-originY,b=r.bottom-originY;
          if(side==='Top')line('h',t+w/2,l,rr);
          if(side==='Bottom')line('h',b-w/2,l,rr);
          if(side==='Left')line('v',l+w/2,t,b);
          if(side==='Right')line('v',rr-w/2,t,b);
        }
        if(painted)child.classList.add('brush-bordered');
      }
      let paths='',seed=1;
      for(const [axis,map] of [['h',horizontal],['v',vertical]]){
        for(const [position,segments] of map){
          const sorted=segments.sort((a,b)=>a[0]-b[0]);
          const merged=[];
          for(const segment of sorted){
            const last=merged[merged.length-1];
            if(last&&segment[0]<=last[1]+2)last[1]=Math.max(last[1],segment[1]);
            else merged.push([...segment]);
          }
          for(const [start,end] of merged){
            const at=Number(position);
            paths+=axis==='h'?pigment(start,at,end,at,seed++):pigment(at,start,at,end,seed++);
          }
        }
      }
      const signature=width+':'+height+':'+paths;
      if(overlay.dataset.signature!==signature){
        const path=document.createElementNS(ns,'path');
        path.setAttribute('d',paths);overlay.replaceChildren(path);overlay.dataset.signature=signature;
      }
    }
  }
  document.addEventListener('ramalc:layout',schedule);
  document.addEventListener('load',schedule,true);
  window.addEventListener('resize',schedule);
  for(const target of [document.querySelector('main'),document.querySelector('header')])if(target)observer.observe(target);
  schedule();
})();
