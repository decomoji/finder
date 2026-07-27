import { globalIgnores } from "eslint/config";
import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}"],
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "public/decomoji/**"]),

  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
);
