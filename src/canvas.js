const NODE_COUNT = 60;
const MAX_LINK_DIST = 140;
const SPEED = 0.15;

export function initHeroCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let nodes = [];
  let frameId = null;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }));
  }

  function step() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_LINK_DIST) {
          const opacity = 1 - dist / MAX_LINK_DIST;
          ctx.strokeStyle = `rgba(139, 143, 166, ${opacity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.fillStyle = 'rgba(196, 199, 217, 0.7)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    step();
    draw();
    frameId = requestAnimationFrame(loop);
  }

  function start() {
    if (frameId !== null) return;
    if (reduceMotion) {
      draw();
      return;
    }
    loop();
  }

  function stop() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  resize();
  createNodes();
  draw();

  if (!reduceMotion) {
    start();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
  }

  window.addEventListener('resize', () => {
    resize();
    createNodes();
    draw();
  });
}
