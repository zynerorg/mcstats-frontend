<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Filter } from "~~/types/filter";
import { withNoneOption } from "~/utils/selectWithNone";
import { uuidToName } from "~/utils/names";

const playersResult = usePlayers().result;
const categoriesResult = useCategories().result;
const itemsResult = useItems().result;

const players = computed(() =>
  withNoneOption(
    (playersResult.value?.players ?? []).map((p: any) => ({
      label: p.name,
      value: p.name,
    })),
    "None",
  ),
);

const categories = computed(() =>
  withNoneOption(
    (categoriesResult.value?.categories ?? []).map((c: string) => ({
      label: translateCategory(c),
      value: c,
    })),
    "None",
  ),
);

const items = computed(() =>
  withNoneOption(
    (itemsResult.value?.items ?? []).map((i: string) => ({
      label: formatItem(i),
      value: i,
    })),
    "None",
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
        newPlayers.find((p: any) => p.label === "None") || newPlayers[0];
    }
  },
  { immediate: true },
);

watch(
  categories,
  (newCategories) => {
    if (!selectedCategory.value && newCategories.length > 0) {
      selectedCategory.value =
        newCategories.find((c: any) => c.label === "None") || newCategories[0];
    }
  },
  { immediate: true },
);

watch(
  items,
  (newItems) => {
    if (!selectedItem.value && newItems.length > 0) {
      selectedItem.value =
        newItems.find((i: any) => i.label === "None") || null;
    }
  },
  { immediate: true },
);

const categoryTranslations: Record<string, string> = {
  "minecraft:picked_up": "Picked up",
  "minecraft:custom": "Other",
  "minecraft:broken": "Broken",
  "minecraft:mined": "Mined",
  "minecraft:dropped": "Dropped",
  "minecraft:crafted": "Crafted",
  "minecraft:killed_by": "Killed By",
  "minecraft:killed": "Killed",
  "minecraft:used": "Used",
};

const statNameTranslations: Record<string, string> = {
  "minecraft:aviate_one_cm": "Fly with elytra",
  "minecraft:fly_one_cm": "Fly",
  "minecraft:sprint_one_cm": "Sprint",
  "minecraft:play_time": "Playtime",
  "minecraft:boat_one_cm": "Drive with boat",
  "minecraft:walk_one_cm": "Walk",
};

function translateCategory(name: string) {
  if (!name) return "";
  return categoryTranslations[name] ?? name;
}

function formatItem(name: string) {
  if (!name) return "";
  if (!name.startsWith("minecraft:")) return name;
  const translated = statNameTranslations[name];
  if (translated) return translated;
  return name
    .slice(10)
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const orderTypes = computed(() => [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" },
]);
const selectedOrder = ref(orderTypes.value[0]);

const staticFilters = computed<Filter[]>(() => [
  {
    key: "playerUuid",
    label: "Player",
    type: "select",
    items: players.value,
    modelValue: selectedPlayer,
  },
  {
    key: "category",
    label: "Category",
    type: "select",
    items: categories.value,
    modelValue: selectedCategory,
  },
  {
    key: "item",
    label: "Item",
    type: "select",
    items: items.value,
    modelValue: selectedItem,
  },
  {
    key: "order",
    label: "Order",
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
    header: "Player",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }: any) => translateCategory(row.original.category),
  },
  {
    accessorKey: "valueName",
    header: "Type",
    cell: ({ row }: any) => formatItem(row.original.valueName),
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }: any) => {
      const r = row.original;
      if (r.valueName?.endsWith("one_cm"))
        return (r.value / 100).toFixed(2) + " Meters";
      if (r.valueName?.toLowerCase().includes("time")) {
        const TICKS_PER_SECOND = 20;
        return (r.value / TICKS_PER_SECOND / 60 / 60).toFixed(2) + " Hours";
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
