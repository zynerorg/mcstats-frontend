import axios from "axios";
import * as api from "~/../generated/api";

export const useApi = () => {
  const config = useRuntimeConfig();
  const axiosInstance = axios.create({
    baseURL: config.public.API_URL,
  });
  return {
    getMinecraftStatsAPI: () => api.getMinecraftStatsAPI(axiosInstance),
  };
};
