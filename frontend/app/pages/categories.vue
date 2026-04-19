<script setup lang="ts">
import type { TableColumn } from "#ui/types";
import type { StatCategory } from "@me/sdk";
import { useDataTable } from "~/composables/useDataTable";

const app = useAppStore();

const { data, isLoading, error } = useDataTable<StatCategory>({
  filters: [],
  onFetch: async () => {
    const response = await app.api.categories();
    return { data: response.data as unknown as StatCategory[] };
  },
});

const columns: TableColumn<Record<string, unknown>>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
];
</script>

<template>
  <div>
    <UContainer>
      <TableHeader
        title="Categories"
        description="Available Statistics categories"
      />

      <DynamicTable
        :data="data"
        :columns="columns"
        :is-loading="isLoading"
        :error="error"
      >
        <template #name-cell="{ cell }">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="font-semibold">{{ cell.getValue() }}</span>
          </div>
        </template>

        <template #empty>
          <div class="text-center py-12">
            <p class="text-gray-500">No categories available</p>
          </div>
        </template>
      </DynamicTable>
    </UContainer>
  </div>
</template>
