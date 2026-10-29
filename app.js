let DATA;
const main = document.querySelector('main');
const DONATE = 'https://whydonate.com/es/fundraising/encuentro-antimilitarismo-desde-abajo-resistencias-a-la-militarizacion?v=16fcfyo';
const categories = {novedades:1, articulos:258, comunicados:40, multimedia:259};
const labels = {novedades:'Novedades',articulos:'Artículos',comunicados:'Comunicados',multimedia:'Multimedia'};
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const date = s => new Date(s+'T12:00:00').toLocaleDateString('es',{day:'numeric',month:'long',year:'numeric'});
const post = id => DATA.posts.find(p=>p.id===id);
const page = id => DATA.pages.find(p=>p.id===id);
const path = p => '#/publicacion/'+p.slug;
const external = (url,text,cls='') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const link = (url,text) => `<a class="text-link" href="${url}">${text} <span aria-hidden="true">↗</span></a>`;
const image = (p,format=false) => p.image ? `<a class="card-img" href="${path(p)}"><img src="${p.image}" alt="${esc(p.title)}" loading="lazy">${format&&p.format?`<span class="format-label">${esc(p.format)}</span>`:''}</a>` : `<a class="no-image" href="${path(p)}"><b>${esc(p.format || 'RAMALC')}</b><span aria-hidden="true">↙</span></a>`;
function card(p,{excerpt=true,format=false}={}){
  return `<article class="card">${image(p,format)}<div class="card-copy"><div class="meta"><time datetime="${p.date}">${date(p.date)}</time>${p.format?`<span class="dot">${esc(p.format)}</span>`:''}</div><h3><a href="${path(p)}">${esc(p.title)}</a></h3>${excerpt&&p.excerpt?`<p>${esc(p.excerpt)}</p>`:''}<a class="read" href="${path(p)}">Leer publicación <span aria-hidden="true">↗</span></a></div></article>`;
}
const sectionBar = (n,title,url,action='Ver todas') => `<div class="section-bar"><h2><span class="index">${n}</span>${title}</h2>${link(url,action)}</div>`;
function campaignStrip(){return `<aside class="campaign-strip"><div><p class="eyebrow">Encuentro Regional RAMALC 2026</p><h2>¡Súmate y ayúdanos a hacer posible este encuentro!</h2></div>${external(DONATE,'Aportar en WhyDonate <span>↗</span>','button')}</aside>`;}
const sign = (kind) => {
  const shapes = {
    seed: '<path d="M50 90V43M50 65C18 65 15 39 15 27c25 0 35 15 35 38ZM50 48c0-29 19-35 37-35 0 25-13 35-37 35Z"/><path d="M18 91h65"/>',
    sun: '<circle cx="50" cy="48" r="22"/><path d="M50 8v9M50 79v12M9 48h10M81 48h10M20 17l8 8M73 72l8 8M20 80l8-8M74 24l8-8"/>',
    waves: '<path d="M8 32q14-18 28 0t28 0t28 0M8 53q14-18 28 0t28 0t28 0M8 74q14-18 28 0t28 0t28 0"/>',
    book: '<path d="M50 82V23Q32 9 10 17v57q22-8 40 8Zm0 0V23q18-14 40-6v57q-22-8-40 8Z"/><path d="M22 32l16 4M22 46l16 4M63 36l15-4M63 50l15-4"/>',
    compass: '<path d="M50 9v82M9 50h82M50 9l-8 14M50 9l8 14M50 91l-8-14M50 91l8-14"/><circle cx="50" cy="50" r="14"/>'
  };
  return `<svg class="constructive-sign" viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${shapes[kind]||shapes.seed}</svg>`;
};
function home(){
  const meet=post(1701);
  const news=DATA.posts.filter(p=>p.categories.includes(1)&&p.id!==1701).slice(0,3);
  const media=[post(1415),post(675),post(450)];
  const intro=page(31).body.match(/<p[^>]*>(.*?)<\/p>/s)?.[1] || '';
  main.innerHTML=`<div class="wrapper"><div class="intro-line"><span>América Latina y el Caribe</span><span>Nuestro norte es el sur <b class="sur" aria-hidden="true">↙</b></span></div>
  <section class="sur-mosaic" aria-labelledby="hero-title">
    <a class="mosaic-map" href="#/red"><div class="map-title"><span class="eyebrow">RAMALC</span><h2>Nuestro norte<br>es el sur.</h2></div><img src="assets/mapa-sur-referencia.png" alt="Mapa de América del Sur invertido, con el Polo Sur arriba y Ecuador abajo"><span class="map-link">La red <span>↗</span></span></a>
    <div class="mosaic-call"><span class="eyebrow">Encuentro Regional RAMALC 2026</span><h1 id="hero-title">Hoy queremos<br>volver a encontrarnos!</h1><p>${esc(meet.excerpt)}</p><div class="actions">${external(DONATE,'Apoya el encuentro <span>↗</span>','button')}${link('#/encuentro','Conoce el encuentro')}</div></div>
    <a class="mosaic-poster" href="#/encuentro"><img src="${DATA.poster}" alt="Encuentro Regional RAMALC 2026. Antimilitarismo desde abajo: Comunidades, territorios y resistencias frente a la militarización hemisférica."></a>
    <div class="mosaic-seed" aria-hidden="true">${sign('seed')}</div>
    <div class="mosaic-message"><h2>Fortalezcamos las resistencias antimilitaristas en América Latina y el Caribe</h2>${link('#/encuentro','¿Por qué necesitamos tu apoyo?')}</div>
    <div class="mosaic-compass" aria-hidden="true">${sign('compass')}<b>SUR</b></div>
    <a class="mosaic-principle nonviolence" href="#/red">${sign('sun')}<span>Noviolencia ↗</span></a>
    <a class="mosaic-principle objection" href="#/multimedia"><span>Objeción<br>de conciencia ↗</span>${sign('waves')}</a>
    <a class="mosaic-principle antimilitarism" href="#/articulos">${sign('seed')}<span>Antimilitarismo ↗</span></a>
  </section>
  ${sectionBar('01','Novedades','#/novedades')}<section class="home-news" aria-label="Últimas publicaciones">${news.map(p=>card(p)).join('')}</section>
  <section class="edition-feature" aria-label="Revista Rompiendo Filas"><div class="edition-title">${sign('book')}<p class="eyebrow">Ediciones RAMALC</p><h2>Rompiendo<br>Filas</h2>${link('#/rompiendo-filas','Todas las ediciones')}</div><a class="edition-cover" href="#/rompiendo-filas"><img src="${DATA.cover}" alt="Portada de Rompiendo Filas Nº4, 2026" loading="lazy"></a><div class="edition-copy"><span class="eyebrow">Rompiendo Filas Nº4 | 2026</span><h3>YA DISPONIBLE:<br>ROMPIENDO<br>FILAS 04</h3><a class="button" href="#/rompiendo-filas">Ver edición y descarga <span>↗</span></a></div></section>
  ${sectionBar('02','Multimedia','#/multimedia','Ver archivo')}<section class="media-home" aria-label="Multimedia">${media.map(p=>card(p,{format:true})).join('')}</section>
  <section class="network-strip"><div class="network-symbol"><h2>Nuestro<br>norte<br>es el sur.</h2><img src="assets/mapa-sur-referencia.png" alt="Mapa de América del Sur invertido, con el Polo Sur arriba y Ecuador abajo" loading="lazy"></div><div class="network-copy"><p>${intro}</p>${link('#/red','COLECTIVXS RAMALC')}</div></section></div>${campaignStrip()}`;
}
function heading(title,kicker='RAMALC',n=''){return `<div class="page-heading"><div><p class="eyebrow">${kicker}</p><h1>${title}</h1></div>${n?`<span class="page-number" aria-hidden="true">${n}</span>`:''}</div>`;}
function archive(route){
  const isSearch=route==='buscar';
  const collection=isSearch?DATA.posts:DATA.posts.filter(p=>p.categories.includes(categories[route]));
  main.innerHTML=`<div class="wrapper">${heading(isSearch?'Buscar':labels[route],isSearch?'Archivo RAMALC':'Red Antimilitarista de América Latina y el Caribe',route==='multimedia'?'↙':'')}${route==='multimedia'?`<div class="section-bar" style="margin-top:0"><span class="eyebrow">Encuentro Regional RAMALC 2026</span>${link('#/encuentro','Apoya el encuentro')}</div>`:''}<div class="tools"><label class="search-box"><span aria-hidden="true">⌕</span><input id="search" type="search" aria-label="Buscar publicaciones" placeholder="Buscar en ${isSearch?'RAMALC':labels[route].toLowerCase()}…"></label><select id="filter" aria-label="${route==='multimedia'?'Filtrar por formato':'Orden de publicaciones'}">${route==='multimedia'?'<option value="">Todos los formatos</option><option>Video</option><option>Audio</option><option>Fotografías</option>':'<option value="new">Más recientes primero</option><option value="old">Más antiguas primero</option>'}</select></div><p class="results-note" id="results-note" aria-live="polite"></p><section id="archive-results" class="archive-grid" aria-label="Publicaciones"></section><div class="more-wrap"><button id="more" class="button">Ver más publicaciones <span>＋</span></button></div></div>`;
  let limit=12;
  const render=()=>{
    const query=normalize(document.querySelector('#search').value.trim());
    const filter=document.querySelector('#filter').value;
    let results=collection.filter(p=>(!query||normalize(p.title+' '+p.excerpt).includes(query))&&(route!=='multimedia'||!filter||p.format===filter));
    if(filter==='old')results=[...results].reverse();
    document.querySelector('#results-note').textContent=results.length+' publicaciones';
    document.querySelector('#archive-results').innerHTML=results.length?results.slice(0,limit).map(p=>card(p,{format:true})).join(''):'<p class="empty">No se encontraron publicaciones.</p>';
    document.querySelector('#more').hidden=results.length<=limit;
  };
  document.querySelector('#search').addEventListener('input',()=>{limit=12;render()});
  document.querySelector('#filter').addEventListener('change',()=>{limit=12;render()});
  document.querySelector('#more').addEventListener('click',()=>{limit+=12;render()});render();
}
function article(slug){
  const p=DATA.posts.find(x=>x.slug===slug);
  if(!p){notFound();return;}
  const label=p.categories.includes(259)?'Multimedia':p.categories.includes(258)?'Artículos':p.categories.includes(40)?'Comunicados':'Novedades';
  const key=Object.keys(labels).find(k=>labels[k]===label);
  main.innerHTML=`<div class="wrapper"><div class="article-top"><a href="#/${key}">← ${label}</a>${external(p.url,'Publicación original ↗')}</div><div class="article-layout"><aside class="article-side"><p class="eyebrow">${label}</p><p><time datetime="${p.date}">${date(p.date)}</time></p>${p.format?`<p>${p.format}</p>`:''}${external(p.url,'Ver en ramalc.org ↗')}<a href="#/encuentro">Encuentro RAMALC 2026 ↗</a></aside><article class="article-main"><h1>${esc(p.title)}</h1>${p.image?`<img class="article-cover" src="${p.image}" alt="${esc(p.title)}">`:''}<div class="prose">${p.body}</div><div class="article-end">${external(p.url,'Leer publicación original <span>↗</span>','button')}</div></article></div></div>${campaignStrip()}`;
}
function encuentro(){
  const p=post(1701);
  main.innerHTML=`<div class="wrapper">${heading('Antimilitarismo<br>desde abajo','Encuentro Regional RAMALC 2026','↙')}<img class="encuentro-poster" src="${DATA.poster}" alt="Antimilitarismo desde abajo: Comunidades, territorios y resistencias frente a la militarización hemisférica."><div class="encuentro-layout"><article class="prose encuentro-body">${p.body}<div class="article-end">${external(p.url,'Publicación original ↗')}</div></article><aside class="donation-panel"><span class="eyebrow">Encuentro RAMALC 2026</span><h2>¿Por qué necesitamos tu apoyo?</h2><p>Tu aporte contribuirá a cubrir necesidades de traslado, alojamiento, alimentación, materiales y otras actividades necesarias para hacer posible este espacio colectivo.</p>${external(DONATE,'Aportar en WhyDonate <span>↗</span>','button')}<p class="small">${external(DONATE,'Ver campaña de recaudación ↗')}</p></aside></div></div>`;
}
function editions(route){
  const p=page(route==='publicaciones'?1366:33);
  main.innerHTML=`<div class="wrapper">${heading(esc(p.title),'Ediciones RAMALC')}<div class="tools">${link('#/rompiendo-filas','Rompiendo Filas')}${link('#/publicaciones','Publicaciones')}</div><div class="prose">${p.body}</div><div class="article-end" style="margin-bottom:60px">${external(p.url,'Ver página original ↗')}</div></div>${campaignStrip()}`;
}
function red(){
  const p=page(31);
  main.innerHTML=`<div class="wrapper">${heading('La red','Red Antimilitarista de América Latina y el Caribe','↙')}<div class="red-layout"><aside class="red-statement">Nuestro<br>norte<br>es el sur.<img src="assets/mapa-sur-referencia.png" alt="Mapa de América del Sur invertido"></aside><article class="prose">${p.body}<div class="article-end">${external(p.url,'Ver página original ↗')}</div></article></div></div>${campaignStrip()}`;
}
function contact(){
  main.innerHTML=`<div class="wrapper">${heading('Contacto','Red Antimilitarista de América Latina y el Caribe')}<div class="contact-layout"><section class="contact-block"><h2>RAMALC</h2><a href="mailto:ramalc@riseup.net">ramalc@riseup.net ↗</a><p>Correo publicado en ${external(post(253).url,'Webinar RAMALC: ¿Son pacíficas las protestas que ocurren en Venezuela? ↗')}</p></section><section class="contact-block"><h2>COLECTIVXS<br>RAMALC</h2>${link('#/red','Ver contactos de la red')}<p>${external('https://www.instagram.com/redramalc/','Instagram ↗')}</p><p>${external('https://www.facebook.com/Red-Antimilitarista-de-America-Latina-y-el-Caribe-RAMALC-1421886927880165','Facebook ↗')}</p></section></div></div>${campaignStrip()}`;
}
function notFound(){main.innerHTML='<div class="wrapper">'+heading('Página no encontrada')+'<p class="empty"><a href="#/">Volver al inicio ↗</a></p></div>';}
function route(){
  const [section='',slug='']=(location.hash.replace(/^#\/?/,'')).split('/');
  document.querySelectorAll('nav a').forEach(a=>{a.removeAttribute('aria-current');if(a.hash==='#/'+section)a.setAttribute('aria-current','page')});
  document.querySelector('nav').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
  if(!section)home();
  else if(categories[section]||section==='buscar')archive(section);
  else if(section==='publicacion')article(slug);
  else if(section==='encuentro')encuentro();
  else if(['ediciones','rompiendo-filas','publicaciones'].includes(section))editions(section);
  else if(section==='red')red();
  else if(section==='contacto')contact();
  else notFound();
  document.title=(main.querySelector('h1')?.innerText.replace(/\s+/g,' ').trim()||'Nuestro norte es el sur')+' — RAMALC';
  window.scrollTo(0,0);
}
document.querySelector('.menu-toggle').addEventListener('click',e=>{const b=e.currentTarget;const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open)});
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();main.scrollIntoView()});
document.addEventListener('error',e=>{if(e.target.tagName==='IMG')e.target.classList.add('image-error')},true);
fetch('data.json').then(r=>{if(!r.ok)throw Error('Datos no disponibles');return r.json()}).then(data=>{DATA=data;document.querySelector('#logo').src=DATA.logo;const search=document.createElement('a');search.href='#/buscar';search.textContent='Buscar';document.querySelector('nav').append(search);window.addEventListener('hashchange',route);route()}).catch(()=>{main.innerHTML='<div class="wrapper"><p class="empty">No se pudo cargar el archivo. <a href="https://ramalc.org/">Visitar ramalc.org ↗</a></p></div>'});
