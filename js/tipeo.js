(() => {
  const q = document.getElementById("q");
  const a = document.getElementById("a");
  const reveal = document.getElementById("reveal");
  if (!q || !a || !reveal) {
    console.error("No se encontraron los elementos #q, #a o #reveal en el DOM");
    return;
  }

  let skip = false;
  let wake = null;

  // wait cancelable: si el usuario salta, se resuelve de inmediato
  const wait = (ms) =>
    new Promise((resolve) => {
      if (skip) return resolve();
      const t = setTimeout(resolve, ms);
      wake = () => {
        clearTimeout(t);
        resolve();
      };
    });

  function doSkip() {
    skip = true;
    if (wake) wake();
  }

  // Clic, toque o cualquier tecla saltan la animación
  ["click", "pointerdown", "keydown"].forEach((evt) =>
    window.addEventListener(evt, doSkip, { once: true }),
  );

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  async function type(el, segments, speed = 40) {
    el.appendChild(cursor);
    for (const seg of segments) {
      const span = document.createElement("span");
      if (seg.cls) span.className = seg.cls;
      el.insertBefore(span, cursor);
      for (const ch of seg.text) {
        span.textContent += ch;
        if (!skip) await wait(speed + Math.random() * 25);
      }
    }
  }

  async function run() {
    q.textContent = "";
    a.textContent = "";

    await wait(400);


    await type(
      q,
      [
        { text: "¿Para qué contratarme si la " },
        { text: "IA", cls: "hl" },
        { text: " puede hacer mi trabajo?" },
      ],
      18,
    );


    cursor.classList.add("thinking");
    await wait(1400);
    cursor.classList.remove("thinking");


    await type(
      a,
      [{ text: "La IA escribe código. Yo pongo el criterio." }],
      40,
    );

    reveal.classList.add("show");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
