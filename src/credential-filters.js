export function enhanceFilters(form) {
  const entries = [...document.querySelectorAll("[data-category]")].map(element => ({
    element,
    text: element.textContent.toLowerCase(),
    category: element.dataset.category,
  }));
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty-state");

  function update() {
    const filters = new FormData(form);
    const query = filters.get("q").trim().toLowerCase().split(/\s+/);
    const category = filters.get("category");
    let visible = 0;
    for (const entry of entries) {
      const matches = (category === "All" || entry.category === category) && query.every(word => entry.text.includes(word));
      entry.element.hidden = !matches;
      if (matches) visible += 1;
    }
    count.textContent = visible + (visible === 1 ? " credential" : " credentials");
    empty.hidden = visible !== 0;
  }

  form.addEventListener("input", update);
  form.addEventListener("submit", event => event.preventDefault());
  function clearFilters() {
    form.elements.q.value = "";
    form.querySelector('input[value="All"]').checked = true;
    update();
  }

  form.addEventListener("reset", event => {
    event.preventDefault();
    clearFilters();
    form.elements.q.focus();
  });

  function openTarget() {
    const target = entries.find(entry => "#" + entry.element.id === location.hash);
    if (!target) return;
    if (target.element.hidden) clearFilters();
    target.element.querySelector("details").open = true;
  }

  form.hidden = false;
  update();
  openTarget();
  window.addEventListener("hashchange", openTarget);
}
