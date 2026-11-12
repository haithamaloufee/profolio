import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { renderPage, routes, searchFiles } from "../.render/render.js";

const template = await readFile("dist/index.html", "utf8");
if (!template.includes("<!--page-head-->") || !template.includes("<!--page-body-->")) {
  throw new Error("The built HTML template is missing its render placeholders.");
}

const output = routes.map(route => ({
  path: route.path === "/" ? "dist/index.html" : "dist" + route.path + ".html",
  html: renderPage(template, route.path).html,
}));
output.push({ path: "dist/404.html", html: renderPage(template, "/404").html });

await Promise.all(output.map(async ({ path, html }) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, html);
}));
await Promise.all(Object.entries(searchFiles()).map(([name, data]) => writeFile("dist/" + name, data)));
console.log("Prerendered " + routes.length + " public routes, 404, robots.txt and sitemap.xml.");
