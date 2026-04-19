<script setup lang="ts">
import type { TableColumn } from "#ui/types";
import type { Item } from "@me/sdk";
import { useDataTable } from "~/composables/useDataTable";

const app = useAppStore();

const { data, isLoading, error } = useDataTable<Item>({
  filters: [],
  onFetch: async () => {
    const response = await app.api.items();
    return { data: response.data as unknown as Item[] };
  },
});

const columns: TableColumn<Record<string, unknown>>[] = [
  {
    accessorKey: "name",
    header: "Item Name",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
];
</script>

<template>
  <div>
    <UContainer>
      <TableHeader title="Items Catalog" />

      <DynamicTable
        :data="data"
        :columns="columns"
        :is-loading="isLoading"
        :error="error"
      >
        <template #name-cell="{ cell }">
          <span class="font-semibold text-blue-600">{{ cell.getValue() }}</span>
        </template>
      </DynamicTable>
    </UContainer>
  </div>
</template>
