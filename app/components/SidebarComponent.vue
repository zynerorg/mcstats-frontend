<script setup lang="ts">
const { locales, setLocale, locale } = useI18n();

const items = computed(() =>
  locales.value.map((l) => ({
    label: l.name ?? l.code,
    value: l.code,
  })),
);

const selected = computed({
  get: () => locale.value,
  set: async (val) => {
    if (!val) return;
    await setLocale(val);
  },
});
</script>

<template>
  <USidebar
    side="right"
    :ui="{
      inner: 'bg-elevated/25 divide-transparent',
    }"
  >
    <div id="sidebar" />

    <template #footer>
      <UModal title="Settings">
        <UButton label="Settings" color="neutral" variant="subtle" />

        <template #body>
          Language:
          <USelect
            v-model="selected"
            :items="items"
            value-key="value"
            label-key="label"
          />
        </template>
      </UModal>
    </template>
  </USidebar>
</template>
