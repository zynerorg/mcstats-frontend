<script setup lang="ts">
import type { Filter } from "~~/types/filter";

const { t } = useI18n();

defineProps<{
  filters: Filter[];
  maxPage?: number;
}>();

const emit = defineEmits<{
  (e: "update:page", page: number): void;
}>();

const page = ref(1);

function onPageChange(newPage: number) {
  emit("update:page", newPage);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-if="maxPage">
      <label
        class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
      >
        {{ t("filters.page") }}
      </label>
      <UInputNumber
        v-model="page"
        :min="1"
        @update:model-value="onPageChange"
      />
    </div>

    <div v-for="filter in filters" :key="filter.key">
      <label
        class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
      >
        {{ filter.label }}
      </label>

      <UInputMenu
        v-if="filter.type === 'select'"
        v-model="filter.modelValue.value"
        :items="filter.items"
        searchable
      />

      <UInput
        v-else-if="filter.type === 'input'"
        v-model="filter.modelValue.value"
        :placeholder="t('filters.enterValue')"
      />
    </div>
  </div>
</template>
