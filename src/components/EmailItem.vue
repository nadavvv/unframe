<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps(['email'])
const emit = defineEmits(['delete'])
const router = useRouter()

const viewEmail = () => {
  router.push({ name: 'email-detail', params: { id: props.email.id }})
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden">
    <div class="flex justify-between p-4">
      <div @click="viewEmail" class="cursor-pointer flex-grow">
        <div class="flex items-start justify-between">
          <div class="flex-grow">
            <h3 class="font-medium text-gray-900 mb-1 line-clamp-1">{{ email.subject }}</h3>
            <p class="text-sm text-gray-600 mb-1">{{ email.sender }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(email.date) }}</p>
          </div>
        </div>
      </div>
      
      <button
        @click="$emit('delete', email.id)"
        class="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200 self-start"
        title="Delete email"
      >
        <Trash2 class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>