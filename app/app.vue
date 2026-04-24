<script setup lang="ts">
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <div class="flex flex-1">
    <div class="flex-1 flex flex-col">
      <UMain>
        <NuxtPage />
      </UMain>
      <FooterComponent />
    </div>

    <SidebarComponent />
  </div>
</template>
