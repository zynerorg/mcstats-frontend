import { defineStore } from "#imports";
import { Configuration, DefaultApi } from "@me/sdk";

export const useAppStore = defineStore("app", () => {
  const env = useRuntimeConfig();
  const configuration = new Configuration({ basePath: env.public.API_URL });
  const api = new DefaultApi(configuration);

  return { api };
});
