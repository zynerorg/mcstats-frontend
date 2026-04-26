<script setup lang="ts">
import type { FilterConfig } from "~/composables/useDataTable";

const { t } = useI18n();

defineProps<{
  filters: FilterConfig[];
  maxPage?: number;
}>();

const pageValue = ref(1);

const emit = defineEmits<{
  "update:page": [value: number];
}>();

function emitPageUpdate(value: number) {
  emit("update:page", value);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <label
        class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
      >
        {{ t("filters.page") }}
      </label>
      <UInputNumber
        v-model="pageValue"
        :min="1"
        :max="maxPage || 1000"
        @update:model-value="emitPageUpdate"
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
        :items="(filter.items as any[]) || []"
        label-key="label"
        value-key="value"
      />

      <UInput
        v-else-if="filter.type === 'input'"
        v-model="filter.modelValue.value as string"
        :placeholder="t('filters.enterValue')"
      />
    </div>
  </div>
</template>
