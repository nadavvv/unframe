<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg mb-4">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <h1 class="text-white text-xl font-semibold">Email Dashboard</h1>
      </div>
    </nav>
    <RouterView />
  </div>
</template>