import { mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const base = process.env.PORTFOLIO_QA_URL ?? "http://127.0.0.1:4180";
const jobs = [
  ["en-home-mobile", "/"],
  ["en-home-desktop", "/", "desktop"],
  ["ar-home-mobile", "/ar"],
  ["ar-home-desktop", "/ar", "desktop"],
  ["ar-credentials-mobile", "/ar/credentials"],
  ["ar-trainers-mobile", "/ar/work/youth-trainers-network"],
];

await mkdir(".qa/lighthouse-bilingual", { recursive: true });
for (const [name, path, preset] of jobs) {
  const result = spawnSync(process.execPath, [
    "node_modules/lighthouse/cli/index.js",
    base + path,
    ...(preset ? ["--preset=" + preset] : []),
    "--only-categories=performance,accessibility,best-practices,seo",
    "--chrome-flags=--headless=new --disable-gpu",
    "--output=json",
    "--output-path=.qa/lighthouse-bilingual/" + name + ".json",
    "--quiet",
  ], {
    stdio: "inherit",
    env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH ?? chromium.executablePath() },
  });
  if (result.status !== 0) process.exit(result.status || 1);
}
