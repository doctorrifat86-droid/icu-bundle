// ===== Standard-literature calculators (added). Data-driven definitions. =====
// type 'pts': groups (radio, one per group) + checks (checkbox, summed) -> total -> bands/interp
// type 'num': inputs [label,key,(options)] -> f(v) returns result string
const C2=[];
const fx=(x,d=1)=>(typeof x==='number'&&isFinite(x))?x.toFixed(d):'NaN';
function bands(b){return t=>{let s='';for(const [th,tx] of b)if(t>=th)s=tx;return s}}
function P(id,name,cat,ref,purpose,groups,b,note,checks){C2.push({id,name,cat,ref,purpose,type:'pts',src:'lit',groups:(groups||[]).map(g=>({l:g[0],o:g[1]})),checks:checks||null,interp:typeof b==='function'?b:bands(b),bands:typeof b==='function'?null:b,note})}
function K(id,name,cat,ref,purpose,checks,b,note){P(id,name,cat,ref,purpose,[],b,note,checks)}
function N(id,name,cat,ref,purpose,inputs,f,note){C2.push({id,name,cat,ref,purpose,type:'num',src:'lit',inputs,f,note})}
const SEX=[['Male',1],['Female',0]];
const YN=p=>[['No',0],['Yes',p]];
