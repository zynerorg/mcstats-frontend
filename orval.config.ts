import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "http://localhost:2456/openapi.json",
    output: {
      target: "./generated/api.ts",
      client: "axios",
    },
  },
});
