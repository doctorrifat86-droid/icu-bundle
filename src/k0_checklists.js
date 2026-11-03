// ===== Patient checklists (bundles) and diagnostic criteria sets =====
// kind 'bundle': sections of tap-to-check items. kind 'criteria': items + rule(c) -> {met,text}; c = array of booleans.
const CLS=[];
const BK=(ch,extra)=>{const c=window.DATA&&DATA.chapters.find(x=>x.n==ch);return `From book: Ch ${ch}${c?' '+c.t+', p.'+c.bk[0]+'–'+c.bk[1]:''}${extra?' + '+extra:''}`};
function CL(id,name,cat,ref,src,sec){CLS.push({id,name,cat,ref,src,kind:'bundle',sections:Object.entries(sec).map(([t,items])=>({t,items}))})}
function CR(id,name,cat,ref,items,rule,src){CLS.push({id,name,cat,ref,src:src||'lit',kind:'criteria',sections:[{t:'Criteria',items}],rule})}
const cnt=c=>c.filter(Boolean).length;
const atleast=(n,msg)=>c=>({met:cnt(c)>=n,text:cnt(c)>=n?msg:`${cnt(c)}/${n} required criteria met`});
const all=msg=>c=>({met:c.every(Boolean),text:c.every(Boolean)?msg:`${cnt(c)}/${c.length} — all required`});
