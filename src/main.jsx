const navigation = document.querySelector("#site-nav");
const toggle = document.querySelector(".menu-toggle");
const narrow = matchMedia("(max-width: 700px)");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(narrow.matches && open));
}

toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
narrow.addEventListener("change", () => setMenu(false));
navigation.addEventListener("click", event => {
  const link = event.target.closest("a");
  if (!link || !narrow.matches) return;
  setMenu(false);
  if (link.pathname === location.pathname && link.hash) {
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  }
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || toggle.getAttribute("aria-expanded") !== "true") return;
  setMenu(false);
  toggle.focus();
});

const catalog = document.querySelector("#credential-filters");
if (catalog) import("./credential-filters.js").then(({ enhanceFilters }) => enhanceFilters(catalog));

const motion = matchMedia("(prefers-reduced-motion: no-preference)");
const portrait = document.querySelector("[data-portrait]");
function startMotion() {
  if (!motion.matches) return;
  removeEventListener("scroll", startMotion);
  portrait?.removeEventListener("pointerenter", startMotion);
  import("./motion.js").then(({ enhanceMotion }) => enhanceMotion(motion, portrait));
}
if (motion.matches) {
  addEventListener("scroll", startMotion, { passive: true });
  portrait?.addEventListener("pointerenter", startMotion, { passive: true });
}
