const $=s=>document.querySelector(s);const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const D=window.DATA;const ITEM={};D.items.forEach(i=>ITEM[i.id]=i);const CH={};D.chapters.forEach(c=>CH[c.n]=c);const CALC={};CALCS.forEach(c=>CALC[c.id]=c);
const imgSrc=p=>(window.IMG&&IMG[p])||('img/p'+p+'.jpg');
const LS={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const SCALE_RX=/scale|score|criteria|classification|grading|grade|stages|severity|definition|index|formula|rule of|nomogram|bundle|toxidrome|syndrome|checklist|indication|contraindication|warning|differentiating|readiness|failure of|assessment|comparison|risk factor|prognos|ECG changes|START|Lund|Mallampati|quality indicators|normal/i;
function scaleRefs(){return D.items.filter(i=>SCALE_RX.test(i.cap)&&!/^causes/i.test(i.cap))}
function partOf(ch){return ch==='App'?'Appendices':(CH[ch]?CH[ch].part:'')}
function fav(key,title){const f=LS.get('fav',[]);const i=f.findIndex(x=>x.k===key);if(i>=0)f.splice(i,1);else f.unshift({k:key,t:title});LS.set('fav',f);render()}
function isFav(k){return LS.get('fav',[]).some(x=>x.k===k)}
function recent(key,title){let r=LS.get('rec',[]).filter(x=>x.k!==key);r.unshift({k:key,t:title});LS.set('rec',r.slice(0,12))}
function star(k,t){return `<button class="star" onclick="fav('${k}','${esc(t).replace(/'/g,"\\'")}')">${isFav(k)?'★':'☆'}</button>`}
function link(k,t){return `<a href="#${k}">${esc(t)}</a>`}
function itemCard(id){const it=ITEM[id];if(!it)return '';return `<details class="card fig"><summary><b>${esc(it.id)}</b> ${esc(it.cap)} <span class="cite">${esc(it.cht)} · p.${it.bk}</span></summary>${it.pages.map(p=>`<img loading="lazy" src="${imgSrc(p)}" alt="${esc(it.id)} page" onclick="zoom(this.src)">`).join('')}<div class="cite">Source: ICU Protocols (Chawla & Todi, 2012), ${esc(it.id)}, ${it.ch==='App'?'Appendices':'Ch '+it.ch+' '+esc(it.cht)}, p.${it.bk}. ${star('item/'+encodeURIComponent(id),it.id+' '+it.cap)}</div></details>`}
function zoom(src){$('#zoom').innerHTML=`<img src="${src}">`;$('#zoom').style.display='flex'}
function calcHTML(c){let h=`<div class="calc" id="c_${c.id}"><div class="ch"><b>${esc(c.name)}</b> ${star('calc/'+c.id,c.name)}</div><div class="cite">${esc(c.ref)}</div>`;
 if(c.type==='pts'){(c.groups||[]).forEach((g,gi)=>{h+=`<div class="grp"><div class="gl">${esc(g.l)}</div>`+g.o.map((o,oi)=>`<label><input type="radio" name="${c.id}_${gi}" value="${o[1]}" ${oi==0&&c.id!=='rass'&&c.id!=='sas'?'':''} onchange="calc('${c.id}')"> ${esc(o[0])} <i>(${o[1]>0&&c.id==='rass'?'+':''}${o[1]})</i></label>`).join('')+'</div>'});
  if(c.checks)h+='<div class="grp">'+c.checks.map((o,oi)=>`<label><input type="checkbox" data-v="${o[1]}" name="${c.id}_k" onchange="calc('${c.id}')"> ${esc(o[0])}${o[1]<10?` <i>(+${o[1]})</i>`:''}</label>`).join('')+'</div>'}
 else{h+='<div class="grp">'+c.inputs.map(i=>`<label class="num">${esc(i[0])}<input type="number" step="any" data-k="${i[1]}" oninput="calc('${c.id}')"></label>`).join('')+'</div>'}
 if(c.note)h+=`<div class="note">${esc(c.note)}</div>`;
 return h+`<div class="res" id="r_${c.id}">Enter values…</div><button class="reset" onclick="resetCalc('${c.id}')">Reset</button></div>`}
function calcValue(id,root=document){const c=CALC[id];const el=root.querySelector('#c_'+id);if(c.type==='pts'){let t=0,miss=0;(c.groups||[]).forEach((g,gi)=>{const s=el.querySelector(`input[name="${id}_${gi}"]:checked`);if(s)t+=+s.value;else miss++});el.querySelectorAll(`input[name="${id}_k"]:checked`).forEach(x=>t+=+x.dataset.v);return{t,miss}}
 const v={};let miss=0;el.querySelectorAll('input[data-k]').forEach(x=>{v[x.dataset.k]=x.value===''?NaN:+x.value;});return{v}}
function calc(id){const c=CALC[id];const r=calcValue(id);const out=$('#r_'+id);try{if(c.type==='pts'){out.innerHTML=(r.miss?`<span class="muted">${r.miss} item(s) not selected · </span>`:'')+'<b>Total: '+r.t+'</b><br>'+esc(c.interp(r.t))}else{const s=c.f(r.v);out.innerHTML=/NaN|Infinity/.test(s)?'<span class="muted">Fill in the required fields…</span><br>'+esc(s.replace(/NaN|Infinity/g,'–')):esc(s)}}catch(e){out.textContent='Fill in the fields…'}}
function resetCalc(id){document.querySelectorAll('#c_'+id+' input').forEach(i=>{i.checked=false;if(i.type==='number')i.value=''});$('#r_'+id).textContent='Enter values…'}
function stepsHTML(arr){if(!arr.length)return '';return `<h3>Across the book (${arr.length} related steps)</h3>`+arr.map(s=>`<details class="card"><summary>${esc(s.title)} <span class="cite">Ch ${s.ch} ${esc(s.cht)} · p.${s.bk}</span></summary><div class="txt">${s.html}</div></details>`).join('')}
const VIEWS={
home(){const fav=LS.get('fav',[]),rec=LS.get('rec',[]);return `<div class="hero"><h1>ICU Bundle</h1><p>Stepwise ICU reference from <i>ICU Protocols: A Stepwise Approach</i> (Chawla & Todi, ISCCM/ICCCM, Springer 2012)</p></div>
<div class="tiles">${D.topics.map(t=>`<a class="tile" href="#topic/${t.id}"><span class="ic">${t.icon}</span><b>${esc(t.t)}</b><small>${esc(t.sub)}</small></a>`).join('')}
<a class="tile" href="#calcs"><span class="ic">🧮</span><b>Calculators</b><small>${CALCS.length} interactive scores & formulae</small></a>
<a class="tile" href="#library"><span class="ic">📚</span><b>Protocol library</b><small>All ${D.chapters.length} chapters + appendices, stepwise</small></a></div>
${fav.length?'<h3>★ Favorites</h3><div class="chips">'+fav.map(f=>link(f.k,f.t)).join('')+'</div>':''}
${rec.length?'<h3>Recent</h3><div class="chips">'+rec.map(f=>link(f.k,f.t)).join('')+'</div>':''}
<div class="disc"><b>Disclaimer:</b> This app is a personal reference derived from the book “ICU Protocols: A Stepwise Approach” (2012). Content, doses and cut-offs are reproduced from the book and may be outdated relative to current guidelines. It does not replace clinical judgment, institutional protocols or current literature. Verify doses before use.</div>`},
topic(id){const t=D.topics.find(x=>x.id===id);recent('topic/'+id,t.t);if(id==='scales')return VIEWS.scales();if(id==='charts')return VIEWS.charts();
 return `<h2>${t.icon} ${esc(t.t)} ${star('topic/'+id,t.t)}</h2><p class="muted">${esc(t.sub)}</p><div class="card key">${t.key||''}</div>
 ${(t.calcs||[]).length?'<h3>Calculators</h3>'+t.calcs.map(c=>`<details class="card"><summary>🧮 ${esc(CALC[c].name)}</summary>${calcHTML(CALC[c])}</details>`).join(''):''}
 ${(t.items||[]).length?'<h3>Charts & tables</h3>'+t.items.map(itemCard).join(''):''}
 ${(t.chapters||[]).length?'<h3>Full stepwise chapters</h3>'+t.chapters.map(n=>`<details class="card"><summary>📖 Ch ${n}: ${esc(CH[n].t)} <span class="cite">p.${CH[n].bk[0]}–${CH[n].bk[1]}</span></summary><div class="txt">${CH[n].html}</div></details>`).join(''):''}
 ${stepsHTML(t.auto||[])}`},
scales(){const refs=scaleRefs();const cats=[...new Set(CALCS.map(c=>c.cat))];const parts=[...new Set(refs.map(r=>partOf(r.ch)))];
 return `<h2>📊 All scales, scores, criteria & syndromes</h2><p class="muted">${CALCS.length} interactive calculators + ${refs.length} reference tables/figures from the book (criteria, classifications, gradings, definitions, syndromes).</p>
 <input id="sf" class="filter" placeholder="Filter scales… (e.g. sepsis, GCS, ARDS)" oninput="filterList('#scl .row',this.value,'#scat')"><select id="scat" class="filter" onchange="filterList('#scl .row',$('#sf').value,'#scat')"><option value="">All categories</option>${[...cats,...parts].filter((v,i,a)=>a.indexOf(v)===i).map(c=>`<option>${esc(c)}</option>`).join('')}</select>
 <div id="scl">${CALCS.map(c=>`<a class="row" data-cat="${esc(c.cat)}" href="#calc/${c.id}">🧮 <b>${esc(c.name)}</b> <span class="tag">${esc(c.cat)}</span><span class="cite">${esc(c.ref)}</span></a>`).join('')}
 ${refs.map(r=>`<a class="row" data-cat="${esc(partOf(r.ch))}" href="#item/${encodeURIComponent(r.id)}">📋 <b>${esc(r.id)}</b> ${esc(r.cap)} <span class="tag">${esc(partOf(r.ch))}</span><span class="cite">${esc(r.cht)} p.${r.bk}</span></a>`).join('')}</div>`},
charts(){const parts=[...new Set(D.items.map(r=>partOf(r.ch)))];return `<h2>🗂️ Charts — all ${D.items.length} tables, figures & algorithms</h2>
 <input id="cf" class="filter" placeholder="Filter charts…" oninput="filterList('#chl .row',this.value,'#ccat')"><select id="ccat" class="filter" onchange="filterList('#chl .row',$('#cf').value,'#ccat')"><option value="">All systems</option>${parts.map(c=>`<option>${esc(c)}</option>`).join('')}</select>
 <div id="chl">${D.items.map(r=>`<a class="row" data-cat="${esc(partOf(r.ch))}" href="#item/${encodeURIComponent(r.id)}">${r.kind==='Figure'?'📈':'📋'} <b>${esc(r.id)}</b> ${esc(r.cap)}<span class="cite">${esc(r.cht)} p.${r.bk}</span></a>`).join('')}</div>`},
item(id){id=decodeURIComponent(id);const it=ITEM[id];recent('item/'+encodeURIComponent(id),id+' '+it.cap);const c=CH[it.ch];
 return `<h2>${esc(it.id)} ${star('item/'+encodeURIComponent(id),id+' '+it.cap)}</h2><p><b>${esc(it.cap)}</b></p><p class="cite">${it.ch==='App'?'Appendices':`Ch ${it.ch} ${esc(it.cht)}`} · book p.${it.bk} (PDF p.${it.pdf})</p>
 ${it.pages.map(p=>`<img class="pg" loading="lazy" src="${imgSrc(p)}" onclick="zoom(this.src)">`).join('')}
 ${c?`<p>${link('ch/'+it.ch,'Open chapter '+it.ch+': '+c.t)}</p>`:''}<details class="card"><summary>Extracted page text (searchable)</summary><pre class="tb">${esc(it.text)}</pre></details>`},
calcs(){const cats=[...new Set(CALCS.map(c=>c.cat))];return `<h2>🧮 Calculators</h2>`+cats.map(k=>`<h3>${esc(k)}</h3><div class="chips">${CALCS.filter(c=>c.cat===k).map(c=>link('calc/'+c.id,c.name)).join('')}</div>`).join('')},
calc(id){const c=CALC[id];recent('calc/'+id,c.name);return calcHTML(c)+'<p>'+link('calcs','← All calculators')+'</p>'},
library(){const parts=[...new Set(D.chapters.map(c=>c.part))];return `<h2>📚 Protocol library</h2><p class="muted">Every chapter of the book rendered stepwise (tables also available as page images in Charts).</p>`+parts.map(p=>`<h3>${esc(p)}</h3>`+D.chapters.filter(c=>c.part===p).map(c=>`<a class="row" href="#ch/${c.n}">Ch ${c.n}. <b>${esc(c.t)}</b><span class="cite">p.${c.bk[0]}–${c.bk[1]}</span></a>`).join('')).join('')+'<h3>Appendices</h3>'+D.apps.map(a=>`<a class="row" href="#app/${a.id}"><b>${esc(a.t)}</b><span class="cite">p.${a.bk[0]}–${a.bk[1]}</span></a>`).join('')},
ch(n){const c=CH[n];recent('ch/'+n,'Ch '+n+' '+c.t);const its=D.items.filter(i=>i.ch==n);return `<h2>Ch ${n}. ${esc(c.t)} ${star('ch/'+n,'Ch '+n+' '+c.t)}</h2><p class="cite">${esc(c.part)} · book p.${c.bk[0]}–${c.bk[1]}</p>${its.length?'<h3>Tables & figures</h3>'+its.map(i=>itemCard(i.id)).join(''):''}<h3>Stepwise protocol</h3><div class="txt">${c.html}</div><p>${n>1&&CH[n-1]?link('ch/'+(n-1),'← Ch '+(n-1)):''} ${CH[+n+1]?link('ch/'+(+n+1),'Ch '+(+n+1)+' →'):''}</p>`},
app(id){const a=D.apps.find(x=>x.id===id);const its=D.items.filter(i=>i.ch==='App'&&i.id.includes(id==='B'?'Appendix B':'A.'));return `<h2>${esc(a.t)}</h2>${id!=='C'?its.map(i=>itemCard(i.id)).join(''):''}<div class="txt">${a.html}</div>`},
search(q){q=decodeURIComponent(q);const rx=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');const strip=h=>h.replace(/<[^>]+>/g,' ');const snip=t=>{const m=t.search(rx);return m<0?'':esc(t.slice(Math.max(0,m-80),m+120)).replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig'),x=>'<mark>'+x+'</mark>')};
 let out=[];CALCS.forEach(c=>{if(rx.test(c.name+c.ref+c.cat+JSON.stringify(c.groups||'')+JSON.stringify(c.checks||'')))out.push(`<a class="row" href="#calc/${c.id}">🧮 <b>${esc(c.name)}</b><span class="cite">${esc(c.ref)}</span></a>`)});
 D.topics.forEach(t=>{const tx=strip(t.key||'');if(rx.test(t.t+t.sub+tx))out.push(`<a class="row" href="#topic/${t.id}">${t.icon} <b>${esc(t.t)}</b><div class="sn">${snip(tx)}</div></a>`)});
 D.items.forEach(i=>{if(rx.test(i.id+' '+i.cap+' '+i.text))out.push(`<a class="row" href="#item/${encodeURIComponent(i.id)}">📋 <b>${esc(i.id)}</b> ${esc(i.cap)}<span class="cite">p.${i.bk}</span><div class="sn">${snip(i.text)}</div></a>`)});
 D.chapters.forEach(c=>{const tx=c._t||(c._t=strip(c.html));let n=0,m;const g=new RegExp(rx.source,'ig');while((m=g.exec(tx))&&n<99)n++;if(n||rx.test(c.t))out.push(`<a class="row" href="#ch/${c.n}">📖 Ch ${c.n}. <b>${esc(c.t)}</b> <span class="tag">${n} hits</span><div class="sn">${snip(tx)}</div></a>`)});
 D.apps.forEach(a=>{const tx=a._t||(a._t=strip(a.html));if(rx.test(tx))out.push(`<a class="row" href="#app/${a.id}">📎 <b>${esc(a.t)}</b><div class="sn">${snip(tx)}</div></a>`)});
 return `<h2>Search: “${esc(q)}” — ${out.length} results</h2>`+out.join('')}
};
function filterList(sel,q,cat){const c=$(cat).value;q=q.toLowerCase();document.querySelectorAll(sel).forEach(r=>{r.style.display=(r.textContent.toLowerCase().includes(q)&&(!c||r.dataset.cat===c))?'':'none'})}
function render(){const h=location.hash.slice(1)||'home';const [v,...a]=h.split('/');const f=VIEWS[v]||VIEWS.home;let html;try{html=f(a.join('/'))}catch(e){html='<p>Not found.</p>';console.error(e)}$('#main').innerHTML=html;$('#back').style.visibility=h==='home'?'hidden':'visible'}
window.addEventListener('hashchange',()=>{render();scrollTo(0,0)});
document.addEventListener('DOMContentLoaded',()=>{render();$('#q').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim())location.hash='search/'+encodeURIComponent(e.target.value.trim())});$('#zoom').onclick=()=>$('#zoom').style.display='none'});
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol)&&!window.IMG)navigator.serviceWorker.register('sw.js').catch(e=>console.warn('SW',e));
