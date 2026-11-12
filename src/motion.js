const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const pixels = value => value.toFixed(2).replace(/\.00$/, "") + "px";
const degrees = value => value.toFixed(2) + "deg";

function paint(element, properties) {
  for (const [key, value] of Object.entries(properties)) element.style.setProperty("--" + key, value);
}

export function enhanceMotion(preference) {
  const hero = document.querySelector(".hero");
  const portrait = hero?.querySelector(".portrait");
  const stage = hero?.querySelector(".portrait-stage");
  const copy = hero?.querySelector(".hero-copy");
  const projects = [...document.querySelectorAll("[data-project-motion]")];
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const visible = new Set();
  if (stage) paint(stage, { "tilt-x": "0deg", "tilt-y": "0deg" });

  const reveal = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add("entered");
      reveal.unobserve(target);
    }
  }, { threshold: .10 });
  document.querySelectorAll("[data-reveal]").forEach(element => reveal.observe(element));

  let scrollFrame;
  function updateScroll() {
    scrollFrame = undefined;
    if (!preference.matches) return;
    const boxes = [...visible].map(element => [element, element.getBoundingClientRect()]);
    for (const [element, box] of boxes) {
      if (element === hero) {
        const progress = clamp((65 - box.top) / box.height, 0, 1);
        paint(copy, { "copy-drift": pixels(-progress * 17) });
        paint(stage, {
          "hero-scroll": pixels(progress * 26),
          "hero-scale": String(1 - progress * .035),
          "orbit-angle": degrees(progress * 26),
          "orbit-outer": degrees(-progress * 13),
        });
      } else {
        const progress = clamp((box.top + box.height / 2) / innerHeight - .5, -.7, .7);
        paint(element, { drift: pixels(progress * -27) });
      }
    }
  }

  function requestScroll() {
    if (!scrollFrame && preference.matches && visible.size) scrollFrame = requestAnimationFrame(updateScroll);
  }

  const track = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) visible.add(target);
      else visible.delete(target);
    }
    requestScroll();
  });
  if (hero) track.observe(hero);
  projects.forEach(element => track.observe(element));
  addEventListener("scroll", requestScroll, { passive: true });
  addEventListener("resize", requestScroll, { passive: true });

  function pointerEffect(element, render) {
    if (!element) return;
    let position;
    let frame;
    function request() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        if (!preference.matches) return;
        if (!position) { render(0, 0, false); return; }
        const box = element.getBoundingClientRect();
        const x = clamp((position.clientX - box.left) / box.width - .5, -.5, .5);
        const y = clamp((position.clientY - box.top) / box.height - .5, -.5, .5);
        render(x, y, true);
      });
    }
    element.addEventListener("pointermove", event => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      position = event;
      request();
    }, { passive: true });
    element.addEventListener("pointerleave", () => {
      position = undefined;
      request();
    });
  }

  const light = (x, y, active, travel, opacity) => ({
    "light-x": pixels(x * travel),
    "light-y": pixels(y * travel),
    "light-opacity": active ? String(opacity) : "0",
  });

  pointerEffect(portrait, (x, y, active) => paint(stage, {
    "tilt-x": degrees(-y * 10),
    "tilt-y": degrees(x * 10),
    "orbit-inner": degrees((x - y) * 22),
    ...light(x, y, active, 100, .55),
  }));
  projects.forEach(element => pointerEffect(element, (x, y, active) => paint(element, {
    "image-x": pixels(x * 9),
    "project-scale": active ? "1.035" : "1",
    ...light(x, y, active, 112, .23),
  })));
  document.querySelectorAll(".button").forEach(element => pointerEffect(element, (x, y, active) =>
    paint(element, light(x, y, active, 110, .72))));
}
