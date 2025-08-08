import eslint from "@eslint/js";
import * as pluginImportX from "eslint-plugin-import-x";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import * as reactHooks from "eslint-plugin-react-hooks";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  reactHooks.configs["recommended-latest"],
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": ["error", {}],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "import-x/no-named-as-default-member": "off",
      "import-x/order": [
        "error",
        {
          pathGroupsExcludedImportTypes: ["builtin"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "{react,react-router}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{{@mantine,mantine-*,react-icons}/**,mantine-*}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{@connectrpc,@tanstack,@buf,@bufbuild}/**",
              group: "external",
              position: "before",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
          named: {
            enabled: true,
            types: "types-first",
          },
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      ".react-router",
      "app/gen",
      "build",
      "output",
    ],
  },
);
