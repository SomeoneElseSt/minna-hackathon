import type { Challenge } from "./types";

export function initialArtifact(challenge: Challenge): string {
  const title = challenge.title || "Vibe Artifact";
  if (title.toLowerCase().includes("snake")) {
    return snakeHtml(title);
  }
  if (title.toLowerCase().includes("personal website")) {
    return siteHtml(title);
  }
  if (title.toLowerCase().includes("logo")) {
    return logoHtml(title);
  }
  if (title.toLowerCase().includes("ambient")) {
    return ambientHtml(title);
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

function logoHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <svg width="240" height="160">
      <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
      <rect x="0" y="0" width="240" height="160" rx="18" fill="#111827"/>
      <circle cx="80" cy="80" r="36" fill="url(#g)"/>
      <rect x="120" y="54" width="60" height="52" rx="12" fill="#3b82f6"/>
      <text x="120" y="134" fill="#e5e7eb" font-size="16">Vibe</text>
    </svg>
  </div>
  </body></html>`;
}

function ambientHtml(t: string): string {
  return `<!doctype html><html><head>${baseHead(t)}</head><body>
  <div class="wrap">
    <h1>${t}</h1>
    <p class="badge">Ambient pad generator</p>
    <button id="play">Play</button>
  </div>
  <script>
    let ctx; let osc; let gain;
    document.getElementById('play').onclick = ()=>{
      if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      osc = ctx.createOscillator(); gain = ctx.createGain();
      osc.type='sine'; osc.frequency.value = 220;
      gain.gain.value = 0.08;
      osc.connect(gain).connect(ctx.destination);
      osc.start(); setTimeout(()=>{osc.stop()}, 3000);
    };
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
