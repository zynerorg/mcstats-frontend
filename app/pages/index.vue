<script setup lang="ts">
const players = usePlayers();

console.log(players);

/*
const filters: Filter[] = [
  {
    key: "player",
    label: "filters.player",
    type: "select",
    items: players,
    modelValue: undefined,
  },
]; */
</script>

<template>
  <div>
    <div>Hi</div>

    <ClientOnly>
      <Teleport to="#sidebar"> </Teleport>
    </ClientOnly>
  </div>
</template>
