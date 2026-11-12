import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolveRoute } from "./src/routes.js";

const loopback = new Set(["127.0.0.1", "localhost", "::1"]);

function editorialPages() {
  return {
    name: "editorial-pages",
    configureServer(server) {
      const host = server.config.server.host;
      const reviewEnabled = server.config.mode === "review" && loopback.has(host);
      const reviewDirectory = join(server.config.root, ".review-media");
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        const path = new URL(req.url, "http://localhost").pathname;
        if (reviewEnabled && /^\/_review\/[a-z0-9-]+\.webp$/.test(path)) {
          const file = join(reviewDirectory, path.split("/").at(-1));
          try {
            const { size } = await stat(file);
            res.writeHead(200, { "Content-Type": "image/webp", "Content-Length": size, "Cache-Control": "no-store" });
            if (req.method === "HEAD") return res.end();
            createReadStream(file).pipe(res);
            return;
          } catch (error) {
            return error.code === "ENOENT" ? next() : next(error);
          }
        }
        if (path.includes(".") && path !== "/index.html") return next();
        if (path.startsWith("/@") || path.startsWith("/src/")) return next();
        try {
          const template = await readFile(join(server.config.root, "index.html"), "utf8");
          const { renderPage } = await server.ssrLoadModule("/src/render.jsx");
          const review = reviewEnabled
            ? JSON.parse(await readFile(join(reviewDirectory, "manifest.json"), "utf8"))
            : undefined;
          const { html, status } = renderPage(template, path === "/index.html" ? "/" : path, review);
          const result = await server.transformIndexHtml(req.url, html);
          res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
          res.end(req.method === "HEAD" ? undefined : result);
        } catch (error) {
          server.ssrFixStacktrace(error);
          next(error);
        }
      });
    },
    configurePreviewServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!["GET", "HEAD"].includes(req.method) || !req.headers.accept?.includes("text/html")) return next();
          const path = new URL(req.url, "http://localhost").pathname;
          if (path === "/index.html" || resolveRoute(path.replace(/\.html$/, ""))) return next();
          try {
            const html = await readFile(join(server.config.root, server.config.build.outDir, "404.html"), "utf8");
            res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
            res.end(req.method === "HEAD" ? undefined : html);
          } catch (error) {
            next(error);
          }
        });
      };
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [react(), editorialPages()],
  server: { fs: { deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "**/.review-media/**"] } },
  build: { target: "es2022" },
});
