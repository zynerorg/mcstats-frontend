<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CategoriesItem } from '~/types/api'

const temp = ref<CategoriesItem[]>()

onMounted(async () => {
  const response = await fetch('http://localhost:2456/categories')
  temp.value = await response.json()
  console.log(temp.value)
})
</script>

<template>
  <pre>{{ temp }}</pre>
</template>
