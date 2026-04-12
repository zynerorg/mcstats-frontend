<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";

const tables = ref<NavigationMenuItem[]>([
  {
    label: "Players",
    to: "/players",
  },
  {
    label: "Categories",
    to: "/categories",
  },
]);
</script>

<template>
  <USidebar
    side="right"
    :ui="{
      inner: 'bg-elevated/25 divide-transparent',
    }"
  >
    <template #title>
      <div class="mt-4 rounded-md">
        <UNavigationMenu orientation="vertical" :items="tables" />
      </div>
    </template>

    <div id="sidebar" />
  </USidebar>
</template>
