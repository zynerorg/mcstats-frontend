// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt"],
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

  typescript: {
    typeCheck: true,
    strict: true,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
