<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Filter } from "~~/types/filter";
import { withNoneOption } from "~/utils/selectWithNone";
import { uuidToName } from "~/utils/names";

const { t, te } = useI18n();

const playersResult = usePlayers().result;
const categoriesResult = useCategories().result;
const itemsResult = useItems().result;

const players = computed(() =>
  withNoneOption(
    (playersResult.value?.players ?? []).map((p: any) => ({
      label: p.name,
      value: p.name,
    })),
    t("common.none"),
  ),
);

const categories = computed(() =>
  withNoneOption(
    (categoriesResult.value?.categories ?? []).map((c: string) => ({
      label: translateCategory(c),
      value: c,
    })),
    t("common.none"),
  ),
);

const items = computed(() =>
  withNoneOption(
    (itemsResult.value?.items ?? []).map((i: string) => ({
      label: formatItem(i),
      value: i,
    })),
    t("common.none"),
  ),
);

const selectedPlayer = ref<any>(null);
const selectedCategory = ref<any>(null);
const selectedItem = ref<any>(null);

watch(
  players,
  (newPlayers) => {
    if (!selectedPlayer.value && newPlayers.length > 0) {
      selectedPlayer.value =
        newPlayers.find((p: any) => p.label === t("common.none")) ||
        newPlayers[0];
    }
  },
  { immediate: true },
);

watch(
  categories,
  (newCategories) => {
    if (!selectedCategory.value && newCategories.length > 0) {
      selectedCategory.value =
        newCategories.find((c: any) => c.label === t("common.none")) ||
        newCategories[0];
    }
  },
  { immediate: true },
);

watch(
  items,
  (newItems) => {
    if (!selectedItem.value && newItems.length > 0) {
      selectedItem.value =
        newItems.find((i: any) => i.label === t("common.none")) || null;
    }
  },
  { immediate: true },
);

function translateCategory(name: string) {
  if (!name) return "";
  const key = `categories.${name}`;
  return te(key) ? t(key) : name;
}

function formatItem(name: string) {
  if (!name) return "";
  if (!name.startsWith("minecraft:")) return name;
  const s = `statName.${name}`;
  if (te(s)) return t(s);
  return name
    .slice(10)
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const orderTypes = computed(() => [
  { label: t("filters.descending"), value: "desc" },
  { label: t("filters.ascending"), value: "asc" },
]);
const selectedOrder = ref(orderTypes.value[0]);

const staticFilters = computed<Filter[]>(() => [
  {
    key: "playerUuid",
    label: t("filters.player"),
    type: "select",
    items: players.value,
    modelValue: selectedPlayer,
  },
  {
    key: "category",
    label: t("filters.category"),
    type: "select",
    items: categories.value,
    modelValue: selectedCategory,
  },
  {
    key: "item",
    label: t("filters.item"),
    type: "select",
    items: items.value,
    modelValue: selectedItem,
  },
  {
    key: "order",
    label: t("stats.order"),
    type: "select",
    items: orderTypes.value,
    modelValue: selectedOrder,
  },
]);

const { tableData, loading, page, refetch } = useData(staticFilters);

const tableDataWithNames = ref<any[]>([]);

watch(
  tableData,
  async (newData) => {
    if (!newData || newData.length === 0) {
      tableDataWithNames.value = [];
      return;
    }
    tableDataWithNames.value = await Promise.all(
      newData.map(async (row) => ({
        ...row,
        playerName: await uuidToName(row.playerUuid),
      })),
    );
  },
  { immediate: true },
);

function handlePageUpdate(newPage: number) {
  page.value = newPage;
  refetch();
}

const columns = computed(() => [
  {
    accessorKey: "playerName",
    header: t("stats.player"),
  },
  {
    accessorKey: "category",
    header: t("stats.category"),
    cell: ({ row }: any) => translateCategory(row.original.category),
  },
  {
    accessorKey: "valueName",
    header: t("stats.type"),
    cell: ({ row }: any) => formatItem(row.original.valueName),
  },
  {
    accessorKey: "value",
    header: t("stats.value"),
    cell: ({ row }: any) => {
      const r = row.original;
      if (r.valueName?.endsWith("one_cm"))
        return (r.value / 100).toFixed(2) + " " + t("common.meters");
      if (r.valueName?.toLowerCase().includes("time")) {
        const TICKS_PER_SECOND = 20;
        return (
          (r.value / TICKS_PER_SECOND / 60 / 60).toFixed(2) +
          " " +
          t("common.hours")
        );
      }
      return r.value;
    },
  },
]);
</script>

<template>
  <div>
    <UContainer>
      <UTable
        v-if="!loading && tableDataWithNames"
        :key="JSON.stringify(tableData)"
        :data="tableDataWithNames"
        :columns="columns"
      >
        <template #playerName-cell="{ row }">
          <div class="flex items-center gap-3">
            <img
              :src="`https://mineskin.eu/helm/${row.original.playerUuid}`"
              class="w-8 h-8 rounded"
              alt=""
            />
            <span>{{ row.original.playerName }}</span>
          </div>
        </template>
      </UTable>
      <div v-else-if="loading" class="text-center p-4">Loading...</div>
      <div v-else class="text-center p-4">No data available</div>

      <div class="flex items-center justify-center gap-2 mt-4">
        <UButton
          :disabled="page <= 1"
          icon="i-lucide-chevron-left"
          variant="ghost"
          @click="
            page--;
            refetch();
          "
        />
        <span>{{ page }}</span>
        <UButton
          icon="i-lucide-chevron-right"
          variant="ghost"
          @click="
            page++;
            refetch();
          "
        />
      </div>
    </UContainer>

    <ClientOnly>
      <Teleport to="#sidebar">
        <FilterPanel :filters="staticFilters" @update:page="handlePageUpdate" />
      </Teleport>
    </ClientOnly>
  </div>
</template>
