<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['email'])
const emit = defineEmits(['delete'])
const router = useRouter()

const viewEmail = () => {
  router.push({ name: 'email-detail', params: { id: props.email.id }})
}
</script>

<template>
  <div class="p-2 border rounded hover:bg-gray-100">
    <div @click="viewEmail" class="cursor-pointer">
      <div class="font-bold">{{ email.subject }}</div>
      <div class="text-sm text-gray-600">{{ email.sender }}</div>
      <div class="text-sm text-gray-500">{{ email.date }}</div>
    </div>
    <button
      @click="$emit('delete', email.id)"
      class="mt-1 px-2 py-1 text-sm bg-red-500 text-white rounded"
    >
      Delete
    </button>
  </div>
</template>