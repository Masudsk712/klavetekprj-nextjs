const fs=require("fs") 
const p="c:\Users\CCS\klavetekprj-nextjs\src\app\projects\page.tsx" 
let b=fs.readFileSync(p) 
fs.writeFileSync(p,b) 
