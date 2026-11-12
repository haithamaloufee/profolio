import { mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const base = process.env.PORTFOLIO_QA_URL ?? "http://127.0.0.1:4180";
const pages = { home: "/", nashmi: "/work/nashmi", trainers: "/work/youth-trainers-network", credentials: "/credentials" };
await mkdir(".qa/lighthouse", { recursive: true });
for (const [name, path] of Object.entries(pages)) {
  const result = spawnSync(process.execPath, [
    "node_modules/lighthouse/cli/index.js",
    base + path,
    "--only-categories=performance,accessibility,best-practices,seo",
    "--chrome-flags=--headless=new",
    "--output=json",
    "--output-path=.qa/lighthouse/" + name + ".json",
    "--quiet",
  ], {
    stdio: "inherit",
    env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH ?? chromium.executablePath() },
  });
  if (result.status !== 0) process.exit(result.status || 1);
}
