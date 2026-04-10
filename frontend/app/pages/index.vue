<script setup lang="ts">
import { type StatCategories, type PlayerStats, Configuration, DefaultApi } from '@me/sdk'

const configuration = new Configuration({
  basePath: 'http://localhost:2456'
})
const api = new DefaultApi(configuration)

const categories = ref<StatCategories[]>([])
const selectedCategory = ref()

const sortBy = ref(['asc', 'desc'])
const selectedSortBy = ref('asc')

const data = ref<PlayerStats[]>([])

onMounted(async () => {
  const res = await api.categories()
  categories.value = res.data
})

watch(selectedCategory, async (newSelectedCategory) => {
  if (!newSelectedCategory) return
  const res = await api.category(newSelectedCategory.name)
  data.value = res.data.stats
})
</script>

<template>
  <UContainer>
    <!--
    <UInput
      v-model="search"
      icon="i-lucide-search"
      placeholder="Search..."
      :ui="{ trailing: 'pe-1' }"
    >
      <template
        v-if="search?.length"
        #trailing
      >
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-circle-x"
          aria-label="clear input"
          @click="search = ''"
        />
      </template>
    </UInput>
    -->
    <UContainer class="m-6 gap-6 flex">
      <UInputMenu
        v-model="selectedCategory"
        label-key="name"
        :items="categories"
      />
      <UInputMenu
        v-model="selectedSortBy"
        :items="sortBy"
      />
    </UContainer>
    <UTable :data />
  </UContainer>
</template>
