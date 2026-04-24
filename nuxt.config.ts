// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n"],
  ssr: false,
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_PUBLIC_API_URL || process.env.API_URL || "",
    },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "sv", name: "Svenska", file: "sv.json" },
    ],
  },
});
