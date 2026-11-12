import { defineConfig } from "@playwright/test";

const port = 4180;
const baseURL = "http://127.0.0.1:" + port;

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  fullyParallel: true,
  workers: 2,
  timeout: 90000,
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port " + port + " --strictPort",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
