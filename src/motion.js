export function enhanceMotion(preference, portrait) {
  const reveal = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add("entered");
      reveal.unobserve(target);
    }
  }, { threshold: 0.11 });
  document.querySelectorAll("[data-reveal]").forEach(element => reveal.observe(element));

  const visible = new Set();
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const stage = portrait?.querySelector(".portrait-stage");
  let pointer;
  let pending = false;

  function update() {
    pending = false;
    if (!preference.matches) return;
    const positions = [...visible].map(element => {
      const box = element.getBoundingClientRect();
      return [element, box];
    });
    const portraitBox = pointer && stage?.getBoundingClientRect();
    for (const [element, box] of positions) {
      if (element === portrait) {
        const progress = Math.min(1, Math.max(0, (72 - box.top) / box.height));
        stage.style.setProperty("--hero-scroll", progress * 14 + "px");
        stage.style.setProperty("--hero-scale", String(1 - progress * .035));
        stage.style.setProperty("--orbit-angle", progress * 18 + "deg");
      } else {
        const progress = (box.top + box.height / 2) / innerHeight - .5;
        element.style.setProperty("--drift", Math.max(-8, Math.min(8, progress * 13)) + "px");
      }
    }
    if (stage) {
      const x = portraitBox ? (pointer.clientX - portraitBox.left) / portraitBox.width - .5 : 0;
      const y = portraitBox ? (pointer.clientY - portraitBox.top) / portraitBox.height - .5 : 0;
      stage.style.setProperty("--tilt-x", -y * 9 + "deg");
      stage.style.setProperty("--tilt-y", x * 9 + "deg");
    }
  }

  function requestUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }

  const drift = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) visible.add(target);
      else visible.delete(target);
    }
    requestUpdate();
  });
  document.querySelectorAll("[data-drift]").forEach(element => drift.observe(element));
  if (portrait) drift.observe(portrait);
  if (stage && finePointer.matches) {
    stage.addEventListener("pointermove", event => {
      pointer = event;
      requestUpdate();
    }, { passive: true });
    stage.addEventListener("pointerleave", () => {
      pointer = undefined;
      requestUpdate();
    });
  }
  addEventListener("scroll", requestUpdate, { passive: true });
  addEventListener("resize", requestUpdate, { passive: true });
}
