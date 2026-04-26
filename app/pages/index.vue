<script setup lang="ts">
import type { PlayerStat } from "~~/generated/api";

const { t, te } = useI18n();
const api = useApi();
const transformer = useTransformerStore();

void transformer.loadCategories();

const [categoriesRes, itemsRes, playersRes] = await Promise.all([
  api.categories(),
  api.items(),
  api.players(),
]);

function translateCategory(name: string) {
  const key = `categories.${name}`;
  return te(key) ? t(key) : name;
}

const rawCategories = withNoneOption(categoriesRes.data, t("common.none"));
const categories = rawCategories.map((c) => {
  return {
    ...c,
    label: c.id === -1 ? t("common.none") : translateCategory(c.name),
  };
});

function formatItem(name: string) {
  if (!name.startsWith("minecraft:")) return name;
  const s = `statName.${name}`;
  console.log(s);
  if (te(s)) return t(s);
  return name
    .slice(10, name.length)
    .split("_")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const rawItems = withNoneOption(itemsRes.data, t("common.none"));
const items = rawItems.map((c) => {
  return {
    ...c,
    label: c.id === -1 ? t("common.none") : formatItem(c.name),
  };
});
const players = withNoneOption(playersRes.data, t("common.none"));

const selectedCategory = ref(getDefaultNone(categories, t("common.none")));
const selectedItem = ref(getDefaultNone(items, t("common.none")));
const selectedPlayer = ref(getDefaultNone(players, t("common.none")));

const { data, page, maxPage, filters } = useDataTable({
  filters: [
    {
      key: "player",
      label: "filters.player",
      type: "select",
      items: players,
      modelValue: selectedPlayer,
    },
    {
      key: "category",
      label: "filters.category",
      type: "select",
      items: categories,
      modelValue: selectedCategory,
    },
    {
      key: "item",
      label: "filters.item",
      type: "select",
      items: items,
      modelValue: selectedItem,
    },
  ],
  t,

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
    accessorFn: (row: PlayerStat) => {
      const categoryName = transformer.getCategoryNameById(
        row.statCategoriesId,
      );
      const translated = t(`categories.${categoryName}`) || categoryName;
      return translated;
    },
    header: t("stats.category"),
  },
  {
    accessorFn: (row: PlayerStat) => {
      return formatItem(row.statName);
    },
    header: t("stats.type"),
  },
  {
    accessorFn: (row: PlayerStat) => {
      if (row.statName.endsWith("one_cm")) return row.value / 100;
    },
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
