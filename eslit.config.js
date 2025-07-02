module.exports = {
  ignores: [".next/", "node_modules/"],

  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:@next/next/recommended",
    "prettier",
  ],
  env: {
    jest: true,
    node: true,
  },
};
