<script setup>
import { RouterLink,  RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    |
    <router-link :to="{ name: 'product-list' }">Product</router-link>
  </nav>

  <RouterView />
</template>

<style scoped>
  nav {
    @apply flex gap-4 mb-[30px];
  }
</style>
