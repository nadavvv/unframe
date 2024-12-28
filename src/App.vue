<script setup>
import { onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  // Check for token in URL after Google auth
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  
  if (token) {
    authStore.setToken(token)
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg mb-4">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-white text-xl font-semibold">Email Dashboard</h1>
        <button 
          v-if="authStore.isAuthenticated"
          @click="authStore.clearToken"
          class="text-white hover:text-gray-200"
        >
          Logout
        </button>
      </div>
    </nav>
    <RouterView />
  </div>
</template>