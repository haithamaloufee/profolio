import { getContent, localizedPath } from "./content.js";
import { personal } from "./data/profile.js";

export const languages = ["en", "ar"];
export const contentByLanguage = Object.fromEntries(languages.map(language => [language, getContent(language)]));

const metadata = {
  en: {
    credentials: ["Credentials & Training | Haitham Aloufee", "Browse Haitham Aloufee’s certifications, course completions and workshop recognition across cloud, AI and software development."],
    missing: ["Page Not Found | Haitham Aloufee", "Find selected work, credentials and contact information on Haitham Aloufee’s portfolio."],
  },
  ar: {
    credentials: ["الشهادات والتدريب | هيثم العوفي", "استعرض الشهادات المهنية والدورات وورش العمل التي أكملها هيثم العوفي في الحوسبة السحابية والذكاء الاصطناعي وتطوير البرمجيات والأمن."],
    missing: ["الصفحة غير موجودة | هيثم العوفي", "استكشف المشاريع المختارة والشهادات وطرق التواصل في موقع هيثم العوفي."],
  },
};

export const routes = languages.flatMap(language => {
  const { copy, profile, projects } = contentByLanguage[language];
  const titles = metadata[language];
  const study = language === "ar" ? project => "دراسة حالة «" + project.title + "»" : project => project.title + " Case Study";
  return [
    { basePath: "/", page: "home", title: copy.name + " | " + personal.title, description: profile.bio },
    { basePath: "/credentials", page: "credentials", title: titles.credentials[0], description: titles.credentials[1] },
    ...projects.map(project => ({
      basePath: "/work/" + project.slug,
      page: "project",
      title: study(project) + " | " + copy.name,
      description: project.intro,
      project,
    })),
  ].map(route => ({ ...route, language, path: localizedPath(route.basePath, language) }));
});

export function languageForPath(path) {
  return path === "/ar" || path.startsWith("/ar/") ? "ar" : "en";
}

export function notFoundRoute(path) {
  const language = languageForPath(path);
  const [title, description] = metadata[language].missing;
  return { page: "not-found", language, title, description };
}

export function resolveRoute(path) {
  const normalized = path.replace(/\/+$/, "") || "/";
  return routes.find(route => route.path === normalized);
}
