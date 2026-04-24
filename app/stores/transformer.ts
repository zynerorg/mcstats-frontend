import { defineStore } from "#imports";
import { useApi } from "~/composables/useApi";

export const useTransformerStore = defineStore("transformer", () => {
  const api = useApi();

  const categoryMap = ref<Record<number, string>>({});

  async function loadCategories() {
    const response = await api.getMinecraftStatsAPI().categories();
    categoryMap.value = Object.fromEntries(
      response.data.map((c) => [c.id, c.name]),
    );
  }

  function getCategoryNameById(id: number): string | undefined {
    return categoryMap.value[id];
  }

  return {
    loadCategories,
    getCategoryNameById,
  };
});
