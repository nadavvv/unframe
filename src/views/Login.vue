<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  window.location.href = 'http://localhost:3000/api/auth/google'
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="p-8 bg-white rounded shadow-lg">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <button
        @click="login"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login with Google
      </button>
    </div>
  </div>
</template>