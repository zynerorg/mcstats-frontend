import { defineStore } from "#imports";

export const useTransformerStore = defineStore("transformer", () => {
  const { api } = useAppStore();

  const categoryMap = ref<Record<number, string>>({});

  async function loadCategories() {
    const categories = (await api.categories()).data;
    categoryMap.value = Object.fromEntries(
      categories.map((c) => [c.id, c.name]),
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
