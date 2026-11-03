// Run: node tests/calc.test.js
const fs=require('fs'),path=require('path');global.window={};const R=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
let s='';for(const f of ['data.js','calcs.js','calcs2.js','checklists.js','diseases.js'])s+=R(f)+'\n';s=s.replace(/const (CALCS|C2|CLS)=/g,'global.$1=');eval(s);
const C=id=>{const c=CALCS.find(x=>x.id===id);if(!c)throw new Error('missing '+id);return c};
let pass=0,fail=0;const ok=(name,cond,info)=>{if(cond)pass++;else{fail++;console.log('FAIL',name,info||'')}};
const num=(id,v)=>C(id).f(v);const has=(id,v,re)=>{const o=num(id,v);ok(id+' '+JSON.stringify(v),re.test(o),o)};
const pts=(id,t)=>C(id).interp(t);
// --- known vectors ---
has('meld',{b:2,i:1.5,c:1.2,na:130,alb:3.5,d:0,m:1},/MELD\D*15\b/);has('meld',{b:2,i:1.5,c:1.2,na:130,alb:3.5,d:0,m:1},/MELD-Na\D*21\b/);
has('ckdepi21',{cr:1.0,a:50,m:1},/\b9[12]\b/);has('ckdepi21',{cr:0.8,a:60,m:0},/\b8[34]\b/);
has('qtc',{qt:400,hr:60},/\b400\b/);has('qtc',{qt:400,hr:90},/\b49[01]\b/);
has('pbw',{h:170,m:1},/66\.0|\b66\b/);has('pbw',{h:160,m:0},/52\.4/);
has('aagrad_age',{a:60},/\b19\b/);has('map',{s:120,d:80},/93/);
has('bmi',{w:70,h:175},/22\.9/);has('bsa',{w:70,h:175},/1\.8[45]/);
has('cna_h',{na:130,g:500},/139\.6|140/);has('winters',{h:10,c:NaN},/23\.0 ± 2/);
has('agcorr',{na:140,cl:100,h:20,alb:2,k:NaN},/\b25\b/);has('osmgap',{m:320,na:140,g:90,b:14,e:NaN},/\b30\b/);
has('cg',{a:60,w:70,cr:1,fe:0},/77\.8|78/);has('drip',{d:0.1,w:70,mg:4,ml:250},/26\.3|26\.25|26\.2/);
has('ett',{a:4},/\b5(\.0)?\b/);has('mifflin',{w:70,h:175,a:40,m:1},/1599|1598\.8|1,599/);
has('pf',{p:80,s:NaN,f:40},/\b200\b/);
ok('childpugh A',/A/.test(pts('childpugh',5)),pts('childpugh',5));ok('childpugh B',/\bB\b/.test(pts('childpugh',7)),pts('childpugh',7));ok('childpugh C',/\bC\b/.test(pts('childpugh',10)),pts('childpugh',10));
ok('curb65 3',/sever|high|ICU|hospital/i.test(pts('curb65',3)),pts('curb65',3));ok('curb65 0',/low|home|outpatient/i.test(pts('curb65',0)),pts('curb65',0));
ok('wells_dvt -2 check',C('wells_dvt').checks.some(x=>x[1]===-2));ok('wells_dvt 3 likely/high',/high|likely/i.test(pts('wells_dvt',3)),pts('wells_dvt',3));
ok('chadsvasc 2',/anticoag|OAC/i.test(pts('chadsvasc',2)),pts('chadsvasc',2));
ok('kdigo maxOf',C('kdigo').maxOf===true&&/stage 2/.test(pts('kdigo',2)));
ok('canadian syncope 6 very high',/very high/i.test(pts('canadian_syncope',6)),pts('canadian_syncope',6));ok('canadian syncope -2 very low',/very low/i.test(pts('canadian_syncope',-2)),pts('canadian_syncope',-2));
// --- criteria rules ---
const GL=id=>CLS.find(c=>c.id===id);
ok('cam pos',GL('cam').rule([true,true,false,true]).met);ok('cam neg (no inattention)',!GL('cam').rule([true,false,true,true]).met);
ok('sepsis3 shock',/SHOCK/.test(GL('sepsis3').rule([true,true,true,true]).text));ok('sepsis3 no',!GL('sepsis3').rule([true,false,false,false]).met);
ok('sirs 2',GL('sirs_c').rule([true,true,false,false]).met);ok('duke definite 2 major',GL('duke_c').rule([true,true,false,false,false,false,false]).met);
ok('duke possible',/POSSIBLE/.test(GL('duke_c').rule([true,false,true,false,false,false,false]).text));
ok('kawasaki',GL('kawasaki_c').rule([true,true,true,true,true,false]).met);ok('jones 2 major',GL('jones').rule([true,true,true,false,false,false,false,false,false,false]).met);
ok('sle needs immuno',!GL('sle_c').rule([true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false]).met);
// --- smoke: every calculator & checklist ---
CALCS.forEach(c=>{try{if(c.type==='num'){const v={};c.inputs.forEach(i=>v[i[1]]=i[2]?i[2][0][1]:50);const o=c.f(v);ok('smoke '+c.id,typeof o==='string'&&o.length>0,o)}else{const mx=(c.groups||[]).reduce((a,g)=>a+Math.max(...g.o.map(o=>o[1])),0)+(c.checks||[]).reduce((a,x)=>a+Math.max(0,x[1]),0);[0,mx].forEach(t=>{const o=c.interp(t);ok('smoke '+c.id+' '+t,typeof o==='string',o)})}ok('meta '+c.id,c.name&&c.ref&&c.cat&&c.src)}catch(e){ok('smoke '+c.id,false,e.message)}});
CLS.forEach(c=>{const n=c.sections.reduce((a,s)=>a+s.items.length,0);ok('cl items '+c.id,n>0);if(c.kind==='criteria'){try{c.rule(Array(n).fill(false));const r=c.rule(Array(n).fill(true));ok('crit all-true met '+c.id,r.met,r.text)}catch(e){ok('crit '+c.id,false,e.message)}}});
const ids=CALCS.map(c=>c.id);ok('unique calc ids',new Set(ids).size===ids.length);ok('>=300 calcs',CALCS.length>=300,CALCS.length);ok('61 book',CALCS.filter(c=>c.src==='book').length===61);ok('>=500 diseases',window.DISEASES.length>=500,window.DISEASES.length);
console.log(`${pass} passed, ${fail} failed · ${CALCS.length} calculators (${CALCS.filter(c=>c.src==='book').length} book), ${CLS.length} checklists, ${window.DISEASES.length} diseases`);process.exit(fail?1:0);
