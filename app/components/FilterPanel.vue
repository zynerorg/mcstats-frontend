<script setup lang="ts">
import type { Filter } from "~~/types/filter";

const { t } = useI18n();

defineProps<{
  filters: Filter[];
}>();

const page = ref(1);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <label
        class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
      >
        {{ t("filters.page") }}
      </label>
      <UInputNumber v-model="page" :min="1" />
    </div>

    <div v-for="filter in filters" :key="filter.key">
      <label
        class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
      >
        {{ filter.label }}
      </label>

      <UInputMenu v-if="filter.type === 'select'" :items="filter.items || []" />

      <UInput
        v-else-if="filter.type === 'input'"
        :placeholder="t('filters.enterValue')"
      />
    </div>
  </div>
</template>
