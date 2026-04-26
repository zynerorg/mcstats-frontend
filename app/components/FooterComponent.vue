<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        {{ t("footer.copyright") }} © Zyner {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <p class="text-muted text-sm">
        {{ t("footer.madeBy") }}
        <ULink href="https://zyner.org" class="underline"> Zyner </ULink>
      </p>
    </template>
  </UFooter>
</template>
