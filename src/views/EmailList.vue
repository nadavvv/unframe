<script setup>
import { ref, onMounted } from 'vue'
import { useEmailStore } from '@/stores/emailStore'
import EmailItem from '@/components/EmailItem.vue'
import AnalyticsModal from '@/components/AnalyticsModal.vue'

const emailStore = useEmailStore()
const showAnalytics = ref(false)

onMounted(() => {
  emailStore.fetchEmails()
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Emails</h1>
      <button 
        @click="showAnalytics = true"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm flex items-center gap-2"
      >
        <span>Analyze Emails</span>
      </button>
    </div>

    <div v-if="emailStore.loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
    
    <div v-else class="space-y-3">
      <EmailItem
        v-for="email in emailStore.emails"
        :key="email.id"
        :email="email"
        @delete="emailStore.deleteEmail"
      />
    </div>

    <AnalyticsModal 
      :emails="emailStore.emails"
      :isOpen="showAnalytics"
      @close="showAnalytics = false"
    />
  </div>
</template>