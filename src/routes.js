import { personal } from "./data/profile.js";
import { projects } from "./data/projects.js";

export const routes = [
  {
    path: "/",
    page: "home",
    title: "Haitham Aloufee | Full-Stack Developer & CIS Student",
    description: "Explore Nashmi, the Youth Trainers Network, YCS and credentials from Haitham Aloufee, a full-stack developer and CIS student in Jordan.",
  },
  {
    path: "/credentials",
    page: "credentials",
    title: "Credentials & Training | Haitham Aloufee",
    description: "Browse Haitham Aloufee’s certifications, course completions and workshop recognition across cloud, AI and software development.",
  },
  ...projects.map(project => ({
    path: "/work/" + project.slug,
    page: "project",
    title: project.title + " Case Study | " + personal.name,
    description: project.intro,
    project,
  })),
];

export const notFound = {
  page: "not-found",
  title: "Page Not Found | Haitham Aloufee",
  description: "Find selected work, credentials and contact information on Haitham Aloufee’s portfolio.",
};

export function resolveRoute(path) {
  const normalized = path.replace(/\/+$/, "") || "/";
  return routes.find(route => route.path === normalized);
}
