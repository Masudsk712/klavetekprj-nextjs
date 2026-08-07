@echo off
echo const fs=require("fs") > c:\Users\CCS\klavetekprj-nextjs\fix2.js
echo const p="c:\Users\CCS\klavetekprj-nextjs\src\app\projects\page.tsx" >> c:\Users\CCS\klavetekprj-nextjs\fix2.js
echo let b=fs.readFileSync(p) >> c:\Users\CCS\klavetekprj-nextjs\fix2.js
echo for(let i=0;i<b.length;i++)if(b[i]>127)b[i]=45 >> c:\Users\CCS\klavetekprj-nextjs\fix2.js
echo fs.writeFileSync(p,b) >> c:\Users\CCS\klavetekprj-nextjs\fix2.js
c:\Users\CCS\klavetekprj-nextjs\fix2.js
