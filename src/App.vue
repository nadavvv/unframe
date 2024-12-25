<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow mb-4 px-4 py-2">
      <RouterLink 
        to="/" 
        class="mr-4 hover:text-blue-500"
      >
        Emails
      </RouterLink>
      <RouterLink 
        to="/analytics" 
        class="hover:text-blue-500"
      >
        Analytics
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>