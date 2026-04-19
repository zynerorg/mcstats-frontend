<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";

const tables = useState<NavigationMenuItem[]>("sidebar-tables", () => [
  {
    label: "Players",
    to: "/players",
  },
  {
    label: "Categories",
    to: "/categories",
  },
  {
    label: "Items",
    to: "/items",
  },
  {
    label: "Statistics",
    to: "/statistics",
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
