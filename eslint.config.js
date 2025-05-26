const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: require("eslint-plugin-react"),
    },
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
      "react/jsx-uses-react": "warn",
      "react/jsx-uses-vars": "warn",
    },
  },
]);
