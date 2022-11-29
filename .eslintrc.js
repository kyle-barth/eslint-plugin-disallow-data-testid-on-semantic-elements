module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "eslint-plugin-local-rules"],
  rules: {
    "local-rules/data-testid": ["error"],
    "@typescript-eslint/no-unused-vars": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
