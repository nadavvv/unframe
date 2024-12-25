<script setup>
import { onMounted } from 'vue'
import { useEmailStore } from '@/stores/emailStore'
import EmailItem from '@/components/EmailItem.vue'

const emailStore = useEmailStore()

onMounted(() => {
  emailStore.fetchEmails()
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Emails</h1>
    <div v-if="emailStore.loading">Loading...</div>
    <div v-else class="space-y-2">
      <EmailItem
        v-for="email in emailStore.emails"
        :key="email.id"
        :email="email"
        @delete="emailStore.deleteEmail"
      />
    </div>
  </div>
</template>