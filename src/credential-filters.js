export function enhanceFilters(form) {
  const entries = [...document.querySelectorAll("[data-category]")].map(element => ({
    element,
    summary: element.querySelector("summary"),
    category: element.dataset.category,
  }));
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty-state");
  const dialog = document.querySelector(".credential-dialog");
  const title = dialog.querySelector("h2");
  const content = dialog.querySelector(".dialog-content");
  let returnFocus;

  function update() {
    const filters = new FormData(form);
    const query = filters.get("q").trim().toLowerCase().split(/\s+/);
    const category = filters.get("category");
    let visible = 0;
    for (const entry of entries) {
      const categoryMatches = category === "All" || entry.category === category;
      if (categoryMatches && query[0] && entry.text === undefined) {
        entry.text = entry.element.textContent.toLowerCase();
      }
      const matches = categoryMatches && (!query[0] || query.every(word => entry.text.includes(word)));
      entry.element.hidden = !matches;
      if (matches) visible += 1;
    }
    count.textContent = visible + (visible === 1 ? " credential" : " credentials");
    empty.hidden = visible !== 0;
  }

  function clearFilters() {
    form.elements.q.value = "";
    form.querySelector('input[value="All"]').checked = true;
    update();
  }

  function openPreview(entry) {
    returnFocus = entry.summary;
    title.textContent = entry.element.querySelector(".credential-title").textContent;
    content.replaceChildren(entry.element.querySelector(".credential-detail").cloneNode(true));
    if (!dialog.open) dialog.showModal();
  }

  form.addEventListener("input", update);
  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("reset", event => {
    event.preventDefault();
    clearFilters();
    form.elements.q.focus();
  });
  if (form.elements.q.value || form.elements.category.value !== "All") update();
  if (typeof dialog.showModal !== "function") return;

  dialog.addEventListener("close", () => {
    returnFocus?.focus({ preventScroll: true });
    content.replaceChildren();
  });

  for (const entry of entries) {
    entry.summary.setAttribute("aria-haspopup", "dialog");
    entry.summary.addEventListener("click", event => {
      event.preventDefault();
      openPreview(entry);
    });
  }

  function openTarget() {
    const target = entries.find(entry => "#" + entry.element.id === location.hash);
    if (!target) return;
    if (target.element.hidden) clearFilters();
    openPreview(target);
  }

  openTarget();
  window.addEventListener("hashchange", openTarget);
}
