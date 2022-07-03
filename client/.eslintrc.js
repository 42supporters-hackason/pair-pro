/* eslint-disable */

module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ["react", "@typescript-eslint", "import", "unused-imports"],
  rules: {
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "import/order": [
      "warn",
      {
        "newlines-between": "never",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroupsExcludedImportTypes: ["react"],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            posigion: "before",
          },
          {
            pattern:
              "{api,api/**,assets,assets/**,components/**,hooks/**,lib/**,pages/**,routes,theme,utils,utils/**}",
            group: "internal",
            posigion: "before",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/no-duplicates": "warn",
  },
};
