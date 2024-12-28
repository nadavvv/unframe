<script setup>
import { ref, onMounted } from 'vue'
import { useEmailStore } from '@/stores/emailStore'
import EmailItem from '@/components/EmailItem.vue'
import AnalyticsModal from '@/components/AnalyticsModal.vue'

const emailStore = useEmailStore()
const showAnalytics = ref(false)
const startDate = ref('')
const endDate = ref('')

const applyDateFilter = () => {
  const params = {}
  if (startDate.value) {
    params.after = new Date(startDate.value).getTime() / 1000
  }
  if (endDate.value) {
  const endDateTime = new Date(endDate.value)
  endDateTime.setDate(endDateTime.getDate() + 1)
  params.before = endDateTime.getTime() / 1000
}
  emailStore.fetchEmails(params)
}

const clearFilters = () => {
  startDate.value = ''
  endDate.value = ''
  emailStore.fetchEmails()
}

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

    <!-- Date Filter Controls -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex flex-wrap gap-4 items-end">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            v-model="startDate"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            v-model="endDate"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="flex gap-2">
          <button
            @click="applyDateFilter"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply Filter
          </button>
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>
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