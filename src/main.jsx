const root = document.documentElement;
const navigation = document.querySelector("#site-nav");
const toggle = document.querySelector(".menu-toggle");
const narrow = matchMedia("(max-width: 900px)");
const header = navigation.closest(".nav-inner");

function setMenu(open) {
  const expanded = narrow.matches && open;
  toggle.setAttribute("aria-expanded", String(expanded));
  header.toggleAttribute("data-menu-open", expanded);
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
document.addEventListener("pointerdown", event => {
  if (header.hasAttribute("data-menu-open") && !header.contains(event.target)) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !header.hasAttribute("data-menu-open")) return;
  setMenu(false);
  toggle.focus();
});

const sectionLinks = [...navigation.querySelectorAll("[data-section]")];
const sections = sectionLinks.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
if (sections.length) {
  const visible = new Set();
  const active = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    }
    const current = sections.find(section => visible.has(section.id))?.id;
    for (const link of sectionLinks) {
      if (link.dataset.section === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-18% 0px -57% 0px" });
  sections.forEach(section => active.observe(section));
}

const theme = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
let transitionTimer;
function setTheme(value, animate = false) {
  const dark = value === "dark";
  if (animate) {
    root.setAttribute("data-theme-transition", "");
    clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => root.removeAttribute("data-theme-transition"), 220);
  }
  root.dataset.theme = dark ? "dark" : "light";
  themeColor.content = dark ? "#13121c" : "#faf9fc";
  theme.setAttribute("aria-pressed", String(dark));
}
setTheme(root.dataset.theme);
theme.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next, true);
  try { localStorage.setItem("portfolio-theme", next); } catch { /* Theme still applies to this page. */ }
});
addEventListener("storage", event => {
  if (event.key === "portfolio-theme") setTheme(event.newValue);
});

const locale = document.querySelector(".locale-link");
const alternate = locale.getAttribute("href");
function syncLocaleLink() {
  locale.setAttribute("href", alternate + location.hash);
}
syncLocaleLink();
addEventListener("hashchange", syncLocaleLink);
locale.addEventListener("click", event => {
  syncLocaleLink();
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  try { localStorage.setItem("portfolio-language", locale.dataset.language); } catch { /* Links work without storage. */ }
});

const catalog = document.querySelector("#credential-filters");
if (catalog) import("./credential-filters.js").then(({ enhanceFilters }) => enhanceFilters(catalog));

const motion = matchMedia("(prefers-reduced-motion: no-preference)");
const motionTargets = [...document.querySelectorAll("[data-portrait], [data-project-motion], .button")];
function startMotion() {
  if (!motion.matches) return;
  removeEventListener("scroll", startMotion);
  motionTargets.forEach(element => element.removeEventListener("pointerenter", startMotion));
  import("./motion.js").then(({ enhanceMotion }) => enhanceMotion(motion));
}
addEventListener("scroll", startMotion, { passive: true });
motionTargets.forEach(element => element.addEventListener("pointerenter", startMotion, { passive: true }));
