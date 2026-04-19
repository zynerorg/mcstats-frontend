<script setup lang="ts">
import type { TableColumn } from "#ui/types";
import type { PlayerStat } from "@me/sdk";
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

interface ItemStatsRow extends PlayerStat {
  playerName: string;
}

const selectedCategory = ref(categories[0]);
const selectedItem = ref(items[0]);

const { data, page, maxPage, isLoading, error, filters } =
  useDataTable<ItemStatsRow>({
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
    ],
    onFetch: async (filterValues, pageNum) => {
      const category = filterValues.category as { name: string } | undefined;
      const item = filterValues.item as { name: string } | undefined;

      if (!category || !item) return { data: [] as any };

      const response = await app.api.item(
        item.name,
        category.name,
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
    header: "Stats Value",
  },
];

function handlePageUpdate(newPage: number) {
  page.value = newPage;
}
</script>

<template>
  <div>
    <UContainer>
      <TableHeader title="Item Stats" />

      <DynamicTable
        :data="data"
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
          <div class="font-mono font-semibold">{{ cell.getValue() }}</div>
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
