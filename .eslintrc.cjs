module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["artifacts", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["unused-imports", "simple-import-sort", "import"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^\\u0000", "^@?\\w", "^[^.]", "^\\.", "^.+\\.s?css$"]],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};
