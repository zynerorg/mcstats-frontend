<script setup lang="ts">
import type { TableColumn } from "#ui/types";
import type { PlayerStat } from "@me/sdk";
import { useDataTable } from "~/composables/useDataTable";

const app = useAppStore();

interface PlayerStatsRow extends PlayerStat {
  categoryName?: string;
}

const playersResponse = await app.api.players();
const players = playersResponse.data;
const selectedPlayer = ref(players[0]);

const { data, page, maxPage, isLoading, error, filters } =
  useDataTable<PlayerStatsRow>({
    filters: [
      {
        key: "player",
        label: "Select Player",
        type: "select",
        items: players,
        modelValue: selectedPlayer,
      },
    ],
    onFetch: async (filterValues, pageNum) => {
      const player = filterValues.player as { playerUuid: string } | undefined;
      if (!player) return { data: [] };

      const response = await app.api.player(player.playerUuid, undefined, 50, pageNum);
      return { data: response.data as unknown as PlayerStatsRow[] };
    },
  });

const columns: TableColumn<Record<string, unknown>>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "item",
    header: "Item",
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
      <TableHeader
        title="Players Profile"
        description="View all statistics for a player"
      />

      <DynamicTable
        :data="data"
        :columns="columns"
        :is-loading="isLoading"
        :error="error"
      >
        <template #value-cell="{ cell }">
          <span class="font-semibold">{{ cell.getValue() }}</span>
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
