<script setup lang="ts">
import type { TableColumn } from "#ui/types";
import { useApi } from "~/composables/useApi";
import { useDataTable } from "~/composables/useDataTable";
import { createUuidTransformer } from "~/utils/dataTransformers";

const api = useApi();
const transformer = useTransformerStore();
transformer.loadCategories();

const categoriesResponse = await api.getMinecraftStatsAPI().categories();
const categories = [...categoriesResponse.data];
categories.splice(0, 0, { id: -1, name: "None" });
const selectedCategory = ref(
  categories.find((p: { name: string }) => p.name === "None") ?? null,
);

const itemsResponse = await api.getMinecraftStatsAPI().items();
const items = [...itemsResponse.data];
items.splice(0, 0, { id: -1, name: "None" });
const selectedItem = ref(
  items.find((p: { name: string }) => p.name === "None") ?? null,
);

const playersResponse = await api.getMinecraftStatsAPI().players();
const players = [...playersResponse.data];
players.splice(0, 0, { name: "None", playerUuid: "None" });
const selectedPlayer = ref(
  players.find((p: { name: string }) => p.name === "None") ?? null,
);

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
    const category = filterValues.category as { name: string } | undefined;
    const item = filterValues.item as { name: string } | null | undefined;
    const player = filterValues.player as
      | { name: string; playerUuid: string }
      | null
      | undefined;

    const categoryName =
      category && category.name !== "None" ? category.name : undefined;
    const itemName = item && item.name !== "None" ? item.name : undefined;
    const playerUuid =
      player && player.name !== "None" ? player.playerUuid : undefined;

    const response = await api.getMinecraftStatsAPI().stats({
      item: itemName,
      category: categoryName,
      player_uuid: playerUuid,
      limit: 25,
      page: pageNum,
    });
    return { data: response.data as any };
  },
  onTransform: createUuidTransformer("playerName") as any,
});

const columns: TableColumn<Record<string, unknown>>[] = [
  {
    accessorKey: "playerName",
    header: "Player",
  },
  {
    accessorFn: (row) => {
      return transformer.getCategoryNameById(row.statCategoriesId as number);
    },
    header: "Category",
  },
  {
    accessorKey: "statName",
    header: "Type",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];

function handlePageUpdate(newPage: number) {
  page.value = newPage;
}
</script>

<template>
  <div>
    <UContainer>
      <TableHeader title="Statistics" />

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
          <span class="font-mono font-semibold">{{ cell.getValue() }}</span>
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
