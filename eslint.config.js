import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/**", ".render/**", ".review-media/**", ".qa/**", "playwright-report/**", "test-results/**"] },
  {
    files: ["**/*.{js,mjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^[A-Z]" }],
    },
  },
];
