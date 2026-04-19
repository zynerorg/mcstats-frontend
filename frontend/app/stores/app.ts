import { defineStore } from "#imports";
import { Configuration, DefaultApi } from "@me/sdk";

export const useAppStore = defineStore("app", () => {
  const env = useRuntimeConfig();
  const path = env.public.API_URL;
  console.log("Using API: " + path);
  const configuration = new Configuration({ basePath: path });
  const api = new DefaultApi(configuration);

  return { api };
});
