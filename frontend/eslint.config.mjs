// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginPrettier from "eslint-plugin-prettier";

export default withNuxt(
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  eslintConfigPrettier,
);
