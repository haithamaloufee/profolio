import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seo } from "../src/data/profile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const robotsPath = path.join(publicDir, "robots.txt");
const sitemapPath = path.join(publicDir, "sitemap.xml");

const envSiteUrl = process.env.SITE_URL?.trim();
const configuredSiteUrl = seo.siteUrl?.trim();
const siteUrl = (envSiteUrl || configuredSiteUrl || "").replace(/\/+$/, "");

const genericRobots = `User-agent: *
Allow: /

# Add SITE_URL in Vercel or set seo.siteUrl in src/data/profile.js to generate sitemap.xml automatically.
`;

if (!siteUrl) {
  fs.writeFileSync(robotsPath, genericRobots, "utf8");

  if (fs.existsSync(sitemapPath)) {
    fs.unlinkSync(sitemapPath);
  }

  process.exit(0);
}

const homeUrl = `${siteUrl}/`;
const lastModified = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${homeUrl}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(sitemapPath, sitemap, "utf8");
fs.writeFileSync(robotsPath, robots, "utf8");
