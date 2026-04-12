<script setup lang="ts">
import type { PlayerStat } from "@me/sdk";

const app = useAppStore();

const categories = await app.api.categories();
const selectedCategory = ref(categories.data[0]);

const players = await app.api.players();
players.data.splice(0, 0, { name: "None", playerUuid: "None" });
const selectedPlayer = ref(players.data[0]);

const data = ref<PlayerStat[]>();

async function fetchData(
  category: typeof selectedCategory.value,
  player: typeof selectedPlayer.value,
) {
  if (!category) return;

  if (player?.name === "None" || !player) {
    data.value = (await app.api.category(category.name)).data;
  } else {
    data.value = (
      await app.api.playerByCategory(player.playerUuid, category.name)
    ).data;
  }
}

onMounted(() => {
  fetchData(selectedCategory.value, selectedPlayer.value);
});

watch([selectedCategory, selectedPlayer], ([newCategory, newPlayer]) => {
  fetchData(newCategory, newPlayer);
});
</script>

<template>
  <div>
    <UContainer>
      <UContainer class="mt-6">
        <UTable :data="data" />
      </UContainer>
    </UContainer>

    <Teleport to="#sidebar">
      <div class="flex flex-col gap-4">
        <UInputMenu
          v-model="selectedCategory"
          :items="categories.data"
          label-key="name"
        />
        <UInputMenu
          v-model="selectedPlayer"
          :items="players.data"
          label-key="name"
        />
      </div>
    </Teleport>
  </div>
</template>
