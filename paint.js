// Decorative paper and brush work stays separate from source text and images.
(() => {
  const ns='http://www.w3.org/2000/svg';
  const selectors='.sur-mosaic,.inner-masthead,.format-mosaic,.constructive-archive,.edition-navigation,.edition-feature,.network-strip,.home-news,.media-home,.article-layout,.contact-layout,.red-layout,.encuentro-layout,.campaign-strip,.edition-archive>.wp-block-columns';
  let pending=0;
  let symbolNumber=0;
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
  function svgNode(tag,attributes={}){
    const node=document.createElementNS(ns,tag);
    for(const [name,value] of Object.entries(attributes))node.setAttribute(name,String(value));
    return node;
  }
  // Sample the existing geometry rather than replace the symbol vocabulary.
  function brushContour(geometry,seed){
    const length=geometry.getTotalLength();
    if(length<.1)return null;
    const first=geometry.getPointAtLength(0),last=geometry.getPointAtLength(length);
    const closed=Math.hypot(first.x-last.x,first.y-last.y)<.3;
    const steps=Math.max(8,Math.ceil(length/2.2));
    const top=[],bottom=[],grain=[];
    const coordinate=(x,y)=>x.toFixed(2)+','+y.toFixed(2);
    for(let i=0;i<=steps;i++){
      const distance=length*i/steps;
      const sample=closed&&i===steps?0:i;
      const at=geometry.getPointAtLength(distance);
      const before=geometry.getPointAtLength(closed?(distance-.3+length)%length:Math.max(0,distance-.3));
      const after=geometry.getPointAtLength(closed?(distance+.3)%length:Math.min(length,distance+.3));
      const norm=Math.hypot(after.x-before.x,after.y-before.y)||1;
      const nx=-(after.y-before.y)/norm,ny=(after.x-before.x)/norm;
      const envelope=closed?1:Math.sin(Math.PI*i/steps);
      const drift=(Math.sin(sample*.31+seed)*.55+Math.sin(sample*.83+seed*2)*.24)*envelope;
      const pressure=3.2+Math.sin(sample*.27+seed)*.48+Math.cos(sample*.69+seed)*.23;
      const edgeA=Math.sin(sample*1.87+seed)*.26;
      const edgeB=Math.cos(sample*1.51+seed)*.29;
      top.push(coordinate(at.x+nx*(pressure+drift+edgeA),at.y+ny*(pressure+drift+edgeA)));
      bottom.unshift(coordinate(at.x-nx*(pressure-drift+edgeB),at.y-ny*(pressure-drift+edgeB)));
      // Dry brush fibres follow the stroke and reveal the colored paper below.
      if(i>1&&i<steps-1&&i%5===2){
        const offset=Math.sin(i*.67+seed)*1.9;
        const x=at.x+nx*offset,y=at.y+ny*offset;
        const tx=ny,ty=-nx;
        const fibre=1.3+Math.abs(Math.sin(i+seed))*2;
        grain.push('M'+coordinate(x,y)+'l'+coordinate(tx*fibre,ty*fibre));
      }
    }
    return {outline:'M'+top.join('L')+'L'+bottom.join('L')+'Z',grain:grain.join('')};
  }
  function paintSymbols(){
    for(const symbol of document.querySelectorAll('.constructive-sign:not([data-hand-painted])')){
      const source=symbol.querySelector('.symbol-source');
      if(!source)continue;
      const temp=svgNode('g',{'aria-hidden':'true',opacity:0});
      const outlines=[],fibres=[];
      const seed=[...(symbol.dataset.symbol||'seed')].reduce((n,c)=>n+c.charCodeAt(0),0);
      symbol.append(temp);
      try{
        let part=0;
        for(const original of source.querySelectorAll('path,circle,rect')){
          const geometries=original.tagName.toLowerCase()==='path'
            ?(original.getAttribute('d').match(/[Mm][^Mm]*/g)||[]).map(d=>svgNode('path',{d}))
            :[original.cloneNode(true)];
          for(const geometry of geometries){
            temp.append(geometry);
            const stroke=brushContour(geometry,seed+part++*1.73);
            if(stroke){outlines.push(stroke.outline);fibres.push(stroke.grain)}
          }
        }
        if(outlines.length){
          const id='ramalc-symbol-paper-'+(++symbolNumber);
          const defs=svgNode('defs'),mask=svgNode('mask',{id,maskUnits:'userSpaceOnUse',x:-6,y:-6,width:112,height:112});
          mask.append(svgNode('rect',{x:-6,y:-6,width:112,height:112,fill:'#fff'}));
          mask.append(svgNode('path',{d:fibres.join(''),fill:'none',stroke:'#000','stroke-opacity':.38,'stroke-width':.7,'stroke-linecap':'round'}));
          defs.append(mask);
          const ink=svgNode('g',{class:'symbol-ink',fill:'currentColor',stroke:'none',mask:'url(#'+id+')'});
          for(const d of outlines)ink.append(svgNode('path',{d}));
          symbol.append(defs,ink);
          symbol.setAttribute('data-hand-painted','true');
        }
      }catch{
        // Retain the original SVG if geometry measurement is unavailable.
      }finally{temp.remove()}
    }
  }
  function paint(){
    paintSymbols();
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
