<script setup>
import { ref } from 'vue'
import { useEmailStore } from '@/stores/emailStore'
import { gmailService } from '@/services/gmailService'

const emailStore = useEmailStore()
const aiQuery = ref('')
const aiResponse = ref('')

const analyzeEmails = async () => {
  if (!aiQuery.value) return
  try {
    const result = await gmailService.analyzeEmails(aiQuery.value, emailStore.emails)
    aiResponse.value = result.analysis
  } catch (error) {
    console.error('Analysis failed:', error)
  }
}
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Email Analytics</h1>
    
    <div class="bg-white p-6 rounded shadow">
      <textarea
        v-model="aiQuery"
        class="w-full p-2 border rounded"
        rows="3"
        placeholder="Ask a question about your emails..."
      />
      <button
        @click="analyzeEmails"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Analyze
      </button>
      
      <div v-if="aiResponse" class="mt-4 p-4 bg-gray-50 rounded">
        {{ aiResponse }}
      </div>
    </div>
  </div>
</template>