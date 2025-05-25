const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
    },
  },
]);
