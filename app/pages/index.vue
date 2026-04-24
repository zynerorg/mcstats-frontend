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

const categories = withNoneOption(categoriesRes.data);
const items = withNoneOption(itemsRes.data);
const players = withNoneOption(playersRes.data);

const selectedCategory = ref(getDefaultNone(categories));
const selectedItem = ref(getDefaultNone(items));
const selectedPlayer = ref(getDefaultNone(players));

const { data, page, maxPage, isLoading, error, filters } = useDataTable({
  filters: [
    {
      key: "player",
      label: "Player",
      type: "select",
      items: players,
      modelValue: selectedPlayer,
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      items: categories,
      modelValue: selectedCategory,
    },
    {
      key: "item",
      label: "Item",
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
    accessorFn: (row) =>
      transformer.getCategoryNameById(row.statCategoriesId as number),
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

      <DynamicTable
        :data="data as any"
        :columns="columns"
        :is-loading="isLoading"
        :error="error"
      >
        <template #playerName-cell="{ cell }">
          <div class="flex items-center gap-3">
            <img
              :src="`https://mineskin.eu/helm/${cell.getValue()}`"
              class="w-8 h-8 rounded"
            />
            <span>{{ cell.getValue() }}</span>
          </div>
        </template>

        <template #value-cell="{ cell }">
          <span class="font-mono font-semibold">
            {{ cell.getValue() }}
          </span>
        </template>
      </DynamicTable>
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
