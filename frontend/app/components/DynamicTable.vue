<script setup lang="ts">
import type { TableColumn } from "#ui/types";

interface Props {
  data?: Record<string, unknown>[];
  columns: TableColumn<Record<string, unknown>>[];
  isLoading?: boolean;
  error?: string | null;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  error: null,
});
</script>

<template>
  <div class="w-full">
    <div v-if="isLoading" class="flex justify-center items-center p-8">
      <UIcon name="i-heroicons-arrow-path-20-solid" class="animate-spin mr-2" />
      <span>Loading...</span>
    </div>

    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
    >
      <slot name="error" :error="error">
        <p class="text-red-700 dark:text-red-200">{{ error }}</p>
      </slot>
    </div>

    <div v-else-if="!data || data.length === 0">
      <slot name="empty">
        <p class="text-center text-gray-500 dark:text-gray-400 py-8">
          No data available
        </p>
      </slot>
    </div>

    <UTable v-else :data="data" :columns="columns" />
  </div>
</template>
