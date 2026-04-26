<script setup lang="ts">
const { t, locales, setLocale, locale } = useI18n();

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
      <UModal :title="t('settings.title')">
        <UButton
          :label="t('settings.title')"
          color="neutral"
          variant="subtle"
        />

        <template #body>
          {{ t("settings.language") }}:
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
