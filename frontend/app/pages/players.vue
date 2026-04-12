<script setup lang="ts">
const app = useAppStore();

const response = await app.api.players();
const players = response.data;
</script>

<template>
  <div>
    <UContainer>
      <UContainer class="mt-6">
        <UTable :data="players" />
      </UContainer>
    </UContainer>
  </div>
</template>
