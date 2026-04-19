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
const playersResponse = await app.api.players();
const players = playersResponse.data;
players.splice(0, 0, { name: "None", playerUuid: "None" });

interface _CategoryRow extends PlayerStat {
  playerName: string;
}

const selectedCategory = ref(categories[0]);
const selectedPlayer = ref(players[0]);

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
      key: "player",
      label: "Player Filter",
      type: "select",
      items: players,
      modelValue: selectedPlayer,
    },
  ],
  onFetch: async (filterValues, pageNum) => {
    const category = filterValues.category as { name: string } | undefined;
    const player = filterValues.player as
      | { name: string; playerUuid: string }
      | undefined;

    if (!category) return { data: [] as any };

    if (!player || player.name === "None") {
      const response = await app.api.category(category.name, 50, pageNum);
      return { data: response.data as any };
    } else {
      const response = await app.api.player(
        player.playerUuid,
        category.name,
        50,
        pageNum,
      );
      return { data: response.data as any };
    }
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
      <UContainer class="mt-6">
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
                alt="Player head"
              />
              <span class="font-medium">{{ cell.getValue() }}</span>
            </div>
          </template>

          <template #value-cell="{ cell }">
            <span class="text-lg font-semibold text-blue-600">
              {{ cell.getValue() }}
            </span>
          </template>
        </DynamicTable>
      </UContainer>
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
