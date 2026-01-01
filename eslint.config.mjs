import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ["eslint:recommended", "next"],
  }),
  // Ignore Next build artifacts
  {
    ignores: [".next/**"],
  },
  // Apply Jest recommended rules to test files via compat.config
  ...compat.config({
    overrides: [
      {
        files: ["tests/**", "**/*.test.js", "**/*.spec.js"],
        extends: ["plugin:jest/recommended"],
      },
    ],
  }),
];

export default eslintConfig;
