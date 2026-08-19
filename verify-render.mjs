// DevTools Protocol render verifier for the homepage.
// Launches headless Chrome, walks a page and reports content elements
// that are still computed-invisible after scrolling them into view.
import { execSync, spawn } from "node:child_process";
import { writeFileSync, readFileSync } from "node:fs";

const CHROME = process.env.CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const DEBUG_PORT = 9333;
const URL = process.env.TARGET_URL || "http://localhost:3000/";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Launch headless Chrome with remote debugging.
const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=" + DEBUG_PORT,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "--user-data-dir=C:\\Users\\CCS\\AppData\\Local\\Temp\\cdp-profile",
], { stdio: "ignore" });

async function getWsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      const j = await r.json();
      return j.webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Chrome CDP not reachable");
}

async function cdp(client, method, params = {}) {
  const id = ++cdp.id;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout " + method)), 20000);
    cdp.pending.set(id, { resolve, reject, timer });
    client.send(JSON.stringify({ id, method, params }));
  });
}
cdp.id = 0;
cdp.pending = new Map();

async function main() {
  const wsUrl = await getWsUrl();

  const targetReq = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?${encodeURIComponent(URL)}`,
    { method: "PUT" });
  const target = await targetReq.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && cdp.pending.has(msg.id)) {
      const p = cdp.pending.get(msg.id);
      clearTimeout(p.timer);
      cdp.pending.delete(msg.id);
      if (msg.error) p.reject(new Error(msg.error.message));
      else p.resolve(msg.result);
    }
  };

  await cdp(ws, "Page.enable");
  await cdp(ws, "Runtime.enable");
  await sleep(6000); // let React/framer mount + animate

  // Collect visibility of content elements (contain text, inside <main>)
  const scanExpression = `
    (() => {
      const main = document.querySelector('main');
      const out = [];
      const trunkate = (s) => (s.length > 60 ? s.slice(0, 60) + "…" : s);
      main.querySelectorAll('h1,h2,h3,h4,p,li,button,a,img').forEach((el) => {
        const s = getComputedStyle(el);
        const op = parseFloat(s.opacity);
        const text = (el.tagName === 'IMG' ? ('IMG:' + el.getAttribute('src') || '') : (el.textContent || '').trim());
        if (!text) return;
        const tag = el.tagName.toLowerCase();
        // skip obviously decorative (pointer-events none) wrappers
        const pe = getComputedStyle(el.closest('*'));
        out.push({
          tag, text: trunkate(text), op,
          vis: s.visibility,
          w: el.getBoundingClientRect().width,
          pe: s.pointerEvents,
        });
      });
      return JSON.stringify(out);
    })()
  `;

  // Scroll through the page in steps, sampling which content stays invisible.
  const results = [];
  const total = await cdp(ws, "Runtime.evaluate", {
    expression: "document.documentElement.scrollHeight",
    returnByValue: true,
  });
  const maxY = total.result.value || 8000;
  const steps = Math.max(6, Math.ceil(maxY / 800));
  for (let i = 0; i <= steps; i++) {
    const y = Math.min(i * Math.ceil(maxY / steps), maxY);
    await cdp(ws, "Runtime.evaluate", {
      expression: `window.scrollTo(0, ${y})`,
      returnByValue: true,
    });
    await sleep(900); // let whileInView fire
    const scan = await cdp(ws, "Runtime.evaluate", {
      expression: scanExpression,
      returnByValue: true,
    });
    let arr = [];
    try { arr = JSON.parse(scan.result.value); } catch {}
    const invisible = arr.filter((x) => (x.op < 0.5 && x.w > 4) || x.vis === "hidden");
    results.push({ y, totalElements: arr.length, invisibleCount: invisible.length });
    if (invisible.length) {
      const samples = invisible.slice(0, 12).map((x) => `  [${x.tag}] "${x.text}" opacity=${x.op}${x.vis==='hidden'?' visibility=hidden':''}`);
      results[results.length - 1].samples = samples;
    }
  }

  console.log("RESULTS", JSON.stringify(results, null, 2));
  process.exit(0);
}

main().catch((e) => { console.error("ERR", e); process.exit(1); });