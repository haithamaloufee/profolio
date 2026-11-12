import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { categories, credentials } from "../src/data/credentials.js";
import { portrait, siteUrl } from "../src/data/profile.js";
import { projects } from "../src/data/projects.js";
import { contentByLanguage, resolveRoute, routes } from "../src/routes.js";

test("published credentials are unique, verified and categorized", () => {
  assert.equal(new Set(credentials.map(item => item.id)).size, credentials.length);
  assert.ok(credentials.filter(item => item.priority < 5).length >= 3);
  for (const item of credentials) {
    assert.equal(item.source.status, "verified");
    assert.ok(categories.includes(item.category));
    for (const date of [item.issued, item.expires].filter(Boolean)) {
      assert.match(date, /^\d{4}-\d{2}(-\d{2})?$/);
      assert.ok(!Number.isNaN(Date.parse(date)));
    }
    if (item.expires && item.issued) assert.ok(item.expires > item.issued);
  }
});

test("case study routes resolve and media variants exist", () => {
  assert.equal(resolveRoute("/"), routes[0]);
  assert.equal(resolveRoute("/unknown"), undefined);
  for (const project of projects) {
    const path = "/work/" + project.slug;
    assert.equal(resolveRoute(path + "/").project, project);
    if (project.repository) assert.match(project.repository, /^https:\/\/github\.com\/haithamaloufee\//);
    assert.ok(project.repository || project.demo);
    assert.ok(project.sections.length >= 4);
  }
  for (const image of [portrait, ...projects.map(project => project.image)]) {
    assert.ok(image.alt);
    for (const width of image.variants) {
      for (const format of ["avif", "webp", "jpg"]) {
        assert.ok(existsSync("public/media/" + image.name + "-" + width + "." + format));
      }
    }
  }
});

test("static output contains unique search metadata and stays free of local review assets", async () => {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const robots = await readFile("dist/robots.txt", "utf8");
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, routes.length);
  assert.ok(robots.includes("Sitemap: " + siteUrl + "/sitemap.xml"));
  const titles = new Set();
  for (const route of routes) {
    const file = route.path === "/" ? "dist/index.html" : "dist" + route.path + ".html";
    const html = await readFile(file, "utf8");
    assert.ok(html.includes('<html lang="' + route.language + '" dir="' + (route.language === "ar" ? "rtl" : "ltr") + '"'));
    for (const language of ["en", "ar", "x-default"]) {
      const counterpart = routes.find(other => other.basePath === route.basePath && other.language === (language === "x-default" ? "en" : language));
      assert.ok(html.includes('rel="alternate" hrefLang="' + language + '" href="' + siteUrl + counterpart.path + '"'));
      assert.ok(sitemap.includes('hreflang="' + language + '" href="' + siteUrl + counterpart.path + '"'));
    }
    assert.ok(html.includes('rel="canonical" href="' + siteUrl + route.path + '"'));
    assert.ok(sitemap.includes("<loc>" + siteUrl + route.path + "</loc>"));
    assert.ok(html.includes('<meta property="og:image" content="' + siteUrl + (route.language === "ar" ? "/og-image-ar.png" : "/og-image.png") + '"'));
    assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1);
    assert.doesNotMatch(html, /_review|Local review|noindex|TMS\.git/);
    titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
  }
  assert.equal(titles.size, routes.length);
  assert.ok(!existsSync("dist/.review-media") && !existsSync("dist/_review"));
  const home = await readFile("dist/index.html", "utf8");
  const { "@graph": graph } = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  assert.deepEqual(graph.map(node => node["@type"]), ["Person", "WebSite"]);
  assert.equal(graph[0]["@id"], graph[1].publisher["@id"]);
  assert.equal(graph[0].sameAs.length, 2);
  assert.equal(graph[0].alternateName, "هيثم العوفي");
  assert.ok(existsSync("dist/og-image-ar.png"));
});

test("all localized records have complete page copy and preserve their source identity", () => {
  const { ar, en } = contentByLanguage;
  assert.deepEqual(Object.keys(ar.copy).sort(), Object.keys(en.copy).sort());
  assert.deepEqual(ar.credentials.map(item => item.id), en.credentials.map(item => item.id));
  for (const item of ar.credentials) assert.ok(item.title && item.kind && item.issuer);
  for (const project of ar.projects) {
    const original = en.projects.find(item => item.slug === project.slug);
    assert.equal(project.sections.length, original.sections.length);
    assert.equal(project.demo, original.demo);
    assert.ok(project.sections.every(section => section.title && section.body));
  }
});
