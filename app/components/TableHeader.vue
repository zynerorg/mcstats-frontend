<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

const { title, description } = defineProps<Props>();
</script>

<template>
  <div class="mt-8 mb-8">
    <h1 class="text-3xl font-bold">{{ title }}</h1>
    <p v-if="description" class="text-gray-600 mt-2">{{ description }}</p>
  </div>
</template>
