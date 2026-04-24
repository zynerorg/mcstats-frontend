<script setup lang="ts">
const { t } = useI18n();
const api = useApi();
const transformer = useTransformerStore();

void transformer.loadCategories();

const [categoriesRes, itemsRes, playersRes] = await Promise.all([
  api.categories(),
  api.items(),
  api.players(),
]);

const categories = withNoneOption(categoriesRes.data, t("common.none"));
const items = withNoneOption(itemsRes.data, t("common.none"));
const players = withNoneOption(playersRes.data, t("common.none"));

const selectedCategory = ref(getDefaultNone(categories, t("common.none")));
const selectedItem = ref(getDefaultNone(items, t("common.none")));
const selectedPlayer = ref(getDefaultNone(players, t("common.none")));

const { data, page, maxPage, filters } = useDataTable({
  filters: [
    {
      key: "player",
      label: t("filters.player"),
      type: "select",
      items: players,
      modelValue: selectedPlayer,
    },
    {
      key: "category",
      label: t("filters.category"),
      type: "select",
      items: categories,
      modelValue: selectedCategory,
    },
    {
      key: "item",
      label: t("filters.item"),
      type: "select",
      items: items,
      modelValue: selectedItem,
    },
  ],

  onFetch: async (filterValues, pageNum) => {
    const { category, item, player_uuid } = normalizeStatsFilters(filterValues);

    const response = await api.stats({
      category,
      item,
      player_uuid,
      limit: 25,
      page: pageNum,
    });

    return { data: response.data as any };
  },

  onTransform: createUuidTransformer("playerName"),
});

const columns = computed(() => [
  {
    accessorKey: "playerName",
    header: t("stats.player"),
  },
  {
    accessorFn: (row) => {
      const categoryName = transformer.getCategoryNameById(
        row.statCategoriesId as number,
      );
      const translated = t(`categories.${categoryName}`) || categoryName;
      return translated;
    },
    header: t("stats.category"),
  },
  {
    accessorKey: "statName",
    header: t("stats.type"),
  },
  {
    accessorKey: "value",
    header: t("stats.value"),
  },
]);

function handlePageUpdate(newPage: number) {
  page.value = newPage;
}
</script>

<template>
  <div>
    <UContainer>
      <TableHeader :title="t('stats.title')" />

      <UTable :data="data" :columns="columns">
        <template #playerName-cell="{ cell }">
          <div class="flex items-center gap-3">
            <img
              :src="`https://mineskin.eu/helm/${cell.getValue()}`"
              class="w-8 h-8 rounded"
            />
            <span>{{ cell.getValue() }}</span>
          </div>
        </template>
      </UTable>
    </UContainer>

    <ClientOnly>
      <Teleport to="#sidebar">
        <FilterPanel
          :filters="filters"
          :max-page="maxPage"
          @update:page="handlePageUpdate"
        />
      </Teleport>
    </ClientOnly>
  </div>
</template>
