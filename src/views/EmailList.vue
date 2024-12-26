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
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Emails</h1>
      <button 
        @click="showAnalytics = true"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Analyze Emails
      </button>
    </div>

    <div v-if="emailStore.loading">Loading...</div>
    <div v-else class="space-y-2">
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