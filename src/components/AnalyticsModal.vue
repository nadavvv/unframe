<script setup>
import { ref } from 'vue'
import { gmailService } from '@/services/gmailService'

const props = defineProps({
  emails: {
    type: Array,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const aiQuery = ref('')
const aiResponse = ref('')
const isLoading = ref(false)

const analyzeEmails = async () => {
  if (!aiQuery.value) return
  isLoading.value = true
  try {
    const result = await gmailService.analyzeEmails(aiQuery.value, props.emails)
    aiResponse.value = result.analysis
  } catch (error) {
    console.error('Analysis failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Email Analytics</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <span class="text-2xl">&times;</span>
        </button>
      </div>
      
      <textarea
        v-model="aiQuery"
        class="w-full p-2 border rounded mb-4"
        rows="3"
        placeholder="Ask a question about your emails..."
        />
      
      <button
        @click="analyzeEmails"
        :disabled="isLoading"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {{ isLoading ? 'Analyzing...' : 'Analyze' }}
      </button>
      
      <div v-if="aiResponse" class="mt-4 p-4 bg-gray-50 rounded">
        {{ aiResponse }}
      </div>
    </div>
  </div>
</template>