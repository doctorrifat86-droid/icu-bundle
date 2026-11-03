import glob,json,re,os
os.chdir('/workspace/icu-bundle-app')
c=''.join(open(f).read()+'\n' for f in ['src/c0_helpers.js']+sorted(glob.glob('src/c[1-9]*.js'),key=lambda f:int(re.search(r'c(\d+)_',f).group(1))))
c+="\nCALCS.forEach(x=>{x.src=x.src||'book'});const _ids=new Set(CALCS.map(x=>x.id));C2.forEach(x=>{if(!_ids.has(x.id)){CALCS.push(x);_ids.add(x.id)}});\n"
open('calcs2.js','w').write(c)
open('checklists.js','w').write(''.join(open(f).read()+'\n' for f in sorted(glob.glob('src/k*.js'))))
out=[];spec='';dflt=[]
for l in open('src/diseases.txt'):
  l=l.strip()
  if not l or l[0]=='#':continue
  p=[x.strip() for x in l.split('|')]
  if l[0]=='@':spec=p[0][1:].strip();dflt=p[1].split() if len(p)>1 else [];continue
  syn=[s.strip() for s in p[1].split(';') if s.strip()] if len(p)>1 else []
  tools=(p[2].split() if len(p)>2 else [])
  out.append([p[0],syn,spec,tools,dflt])
open('diseases.js','w').write('window.DISEASES='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';')
print(len(out))
