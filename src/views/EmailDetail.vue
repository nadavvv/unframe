<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEmailStore } from '@/stores/emailStore'

const route = useRoute()
const emailStore = useEmailStore()

onMounted(() => {
  emailStore.fetchEmail(route.params.id)
})
</script>

<template>
  <div class="p-4">
    <div v-if="emailStore.selectedEmail" class="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">
          {{ emailStore.selectedEmail.headers.find(h => h.name === 'Subject')?.value }}
        </h1>
        <div class="text-gray-600">
          From: {{ emailStore.selectedEmail.headers.find(h => h.name === 'From')?.value }}
        </div>
        <div class="text-gray-500">
          {{ emailStore.selectedEmail.headers.find(h => h.name === 'Date')?.value }}
        </div>
      </div>
      <div class="whitespace-pre-wrap">
        {{ emailStore.selectedEmail.body }}
      </div>
    </div>
  </div>
</template>