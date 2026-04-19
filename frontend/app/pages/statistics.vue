<script setup lang="ts">
import type { TableColumn } from "#ui/types";
import { useDataTable } from "~/composables/useDataTable";
import {
  createUuidTransformer,
  createNameColumn,
} from "~/utils/dataTransformers";

const app = useAppStore();

const categoriesResponse = await app.api.categories();
const categories = categoriesResponse.data;
const itemsResponse = await app.api.items();
const items = itemsResponse.data;
items.splice(0, 0, { id: -1, name: "None" });
const playersResponse = await app.api.players();
const players = playersResponse.data;
players.splice(0, 0, { name: "None", playerUuid: "None" });

const selectedCategory = ref(categories[0] ?? null);
const selectedItem = ref(items.find((p) => p.name === "None") ?? null);
const selectedPlayer = ref(players.find((p) => p.name === "None") ?? null);

const { data, page, maxPage, isLoading, error, filters } = useDataTable({
  filters: [
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
    {
      key: "player",
      label: "Player Filter",
      type: "select",
      items: players,
      modelValue: selectedPlayer,
    },
  ],
  onFetch: async (filterValues, pageNum) => {
    const category = filterValues.category as { name: string } | undefined;
    const item = filterValues.item as { name: string } | null | undefined;
    const player = filterValues.player as
      | { name: string; playerUuid: string }
      | null
      | undefined;

    const categoryName = category?.name;
    const itemName = item?.name && item.name !== "None" ? item.name : undefined;
    const playerUuid =
      player && player.name !== "None" ? player.playerUuid : undefined;

    const response = await app.api.stats(
      itemName,
      categoryName,
      playerUuid,
      50,
      pageNum,
    );
    return { data: response.data as any };
  },
  onTransform: createUuidTransformer("playerName") as any,
});

const columns: TableColumn<Record<string, unknown>>[] = [
  createNameColumn("playerName", "Player"),
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
