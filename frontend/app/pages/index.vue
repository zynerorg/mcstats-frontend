<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Categories } from '@me/sdk'

const temp = ref<Categories>()

onMounted(async () => {
  const response = await fetch('http://localhost:2456/categories')
  temp.value = await response.json()
  console.log(temp.value)
})
</script>

<template>
  <pre>{{ temp }}</pre>
</template>z
