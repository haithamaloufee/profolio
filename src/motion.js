export function enhanceMotion(preference) {
  const reveal = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add("entered");
      reveal.unobserve(target);
    }
  }, { threshold: 0.11 });
  document.querySelectorAll("[data-reveal]").forEach(element => reveal.observe(element));

  const visible = new Set();
  let pending = false;
  function update() {
    pending = false;
    for (const element of visible) {
      const box = element.parentElement.getBoundingClientRect();
      const progress = (box.top + box.height / 2) / innerHeight - 0.5;
      element.style.setProperty("--drift", Math.max(-9, Math.min(9, progress * 14)) + "px");
    }
  }

  function requestUpdate() {
    if (pending || !visible.size) return;
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
  addEventListener("scroll", requestUpdate, { passive: true });
  addEventListener("resize", requestUpdate, { passive: true });
  preference.addEventListener("change", () => {
    if (preference.matches) return;
    reveal.disconnect();
    drift.disconnect();
    visible.clear();
    removeEventListener("scroll", requestUpdate);
    removeEventListener("resize", requestUpdate);
  }, { once: true });
}
