(() => {
  const canvas = document.getElementById("matrix");
  if (!canvas) {
    console.error('No se encontró el elemento <canvas id="matrix">');
    return;
  }

  const ctx = canvas.getContext("2d");

  const CHARS = "アイウエオカキクケコサシスセソ0123456789<>{}/;=+".split("");
  const SIZE = 16;
  const FPS = 8; 

  let w,
    h,
    drops,
    timer = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drops = Array.from(
      { length: Math.floor(w / SIZE) },
      () => Math.random() * -40,
    );
    ctx.fillStyle = "#0A0F0D";
    ctx.fillRect(0, 0, w, h);
  }

  function draw() {
    ctx.fillStyle = "rgba(10, 15, 13, 0.08)"; // el fade deja la estela
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${SIZE}px monospace`;

    drops.forEach((y, i) => {
      const ch = CHARS[(Math.random() * CHARS.length) | 0];
      ctx.fillStyle = Math.random() > 0.96 ? "#E0F2E9" : "#00FF66";
      ctx.fillText(ch, i * SIZE, y * SIZE);
      drops[i] = y * SIZE > h && Math.random() > 0.975 ? 0 : y + 1;
    });
  }

  function start() {
    if (!timer) timer = setInterval(draw, 1000 / FPS);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  resize();
  start();

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start(),
  );
})();
