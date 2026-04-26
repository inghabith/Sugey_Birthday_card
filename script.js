// ===== TEMA DÍA / NOCHE =====
(function() {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;

  function applyTheme(night) {
    if (night) {
      document.body.classList.add('night-mode');
      badge.textContent = '✦ modo noche';
      toggleBtn.textContent = '☀';
      toggleBtn.title = 'Cambiar a modo día';
    } else {
      document.body.classList.remove('night-mode');
      badge.textContent = '☀ modo día';
      toggleBtn.textContent = '✦';
      toggleBtn.title = 'Cambiar a modo noche';
    }
  }

  // Badge de tema
  const badge = document.createElement('div');
  badge.className = 'theme-badge';
  document.body.appendChild(badge);

  // Botón toggle manual
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle-btn';
  document.body.appendChild(toggleBtn);

  let currentNight = isNight;
  applyTheme(currentNight);

  toggleBtn.addEventListener('click', () => {
    currentNight = !currentNight;
    applyTheme(currentNight);

    // Regenerar/limpiar estrellas
    const existing = document.querySelector('.night-stars');
    if (existing) existing.remove();
    if (currentNight) spawnStars();
  });

  function spawnStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'night-stars';
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 90; i++) {
      const star = document.createElement('div');
      star.className = 'night-star';
      const size = Math.random() < 0.15 ? Math.random() * 2.5 + 2 : Math.random() * 1.5 + 0.5;
      star.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 85}%;
        width: ${size}px;
        height: ${size}px;
        --twinkle-dur: ${(Math.random() * 3 + 2).toFixed(1)}s;
        --twinkle-delay: ${(Math.random() * 4).toFixed(1)}s;
        --min-op: ${(Math.random() * 0.3 + 0.1).toFixed(2)};
        --max-op: ${(Math.random() * 0.5 + 0.5).toFixed(2)};
        box-shadow: 0 0 ${size * 2}px rgba(255,255,255,0.6);
      `;
      starsContainer.appendChild(star);
    }
  }

  if (isNight) spawnStars();
})();

// ===== WELCOME OVERLAY =====
function dismissWelcome() {
  const overlay = document.getElementById('welcomeOverlay');
  overlay.classList.add('hidden');
}


const BALLOON_COLORS  = ['#ff6b8a','#ffb347','#7ec8e3','#b388ff','#69d984','#ff8fab','#ffd166'];
const CAKE_COLORS     = ['#f48fb1','#ce93d8','#80cbc4','#ffcc80','#ef9a9a'];
const CANDLE_COLORS   = ['#ff6b8a','#ffd166','#7ec8e3','#b388ff'];
const GIFT_COLORS     = [
  { box:'#ff6b8a', lid:'#c2185b', bow:'#f48fb1' },
  { box:'#7ec8e3', lid:'#0288d1', bow:'#b3e5fc' },
  { box:'#ffb347', lid:'#e65100', bow:'#ffe0b2' },
  { box:'#b388ff', lid:'#6200ea', bow:'#e1bee7' },
];
const CONFETTI_COLORS = ['#ff6b8a','#ffd166','#7ec8e3','#b388ff','#69d984','#ffb347','#ff8fab'];
const STAR_COLORS     = ['#ffd166','#ffb347','#ffe066','#ffc300'];

function rnd(a, b)  { return a + Math.random() * (b - a); }
function pick(arr)  { return arr[Math.floor(Math.random() * arr.length)]; }

function makeParticle(inner, w) {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.setProperty('--x',    rnd(2, 96).toFixed(1) + 'vw');
  el.style.setProperty('--dur',  rnd(10, 18).toFixed(1) + 's');
  el.style.setProperty('--delay','-' + rnd(0, 16).toFixed(1) + 's');
  const dir = Math.random() > 0.5 ? 1 : -1;
  el.style.setProperty('--spin', (dir * rnd(25, 80)).toFixed(0) + 'deg');
  el.style.setProperty('--w', w + 'px');
  el.appendChild(inner);
  return el;
}

// --- Globo ---
function makeBalloon() {
  const color = pick(BALLOON_COLORS);
  const w = Math.round(rnd(22, 36));
  const wrap = document.createElement('div');
  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.setProperty('--color', color);
  b.style.setProperty('--w', w + 'px');
  const knot = document.createElement('div');
  knot.className = 'balloon-knot';
  knot.style.setProperty('--color', color);
  b.appendChild(knot);
  wrap.appendChild(b);
  return makeParticle(wrap, w);
}

// --- Estrella ---
function makeStar() {
  const color = pick(STAR_COLORS);
  const w = Math.round(rnd(18, 30));
  const wrap = document.createElement('div');
  wrap.className = 'star-shape';
  wrap.style.setProperty('--w', w + 'px');
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 51 48');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', 'M25.5 3l5.9 17.9H50L35.6 31.6l5.7 17.9L25.5 38.3 9.7 49.5l5.7-17.9L1 20.9h18.6z');
  path.setAttribute('fill', color);
  path.setAttribute('stroke', 'rgba(0,0,0,0.08)');
  path.setAttribute('stroke-width', '1');
  svg.appendChild(path);
  wrap.appendChild(svg);
  return makeParticle(wrap, w);
}

// --- Pastel ---
function makeCake() {
  const color = pick(CAKE_COLORS);
  const w = Math.round(rnd(28, 40));
  const wrap = document.createElement('div');
  wrap.className = 'cake';
  wrap.style.setProperty('--w', w + 'px');
  wrap.style.setProperty('--color', color);

  const top = document.createElement('div');
  top.className = 'cake-top';

  for (let i = 0; i < 3; i++) {
    const c = document.createElement('div');
    c.className = 'cake-candle';
    c.style.setProperty('--candle-color', pick(CANDLE_COLORS));
    top.appendChild(c);
  }

  const body = document.createElement('div');
  body.className = 'cake-body';
  body.style.setProperty('--color', color);

  wrap.appendChild(top);
  wrap.appendChild(body);
  return makeParticle(wrap, w);
}

// --- Regalo ---
function makeGift() {
  const scheme = pick(GIFT_COLORS);
  const w = Math.round(rnd(24, 36));
  const wrap = document.createElement('div');
  wrap.className = 'gift';
  wrap.style.setProperty('--w', w + 'px');
  wrap.style.setProperty('--color', scheme.box);
  wrap.style.setProperty('--lid-color', scheme.lid);
  wrap.style.setProperty('--bow-color', scheme.bow);

  const lid = document.createElement('div');
  lid.className = 'gift-lid';
  const bow = document.createElement('div');
  bow.className = 'gift-bow';
  bow.style.setProperty('--bow-color', scheme.bow);
  lid.appendChild(bow);

  const box = document.createElement('div');
  box.className = 'gift-box';

  wrap.appendChild(lid);
  wrap.appendChild(box);
  return makeParticle(wrap, w);
}

// --- Cereza ---
function makeCherry() {
  const w = Math.round(rnd(20, 32));
  const wrap = document.createElement('div');
  wrap.className = 'cherry';
  wrap.style.setProperty('--w', w + 'px');

  const stem = document.createElement('div');
  stem.className = 'cherry-stem';

  const fruits = document.createElement('div');
  fruits.className = 'cherry-fruits';
  for (let i = 0; i < 2; i++) {
    const f = document.createElement('div');
    f.className = 'cherry-fruit';
    fruits.appendChild(f);
  }

  wrap.appendChild(stem);
  wrap.appendChild(fruits);
  return makeParticle(wrap, w);
}

// --- Confeti ---
function makeConfetti() {
  const color = pick(CONFETTI_COLORS);
  const w = Math.round(rnd(6, 12));
  const el = document.createElement('div');
  el.className = 'confetti-strip';
  el.style.setProperty('--color', color);
  el.style.setProperty('--w', w + 'px');
  el.style.background = color;
  return makeParticle(el, w);
}

// Generar partículas
const pc = document.getElementById('particles');
const makers = [makeBalloon, makeBalloon, makeStar, makeStar, makeCake, makeGift, makeCherry, makeCherry, makeConfetti, makeConfetti];
for (let i = 0; i < 32; i++) {
  pc.appendChild(pick(makers)());
}

// ===== POLAROIDS =====
const photos = [
  { url: 'imagenes/cumple1.jpeg', caption: 'Porque hoy eres la cumpleañera!!' },
  { url: 'imagenes/noche_estrellas3.jpeg', caption: 'Porque hoy brillas mas que nunca como una estrella.' },
  { url: 'imagenes/puerto1.jpeg', caption: 'Porque eres el angelito mas bello' },
  { url: 'imagenes/loe.jpeg', caption: 'Tambien porque eres una ternura de mujer' },
  { url: 'imagenes/cumple3.jpeg', caption: 'Porque este dia es para celebrar con tus seres queridos' },
  { url: 'imagenes/terraverde.jpeg', caption: 'Porque estas hecha una mamasita. Wow' },
  { url: 'imagenes/pastel1.jpeg', caption: 'Porque te mereces mil y un pasteles de red velvet.' },
  { url: 'imagenes/navidad.jpeg', caption: 'Porque tienes una vibra chispeante!' },
  { url: 'imagenes/creeps.jpeg', caption: 'Porque eres elegancia hecha mujer.' },
  { url: 'imagenes/noria.jpeg', caption: 'Hoy tienes el mundo a tus pies.' },
  { url: 'imagenes/cumple4.jpeg', caption: 'Porque los regalos hoy importan muchoo!.' },
  { url: 'imagenes/noche_estrellas2.jpeg', caption: 'Porque hay personas que te aman.' },
  { url: 'imagenes/nancy_cabrera.jpeg', caption: 'Y eres dulce como un postrecito.' },
];

const positions = [
  { top: '2%',  left: '1%',   rot: '-13deg', floatDelay: '0s',   width: '180px' },
  { top: '28%', left: '3%',   rot: '7deg',   floatDelay: '0.8s', width: '195px' },
  { top: '70%', left: '0%',   rot: '-5deg',  floatDelay: '0.3s', width: '185px' },
  { top: '1%',  left: '82%',  rot: '11deg',  floatDelay: '0.5s', width: '190px' },
  { top: '52%', left: '84%',  rot: '-9deg',  floatDelay: '1.1s', width: '180px' },
  { top: '78%', left: '79%',  rot: '6deg',   floatDelay: '0.6s', width: '200px' },
  { top: '-2%', left: '22%',  rot: '-8deg',  floatDelay: '0.2s', width: '175px' },
  { top: '1%',  left: '62%',  rot: '14deg',  floatDelay: '0.9s', width: '183px' },
  { top: '80%', left: '38%',  rot: '-6deg',  floatDelay: '1.3s', width: '193px' },
  { top: '50%', left: '1%',   rot: '-10deg', floatDelay: '1.5s', width: '187px' },
  { top: '82%', left: '60%',  rot: '9deg',   floatDelay: '0.4s', width: '178px' },
  { top: '26%', left: '83%',  rot: '-12deg', floatDelay: '1.6s', width: '185px' },
  { top: '78%', left: '18%',  rot: '5deg',   floatDelay: '0.7s', width: '182px' },
];

const INTERVAL = 7000;
let polaroidTimers = [];

function makeDraggableFlippable(el) {
  let isDragging = false;
  let hasDragged = false;
  let startX, startY, origLeft, origTop;

  function getPos(e) {
    const touch = e.touches ? e.touches[0] : e;
    return { x: touch.clientX, y: touch.clientY };
  }

  function onStart(e) {
    if (e.target.closest('button')) return;
    isDragging = true;
    hasDragged = false;
    const pos = getPos(e);
    startX = pos.x;
    startY = pos.y;
    origLeft = el.offsetLeft;
    origTop  = el.offsetTop;
    el.classList.add('dragging');
    el.style.animation = 'none';
    if (window._cursorGrab) document.body.style.cursor = window._cursorGrab;
    e.preventDefault();
  }

  function onMove(e) {
    if (!isDragging) return;
    const pos = getPos(e);
    const dx = pos.x - startX;
    const dy = pos.y - startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged = true;
    el.style.left = (origLeft + dx) + 'px';
    el.style.top  = (origTop  + dy) + 'px';
    e.preventDefault();
  }

  function onEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    el.classList.remove('dragging');
    if (!hasDragged) {
      el.classList.toggle('flipped');
    }
    // Restore the float animation — force reflow so it restarts cleanly
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = '';
    if (window._cursorNormal) document.body.style.cursor = window._cursorNormal;
  }

  el.addEventListener('mousedown',  onStart, { passive: false });
  el.addEventListener('touchstart', onStart, { passive: false });
  document.addEventListener('mousemove',  onMove,  { passive: false });
  document.addEventListener('touchmove',  onMove,  { passive: false });
  document.addEventListener('mouseup',    onEnd);
  document.addEventListener('touchend',   onEnd);
}

// ===== CONFETI (canvas) =====
function launchConfetti(duration = 3000) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:200;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#ff6b8a','#ffd166','#7ec8e3','#b388ff','#69d984','#ffb347','#ff8fab','#fff'];
  const pieces = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 200,
    w: 6 + Math.random() * 8,
    h: 3 + Math.random() * 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.15,
    vx: (Math.random() - 0.5) * 3,
    vy: 2.5 + Math.random() * 3,
    opacity: 1,
  }));

  const end = Date.now() + duration;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();
    const remaining = end - now;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      p.vy += 0.04;
      if (remaining < 800) p.opacity = Math.max(0, remaining / 800);

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (now < end) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}

// ===== FUEGOS ARTIFICIALES =====
function launchFireworks(duration = 5000) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:199;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const FW_COLORS = ['#ff6b8a','#ffd166','#7ec8e3','#b388ff','#69d984','#ffb347','#ff8fab','#fff','#f48fb1','#ffe066'];

  const particles = [];
  const rockets   = [];

  function explode(x, y) {
    const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
    const count = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.3;
      const speed = 1.5 + Math.random() * 4.5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 1,
        decay: 0.012 + Math.random() * 0.013,
        size: 2 + Math.random() * 2.5,
      });
    }
  }

  function launchRocket() {
    rockets.push({
      x: 0.15 * canvas.width + Math.random() * 0.7 * canvas.width,
      y: canvas.height,
      vy: -(9 + Math.random() * 6),
      targetY: canvas.height * 0.1 + Math.random() * canvas.height * 0.45,
    });
  }

  const end = Date.now() + duration;
  let lastLaunch = 0;

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.17)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();

    if (now - lastLaunch > 600 && now < end - 1000) {
      launchRocket();
      lastLaunch = now;
    }

    for (let ri = rockets.length - 1; ri >= 0; ri--) {
      const r = rockets[ri];
      r.y += r.vy;
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      if (r.y <= r.targetY) {
        explode(r.x, r.y);
        rockets.splice(ri, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.08;
      p.vx *= 0.98;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle   = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (now < end || rockets.length > 0 || particles.length > 0) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}

// ===== MODAL SECRETO =====
function createSecretModal() {
  const overlay = document.createElement('div');
  overlay.className = 'secret-overlay';
  overlay.innerHTML = `
    <div class="secret-modal">
      <div class="secret-lock-icon" id="secretLock">🔒</div>
      <p class="secret-prompt">Esta foto esconde algo especial.<br><em>¿Cuál es la palabra mágica?</em></p>
      <input class="secret-input" id="secretInput" type="text" placeholder="escribe aquí…" autocomplete="off" spellcheck="false">
      <div class="secret-error" id="secretError"></div>
      <div class="secret-actions">
        <button class="secret-btn" id="secretSubmit">Descubrir ✦</button>
        <button class="secret-btn secret-btn--ghost" id="secretCancel">Cerrar</button>
      </div>
      <div class="secret-message" id="secretMessage">
        <div class="secret-heart">♥</div>
        <p>Hay personas que te aman profundamente, que piensan en ti, que sonríen al recordarte aunque no esten... aunque yo no este.<br><br>Nunca estás sola, llevas su amor contigo a donde vayas. ✦</p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input     = overlay.querySelector('#secretInput');
  const submitBtn = overlay.querySelector('#secretSubmit');
  const cancelBtn = overlay.querySelector('#secretCancel');
  const errorDiv  = overlay.querySelector('#secretError');
  const message   = overlay.querySelector('#secretMessage');
  const lockIcon  = overlay.querySelector('#secretLock');

  // ← CAMBIA esta palabra si quieres otra contraseña
  const PASSWORD = 'amor';

  function tryUnlock() {
    if (input.value.trim().toLowerCase() === PASSWORD) {
      lockIcon.textContent = '🔓';
      lockIcon.classList.add('unlocked');
      errorDiv.textContent = '';
      overlay.querySelector('.secret-prompt').style.display = 'none';
      input.style.display        = 'none';
      submitBtn.style.display    = 'none';
      errorDiv.style.display     = 'none';
      message.classList.add('visible');
      launchConfetti(2500);
      // ← Pon el nombre de tu archivo de audio aquí (en la misma carpeta)
      playSecretAudio('TU_AUDIO_SECRETO.mp3');
    } else {
      errorDiv.textContent = 'Hmm… esa no es. Inténtalo de nuevo 💭';
      input.value = '';
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 500);
    }
  }

  submitBtn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
  cancelBtn.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  setTimeout(() => input.focus(), 300);
}

function spawnPolaroids() {
  document.querySelectorAll('.polaroid').forEach(el => el.remove());
  polaroidTimers.forEach(t => clearTimeout(t));
  polaroidTimers = [];

  const lastIndex = photos.length - 1;

  photos.forEach((photo, i) => {
    const pos = positions[i];
    const el = document.createElement('div');
    el.className = 'polaroid';
    el.style.top  = pos.top;
    el.style.left = pos.left;
    el.style.width = pos.width;
    el.style.setProperty('--rot', pos.rot);
    el.style.setProperty('--float-delay', pos.floatDelay);

    const hintHtml = i === 0 ? '<div class="polaroid-hint">Gírame &#x2192;</div>' : '';

    // índice 11 = "porque hay personas que te aman" → candado secreto
    const isSecret = i === 11;
    const backContent = isSecret
      ? `<div class="polaroid-back-text polaroid-back-secret">
           <span style="font-size:1.6rem;display:block;margin-bottom:8px;">🔒</span>
           <span>Toca para descubrir<br>el mensaje secreto</span>
         </div>`
      : `<div class="polaroid-back-text">${photo.caption}</div>`;

    el.innerHTML = `
      <div class="polaroid-inner">
        <div class="polaroid-front">
          <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
          ${hintHtml}
        </div>
        <div class="polaroid-back">${backContent}</div>
      </div>
    `;

    document.body.appendChild(el);
    makeDraggableFlippable(el);

    // Al voltear el polaroid secreto → abrir modal cada vez que ya esté flipped
    if (isSecret) {
      let wasFlippedOnMousedown = false;
      el.addEventListener('mousedown', () => {
        wasFlippedOnMousedown = el.classList.contains('flipped');
      });
      el.addEventListener('touchstart', () => {
        wasFlippedOnMousedown = el.classList.contains('flipped');
      }, { passive: true });
      el.addEventListener('click', () => {
        if (wasFlippedOnMousedown) {
          createSecretModal();
        }
      });
    }

    const t = setTimeout(() => {
      el.classList.add('show');
      if (i === lastIndex) setTimeout(() => launchFireworks(5500), 800);
    }, 600 + i * INTERVAL);
    polaroidTimers.push(t);
  });
}

function hidePolaroids() {
  polaroidTimers.forEach(t => clearTimeout(t));
  polaroidTimers = [];
  document.querySelectorAll('.polaroid').forEach(el => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 600);
  });
}

// ===== TYPEWRITER =====
function typewriterLetter(onComplete) {
  const paragraphs = document.querySelectorAll('.letter-body p');
  const salute    = document.querySelector('.letter-salute');
  const sign      = document.querySelector('.letter-sign');
  const closeBtn  = document.querySelector('.close-btn');

  // Ocultar firma y botón hasta terminar
  sign.style.opacity = '0';
  closeBtn.style.opacity = '0';
  closeBtn.style.pointerEvents = 'none';

  // Guardar textos originales
  const texts = Array.from(paragraphs).map(p => p.textContent);
  paragraphs.forEach(p => { p.textContent = ''; });

  // Crear cursor reutilizable
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';

  let pIndex = 0;
  let charIndex = 0;
  const SPEED = 28; // ms por carácter

  function typeNext() {
    if (pIndex >= paragraphs.length) {
      // Terminó — mostrar firma y botón
      cursor.remove();
      sign.style.transition = 'opacity 0.7s ease';
      sign.style.opacity = '1';
      closeBtn.style.transition = 'opacity 0.7s ease 0.4s';
      closeBtn.style.opacity = '1';
      closeBtn.style.pointerEvents = 'auto';
      if (onComplete) onComplete();
      return;
    }

    const p = paragraphs[pIndex];
    const fullText = texts[pIndex];
    p.classList.add('tw-typing');

    if (charIndex === 0) {
      p.textContent = '';
      p.appendChild(cursor);
    }

    if (charIndex < fullText.length) {
      // Insertar el siguiente carácter antes del cursor
      p.insertBefore(document.createTextNode(fullText[charIndex]), cursor);
      charIndex++;
      const delay = fullText[charIndex - 1] === ',' || fullText[charIndex - 1] === '.' ? SPEED * 6 : SPEED;
      setTimeout(typeNext, delay);
    } else {
      // Párrafo terminado
      p.classList.remove('tw-typing');
      p.classList.add('tw-done');
      pIndex++;
      charIndex = 0;
      setTimeout(typeNext, 320); // pausa entre párrafos
    }
  }

  // Pequeña pausa antes de empezar para que la carta aparezca primero
  setTimeout(typeNext, 500);
}

// ===== SONIDO DE PAPEL (generado con Web Audio API) =====
function playPaperSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // -- Capa 1: crujido inicial (ruido filtrado, corto) --
    function crinkle(startTime, duration, gain, filterFreq) {
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.4);
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;

      const bpf = ctx.createBiquadFilter();
      bpf.type = 'bandpass';
      bpf.frequency.value = filterFreq;
      bpf.Q.value = 0.6;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      src.connect(bpf);
      bpf.connect(gainNode);
      gainNode.connect(ctx.destination);
      src.start(startTime);
    }

    const now = ctx.currentTime;
    // Tres capas de crujido escalonadas para simular el pliegue del sobre
    crinkle(now,        0.18, 0.55, 3200);
    crinkle(now + 0.12, 0.22, 0.45, 2600);
    crinkle(now + 0.28, 0.30, 0.35, 4000);
    crinkle(now + 0.45, 0.20, 0.25, 3600);

    // -- Capa 2: roce suave de papel deslizándose (más bajo, más largo) --
    const slideSize = Math.floor(ctx.sampleRate * 0.6);
    const slideBuf  = ctx.createBuffer(1, slideSize, ctx.sampleRate);
    const slideData = slideBuf.getChannelData(0);
    for (let i = 0; i < slideSize; i++) {
      slideData[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / slideSize);
    }
    const slideSrc = ctx.createBufferSource();
    slideSrc.buffer = slideBuf;

    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 1800;

    const slideGain = ctx.createGain();
    slideGain.gain.setValueAtTime(0.18, now + 0.1);
    slideGain.gain.linearRampToValueAtTime(0.0001, now + 0.7);

    slideSrc.connect(lpf);
    lpf.connect(slideGain);
    slideGain.connect(ctx.destination);
    slideSrc.start(now + 0.1);

    // Cerrar el contexto cuando ya no haga falta
    setTimeout(() => ctx.close(), 1200);
  } catch (e) {
    // Si el navegador no soporta AudioContext, simplemente no suena
  }
}

let opened = false;

function openEnvelope() {
  if (opened) return;
  opened = true;
  playPaperSound();
  document.getElementById('envelope').classList.add('opening');
  setTimeout(() => {
    document.getElementById('letter').classList.add('visible');
    launchConfetti(3500);
    typewriterLetter(() => {
      setTimeout(spawnPolaroids, 300);
    });
  }, 900);
}

function closeLetter() {
  hidePolaroids();
  document.getElementById('letter').classList.remove('visible');

  // Resetear el typewriter para que funcione al volver a abrir
  document.querySelectorAll('.letter-body p').forEach(p => {
    p.classList.remove('tw-typing', 'tw-done');
  });
  const sign = document.querySelector('.letter-sign');
  const closeBtn = document.querySelector('.close-btn');
  if (sign) { sign.style.transition = ''; sign.style.opacity = ''; }
  if (closeBtn) { closeBtn.style.transition = ''; closeBtn.style.opacity = ''; closeBtn.style.pointerEvents = ''; }
  document.querySelector('.tw-cursor')?.remove();

  setTimeout(() => {
    document.getElementById('envelope').classList.remove('opening');
    opened = false;
  }, 600);
}

// ===== MÚSICA =====
const music = document.getElementById('bgMusic');
music.volume = 0.5;

document.addEventListener('click', function startMusic() {
  music.play().catch(() => {});
}, { once: true });

// Baja la música de fondo suavemente, reproduce el audio secreto,
// y al terminar sube la música de nuevo.
function playSecretAudio(src) {
  const secretAudio = new Audio(src);
  secretAudio.volume = 1.0;

  const DUCK_VOLUME  = 0.08;  // volumen al que baja la música de fondo
  const NORMAL_VOL   = 0.5;   // volumen normal de la música
  const FADE_STEPS   = 40;
  const FADE_INTERVAL= 30;    // ms por paso → ~1.2s de fade

  // -- Fade DOWN --
  let step = 0;
  const fadeDown = setInterval(() => {
    step++;
    music.volume = Math.max(DUCK_VOLUME, NORMAL_VOL - (NORMAL_VOL - DUCK_VOLUME) * (step / FADE_STEPS));
    if (step >= FADE_STEPS) {
      clearInterval(fadeDown);
      secretAudio.play().catch(() => {});
    }
  }, FADE_INTERVAL);

  // -- Fade UP cuando termine el audio secreto --
  secretAudio.addEventListener('ended', () => {
    let step2 = 0;
    const fadeUp = setInterval(() => {
      step2++;
      music.volume = Math.min(NORMAL_VOL, DUCK_VOLUME + (NORMAL_VOL - DUCK_VOLUME) * (step2 / FADE_STEPS));
      if (step2 >= FADE_STEPS) clearInterval(fadeUp);
    }, FADE_INTERVAL);
  });
}

// ===== CURSOR PERSONALIZADO (pastelito) =====
(function() {
  const cake = `<svg xmlns='http://www.w3.org/2000/svg' width='38' height='42' viewBox='0 0 38 42'><rect x='9' y='5' width='4' height='10' rx='2' fill='%23ff6b8a'/><ellipse cx='11' cy='4' rx='2.2' ry='3' fill='%23ffe066'/><rect x='17' y='2' width='4' height='12' rx='2' fill='%237ec8e3'/><ellipse cx='19' cy='1' rx='2.2' ry='3' fill='%23ffe066'/><rect x='25' y='5' width='4' height='10' rx='2' fill='%23b388ff'/><ellipse cx='27' cy='4' rx='2.2' ry='3' fill='%23ffe066'/><ellipse cx='11' cy='3' rx='1.5' ry='2' fill='%23ff9900' opacity='.85'/><ellipse cx='19' cy='0' rx='1.5' ry='2' fill='%23ff9900' opacity='.85'/><ellipse cx='27' cy='3' rx='1.5' ry='2' fill='%23ff9900' opacity='.85'/><rect x='3' y='14' width='32' height='7' rx='3' fill='%23fff0f5'/><path d='M3 14 Q7 11 11 14 Q15 11 19 14 Q23 11 27 14 Q31 11 35 14' stroke='%23ffb3c6' stroke-width='2.5' fill='none' stroke-linecap='round'/><rect x='3' y='20' width='32' height='17' rx='3' fill='%23f48fb1'/><rect x='3' y='28' width='32' height='4' fill='%23f06292' opacity='.45' rx='1'/><circle cx='12' cy='25' r='2' fill='%23fff' opacity='.6'/><circle cx='19' cy='24' r='2' fill='%23fff' opacity='.6'/><circle cx='26' cy='25' r='2' fill='%23fff' opacity='.6'/><rect x='1' y='37' width='36' height='5' rx='2.5' fill='%23e91e8c' opacity='.25'/></svg>`;

  const grab = `<svg xmlns='http://www.w3.org/2000/svg' width='38' height='42' viewBox='0 0 38 42'><rect x='9' y='5' width='4' height='10' rx='2' fill='%23ff6b8a'/><ellipse cx='11' cy='4' rx='2.2' ry='3' fill='%23ffe066'/><rect x='17' y='2' width='4' height='12' rx='2' fill='%237ec8e3'/><ellipse cx='19' cy='1' rx='2.2' ry='3' fill='%23ffe066'/><rect x='25' y='5' width='4' height='10' rx='2' fill='%23b388ff'/><ellipse cx='27' cy='4' rx='2.2' ry='3' fill='%23ffe066'/><ellipse cx='11' cy='3' rx='1.5' ry='2' fill='%23ff9900' opacity='.85'/><ellipse cx='19' cy='0' rx='1.5' ry='2' fill='%23ff9900' opacity='.85'/><ellipse cx='27' cy='3' rx='1.5' ry='2' fill='%23ff9900' opacity='.85'/><rect x='3' y='14' width='32' height='7' rx='3' fill='%23fff0f5'/><path d='M3 14 Q7 11 11 14 Q15 11 19 14 Q23 11 27 14 Q31 11 35 14' stroke='%23ffb3c6' stroke-width='2.5' fill='none' stroke-linecap='round'/><rect x='3' y='20' width='32' height='17' rx='3' fill='%23e91e8c'/><rect x='3' y='28' width='32' height='4' fill='%23c2185b' opacity='.45' rx='1'/><circle cx='12' cy='25' r='2' fill='%23fff' opacity='.6'/><circle cx='19' cy='24' r='2' fill='%23fff' opacity='.6'/><circle cx='26' cy='25' r='2' fill='%23fff' opacity='.6'/><rect x='1' y='37' width='36' height='5' rx='2.5' fill='%23e91e8c' opacity='.25'/></svg>`;

  window._cursorNormal = `url("data:image/svg+xml,${cake}") 19 21, auto`;
  window._cursorGrab   = `url("data:image/svg+xml,${grab}") 19 21, grabbing`;
  document.body.style.cursor = window._cursorNormal;
})();
