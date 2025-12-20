import type { Challenge } from "./types";

export function initialArtifact(challenge: Challenge): string {
  const title = challenge.title || "Vibe Artifact";
  if (title.toLowerCase().includes("snake")) {
    return snakeHtml(title);
  }
  if (title.toLowerCase().includes("personal website")) {
    return siteHtml(title);
  }
  if (title.toLowerCase().includes("storefront") || title.toLowerCase().includes("store")) {
    return storefrontHtml(title);
  }
  if (title.toLowerCase().includes("disease") || title.toLowerCase().includes("spread")) {
    return diseaseDashboardHtml(title);
  }
  if (title.toLowerCase().includes("email")) {
    return emailAutomationHtml(title);
  }
  return interactiveHtml(title);
}

function baseHead(t: string): string {
  return `
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${t}</title>
    <style>
      html, body { margin: 0; height: 100%; background: #0b0f19; color: #e5e7eb; font-family: ui-sans-serif, system-ui; }
      .wrap { padding: 16px; }
      .badge { display:inline-block; border:1px solid rgba(255,255,255,.2); border-radius:999px; padding:2px 8px; font-size:12px; }
      canvas { display:block; margin:auto; background:#111827; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,.35); }
      a { color: #93c5fd; }
    </style>
  `;
}

function snakeHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <p class="badge">Arrow keys to move. Eat food, avoid walls.</p>
    <canvas id="game" width="360" height="360"></canvas>
  </div>
  <script>
    const c = document.getElementById('game');
    const g = c.getContext('2d');
    const S = 20;
    let snake = [{x:5,y:5}];
    let dir = {x:1,y:0};
    let food = {x:10,y:8};
    let alive = true;
    function draw() {
      g.fillStyle = '#111827'; g.fillRect(0,0,c.width,c.height);
      g.fillStyle = '#3b82f6'; g.fillRect(food.x*S, food.y*S, S, S);
      g.fillStyle = '#f59e0b';
      snake.forEach(s=>g.fillRect(s.x*S, s.y*S, S, S));
    }
    function step() {
      if(!alive) return;
      const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
      if(head.x<0||head.y<0||head.x>=c.width/S||head.y>=c.height/S) { alive=false; return;}
      if(snake.some(s=>s.x===head.x && s.y===head.y)) { alive=false; return;}
      snake.unshift(head);
      if(head.x===food.x && head.y===food.y) {
        food = {x: Math.floor(Math.random()* (c.width/S)), y: Math.floor(Math.random()* (c.height/S))};
      } else {
        snake.pop();
      }
      draw();
    }
    window.addEventListener('keydown', e=>{
      const k = e.key;
      if(k==='ArrowUp' && dir.y!==1) dir={x:0,y:-1};
      else if(k==='ArrowDown' && dir.y!==-1) dir={x:0,y:1};
      else if(k==='ArrowLeft' && dir.x!==1) dir={x:-1,y:0};
      else if(k==='ArrowRight' && dir.x!==-1) dir={x:1,y:0};
    });
    setInterval(step, 120);
    draw();
  </script>
  </body></html>`;
}

function siteHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <p class="badge">Starter personal site</p>
    <nav><a href="#about">About</a> · <a href="#projects">Projects</a> · <a href="#contact">Contact</a></nav>
    <section id="about"><h2>About</h2><p>Write your bio here.</p></section>
    <section id="projects"><h2>Projects</h2><ul><li>Project A</li><li>Project B</li></ul></section>
    <section id="contact"><h2>Contact</h2><p>Email: you@example.com</p></section>
  </div>
  </body></html>`;
}

function storefrontHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <p class="badge">Pick a shop, add products, cart, and checkout</p>
    <div id="app"></div>
  </div>
  <script>
    const products = [
      { id: 1, name: "Sourdough Loaf", price: 7.5, tag: "Bakery" },
      { id: 2, name: "Cold Brew", price: 4.25, tag: "Drinks" },
      { id: 3, name: "Olive Oil (500ml)", price: 14.0, tag: "Grocery" },
      { id: 4, name: "House Granola", price: 9.0, tag: "Grocery" }
    ];
    let cart = [];
    let filter = "All";

    function money(v){ return "$" + v.toFixed(2); }
    function subtotal(){ return cart.reduce((s, i) => s + i.price * i.qty, 0); }
    function addToCart(p){
      const existing = cart.find(i => i.id === p.id);
      if(existing) existing.qty += 1;
      else cart.push({ ...p, qty: 1 });
      render();
    }
    function setQty(id, qty){
      const item = cart.find(i => i.id === id);
      if(!item) return;
      item.qty = Math.max(0, qty|0);
      cart = cart.filter(i => i.qty > 0);
      render();
    }
    function checkout(){
      const name = (document.getElementById("name") || {}).value || "";
      if(cart.length === 0) { alert("Cart is empty"); return; }
      alert("Order placed for " + (name || "Customer") + " (mock). Total: " + money(subtotal()));
      cart = [];
      render();
    }

    function render(){
      const app = document.getElementById("app");
      const tags = ["All", ...Array.from(new Set(products.map(p => p.tag)))];
      const shown = filter === "All" ? products : products.filter(p => p.tag === filter);
      app.innerHTML = \`
        <style>
          .grid{ display:grid; grid-template-columns:1fr; gap:12px; margin-top:12px; }
          .row{ display:flex; gap:10px; align-items:center; justify-content:space-between; }
          .pill{ border:1px solid rgba(255,255,255,.16); padding:6px 10px; border-radius:999px; background:rgba(255,255,255,.05); cursor:pointer; font-weight:700; font-size:12px; }
          .pill.active{ background:rgba(124,58,237,.35); border-color:rgba(124,58,237,.65); }
          .card{ background:#111827; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:12px; box-shadow:0 8px 24px rgba(0,0,0,.35); }
          .btn{ border:0; padding:10px 12px; border-radius:12px; font-weight:900; background:linear-gradient(180deg,#a78bfa,#7c3aed); color:#0b0f19; cursor:pointer; }
          .btn:disabled{ opacity:.6; cursor:not-allowed; }
          input{ width:100%; padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,.14); background:#0f172a; color:#e5e7eb; }
          .muted{ color:rgba(255,255,255,.72); font-size:12px; }
        </style>
        <div class="row" style="flex-wrap:wrap">
          \${tags.map(t => \`<button class="pill \${t===filter?'active':''}" data-tag="\${t}">\${t}</button>\`).join("")}
        </div>
        <div class="grid">
          \${shown.map(p => \`
            <div class="card">
              <div class="row">
                <div>
                  <div style="font-weight:900">\${p.name}</div>
                  <div class="muted">\${p.tag} • \${money(p.price)}</div>
                </div>
                <button class="btn" data-add="\${p.id}">Add</button>
              </div>
            </div>\`).join("")}
        </div>
        <div class="card" style="margin-top:14px">
          <div style="font-weight:900; margin-bottom:8px">Cart</div>
          \${cart.length===0 ? '<div class="muted">No items yet.</div>' : cart.map(i => \`
            <div class="row" style="margin-top:8px">
              <div style="min-width:0">
                <div style="font-weight:800">\${i.name}</div>
                <div class="muted">\${money(i.price)} each</div>
              </div>
              <div class="row">
                <button class="pill" data-dec="\${i.id}">-</button>
                <div style="width:28px; text-align:center; font-weight:900">\${i.qty}</div>
                <button class="pill" data-inc="\${i.id}">+</button>
              </div>
            </div>\`).join('')}
          <div class="row" style="margin-top:12px">
            <div style="font-weight:900">Subtotal</div>
            <div style="font-weight:900">\${money(subtotal())}</div>
          </div>
          <div style="margin-top:10px; display:grid; gap:8px">
            <input id="name" placeholder="Name for checkout (mock)" />
            <button class="btn" \${cart.length===0?'disabled':''} id="checkoutBtn">Checkout</button>
          </div>
        </div>
      \`;

      app.querySelectorAll("[data-tag]").forEach(b => b.onclick = () => { filter = b.getAttribute("data-tag"); render(); });
      app.querySelectorAll("[data-add]").forEach(b => b.onclick = () => addToCart(products.find(p => String(p.id) === b.getAttribute("data-add"))));
      app.querySelectorAll("[data-inc]").forEach(b => b.onclick = () => setQty(Number(b.getAttribute("data-inc")), (cart.find(i => i.id === Number(b.getAttribute("data-inc"))) || {qty:0}).qty + 1));
      app.querySelectorAll("[data-dec]").forEach(b => b.onclick = () => setQty(Number(b.getAttribute("data-dec")), (cart.find(i => i.id === Number(b.getAttribute("data-dec"))) || {qty:0}).qty - 1));
      const cb = document.getElementById("checkoutBtn");
      if(cb) cb.onclick = checkout;
    }
    render();
  </script>
  </body></html>`;
}

function diseaseDashboardHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <p class="badge">SIR simulation with adjustable parameters</p>
    <div id="app"></div>
  </div>
  <script>
    function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
    function el(tag, attrs, children){
      const n = document.createElement(tag);
      if(attrs) Object.entries(attrs).forEach(([k,v]) => n.setAttribute(k, v));
      (children||[]).forEach(c => n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
      return n;
    }
    function simulate({N, beta, gamma, I0, days, dt}){
      let S = N - I0, I = I0, R = 0;
      const out = [];
      for(let t=0; t<=days; t+=dt){
        out.push({t, S, I, R});
        const dS = -beta * S * I / N;
        const dI = beta * S * I / N - gamma * I;
        const dR = gamma * I;
        S = Math.max(0, S + dS * dt);
        I = Math.max(0, I + dI * dt);
        R = Math.max(0, R + dR * dt);
      }
      return out;
    }
    function maxOf(arr, key){ return arr.reduce((m, r) => Math.max(m, r[key]), 0); }
    function draw(canvas, series){
      const ctx = canvas.getContext("2d");
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = "#111827"; ctx.fillRect(0,0,w,h);
      const pad = 28;
      const innerW = w - pad*2;
      const innerH = h - pad*2;
      const tMax = series[series.length - 1].t;
      const yMax = maxOf(series, "S");
      function x(t){ return pad + (t/tMax)*innerW; }
      function y(v){ return pad + (1 - (v/yMax))*innerH; }
      ctx.strokeStyle = "rgba(255,255,255,0.14)"; ctx.lineWidth = 1;
      for(let i=0;i<=4;i++){
        const yy = pad + (i/4)*innerH;
        ctx.beginPath(); ctx.moveTo(pad, yy); ctx.lineTo(pad+innerW, yy); ctx.stroke();
      }
      function plot(key, color){
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath();
        series.forEach((r, i) => {
          const px = x(r.t), py = y(r[key]);
          if(i===0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }
      plot("S", "#93c5fd");
      plot("I", "#f59e0b");
      plot("R", "#34d399");
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "12px ui-sans-serif, system-ui";
      ctx.fillText("S", pad, pad-8);
      ctx.fillText("I", pad+16, pad-8);
      ctx.fillText("R", pad+32, pad-8);
      ctx.fillStyle = "#93c5fd"; ctx.fillText("S", pad, pad-8);
      ctx.fillStyle = "#f59e0b"; ctx.fillText("I", pad+16, pad-8);
      ctx.fillStyle = "#34d399"; ctx.fillText("R", pad+32, pad-8);
    }

    let state = { N: 10000, beta: 0.35, gamma: 0.10, I0: 10, days: 160, dt: 1 };
    function render(){
      const app = document.getElementById("app");
      app.innerHTML = \`
        <style>
          .card{ background:#111827; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:12px; box-shadow:0 8px 24px rgba(0,0,0,.35); }
          .grid{ display:grid; gap:12px; grid-template-columns:1fr; margin-top:12px; }
          .row{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
          .lbl{ font-weight:900; }
          .muted{ color:rgba(255,255,255,.72); font-size:12px; }
          .btn{ border:0; padding:10px 12px; border-radius:12px; font-weight:900; background:linear-gradient(180deg,#a78bfa,#7c3aed); color:#0b0f19; cursor:pointer; }
          input[type=range]{ width:100%; }
        </style>
        <div class="grid">
          <div class="card">
            <div class="row"><div class="lbl">Parameters</div><button class="btn" id="reset">Reset</button></div>
            <div style="margin-top:10px; display:grid; gap:10px">
              \${slider("Population (N)", "N", 1000, 500000, state.N, 1000)}
              \${slider("Transmission (β)", "beta", 0.05, 1.0, state.beta, 0.01)}
              \${slider("Recovery (γ)", "gamma", 0.02, 0.5, state.gamma, 0.01)}
              \${slider("Initial infected (I0)", "I0", 1, 5000, state.I0, 1)}
            </div>
          </div>
          <div class="card">
            <div class="row">
              <div>
                <div class="lbl">Simulation</div>
                <div class="muted">SIR model (Euler integration)</div>
              </div>
              <div class="muted">R₀ ≈ \${(state.beta/state.gamma).toFixed(2)}</div>
            </div>
            <canvas id="plot" width="420" height="260" style="width:100%; margin-top:10px; border-radius:12px"></canvas>
          </div>
        </div>
      \`;
      function slider(label, key, min, max, val, step){
        return \`
          <div>
            <div class="row"><div class="muted">\${label}</div><div class="lbl">\${Number(val).toFixed(key==='beta'||key==='gamma'?2:0)}</div></div>
            <input type="range" min="\${min}" max="\${max}" step="\${step}" value="\${val}" data-k="\${key}"/>
          </div>\`;
      }
      app.querySelectorAll("input[data-k]").forEach((r) => {
        r.oninput = (e) => {
          const k = e.target.getAttribute("data-k");
          const v = Number(e.target.value);
          state = { ...state, [k]: k === "beta" || k === "gamma" ? v : (v|0) };
          render();
        };
      });
      const reset = document.getElementById("reset");
      if(reset) reset.onclick = () => { state = { N: 10000, beta: 0.35, gamma: 0.10, I0: 10, days: 160, dt: 1 }; render(); };
      const series = simulate(state);
      const canvas = document.getElementById("plot");
      if(canvas) draw(canvas, series);
    }
    render();
  </script>
  </body></html>`;
}

function emailAutomationHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <p class="badge">Build an email sender workflow (mock delivery)</p>
    <div id="app"></div>
  </div>
  <script>
    const recipients = [
      { id: 1, name: "Amina", email: "amina@example.com", segment: "Customers" },
      { id: 2, name: "Ben", email: "ben@example.com", segment: "Customers" },
      { id: 3, name: "Cleo", email: "cleo@example.com", segment: "Leads" },
      { id: 4, name: "Diego", email: "diego@example.com", segment: "Leads" }
    ];
    let segment = "All";
    let subject = "Quick update from Minna";
    let body = "Hi {{name}},\\n\\nHere is a short update.\\n\\n— Team Minna";
    let schedule = "Now";
    let runs = [];

    function previewFor(r){
      return body.replaceAll("{{name}}", r.name).replaceAll("{{email}}", r.email);
    }
    function nowIso(){
      const d = new Date();
      const p = (n) => String(n).padStart(2,"0");
      return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+" "+p(d.getHours())+":"+p(d.getMinutes());
    }
    function filtered(){
      return segment === "All" ? recipients : recipients.filter(r => r.segment === segment);
    }
    function send(){
      const list = filtered();
      if(list.length === 0) { alert("No recipients"); return; }
      const id = runs.length + 1;
      const status = schedule === "Now" ? "sent" : "scheduled";
      runs.unshift({ id, at: nowIso(), segment, count: list.length, status });
      render();
    }
    function render(){
      const app = document.getElementById("app");
      const segments = ["All", ...Array.from(new Set(recipients.map(r => r.segment)))];
      const list = filtered();
      const sample = list[0] || recipients[0];
      app.innerHTML = \`
        <style>
          .grid{ display:grid; grid-template-columns:1fr; gap:12px; margin-top:12px; }
          .card{ background:#111827; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:12px; box-shadow:0 8px 24px rgba(0,0,0,.35); }
          .row{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
          .pill{ border:1px solid rgba(255,255,255,.16); padding:6px 10px; border-radius:999px; background:rgba(255,255,255,.05); cursor:pointer; font-weight:800; font-size:12px; }
          .pill.active{ background:rgba(124,58,237,.35); border-color:rgba(124,58,237,.65); }
          .lbl{ font-weight:900; }
          .muted{ color:rgba(255,255,255,.72); font-size:12px; }
          .btn{ border:0; padding:10px 12px; border-radius:12px; font-weight:900; background:linear-gradient(180deg,#a78bfa,#7c3aed); color:#0b0f19; cursor:pointer; }
          input, textarea, select{ width:100%; padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,.14); background:#0f172a; color:#e5e7eb; }
          textarea{ min-height:120px; resize:vertical; }
          .tag{ display:inline-block; padding:2px 8px; border-radius:999px; border:1px solid rgba(255,255,255,.16); font-size:12px; }
        </style>
        <div class="grid">
          <div class="card">
            <div class="row"><div class="lbl">Audience</div><div class="muted">\${list.length} recipients</div></div>
            <div class="row" style="flex-wrap:wrap; margin-top:10px">
              \${segments.map(s => \`<button class="pill \${s===segment?'active':''}" data-seg="\${s}">\${s}</button>\`).join("")}
            </div>
          </div>
          <div class="card">
            <div class="row"><div class="lbl">Email</div><span class="tag">\${schedule}</span></div>
            <div style="margin-top:10px; display:grid; gap:10px">
              <input id="subject" value="\${escapeHtml(subject)}" placeholder="Subject" />
              <textarea id="body" placeholder="Body (use {{name}})">\${escapeHtml(body)}</textarea>
              <div class="row">
                <select id="schedule">
                  \${["Now","Tomorrow 9am"].map(v => \`<option \${v===schedule?'selected':''}>\${v}</option>\`).join("")}
                </select>
                <button class="btn" id="send">Send</button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="row"><div class="lbl">Preview</div><div class="muted">\${sample ? sample.email : ""}</div></div>
            <div style="margin-top:10px; white-space:pre-wrap; background:#0f172a; border:1px solid rgba(255,255,255,.10); border-radius:12px; padding:12px">\${escapeHtml(sample ? previewFor(sample) : "")}</div>
          </div>
          <div class="card">
            <div class="row"><div class="lbl">Runs</div><div class="muted">\${runs.length}</div></div>
            <div style="margin-top:10px; display:grid; gap:8px">
              \${runs.length===0 ? '<div class="muted">No sends yet.</div>' : runs.map(r => \`
                <div class="row" style="border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:10px; background:rgba(255,255,255,.03)">
                  <div style="min-width:0">
                    <div class="lbl">#\${r.id} • \${r.status}</div>
                    <div class="muted">\${r.at} • \${r.segment} • \${r.count} recipients</div>
                  </div>
                </div>\`).join("")}
            </div>
          </div>
        </div>
      \`;
      app.querySelectorAll("[data-seg]").forEach(b => b.onclick = () => { segment = b.getAttribute("data-seg"); render(); });
      const subj = document.getElementById("subject");
      const bdy = document.getElementById("body");
      const sch = document.getElementById("schedule");
      if(subj) subj.oninput = (e) => { subject = e.target.value; };
      if(bdy) bdy.oninput = (e) => { body = e.target.value; render(); };
      if(sch) sch.onchange = (e) => { schedule = e.target.value; render(); };
      const sendBtn = document.getElementById("send");
      if(sendBtn) sendBtn.onclick = send;
    }
    function escapeHtml(s){
      return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
    }
    render();
  </script>
  </body></html>`;
}

function interactiveHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <p class="badge">Interactive sketch</p>
    <canvas id="art" width="360" height="360"></canvas>
  </div>
  <script>
    const c=document.getElementById('art'); const g=c.getContext('2d');
    let hue=180;
    c.addEventListener('mousemove', e=>{
      hue = (hue + 1) % 360;
      g.fillStyle = 'hsl(' + hue + ', 60%, 50%)';
      g.beginPath(); g.arc(e.offsetX, e.offsetY, 8, 0, Math.PI*2); g.fill();
    });
  </script>
  </body></html>`;
}
