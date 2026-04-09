<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/zynerorg/minecraft-stats',
    target: '_blank'
  }
])
</script>

<template>
  <UHeader>
    <template #left>
      <AppLogo class="h-6 w-auto" />
    </template>

    <template #right>
      <UNavigationMenu :items="items" />
    </template>
  </UHeader>
</template>
