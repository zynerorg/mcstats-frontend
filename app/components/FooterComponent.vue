<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © Zyner {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <p class="text-muted text-sm">
        Made by
        <ULink href="https://zyner.org" class="underline"> Zyner </ULink>
      </p>
    </template>
  </UFooter>
</template>
