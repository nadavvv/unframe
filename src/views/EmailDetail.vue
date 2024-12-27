<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEmailStore } from '@/stores/emailStore'
import DOMPurify from 'dompurify'

const route = useRoute()
const emailStore = useEmailStore()

onMounted(() => {
  emailStore.fetchEmail(route.params.id)
})

const subject = computed(() => 
  emailStore.selectedEmail?.headers.find(h => h.name === 'Subject')?.value
)

const from = computed(() => 
  emailStore.selectedEmail?.headers.find(h => h.name === 'From')?.value
)

const date = computed(() => 
  emailStore.selectedEmail?.headers.find(h => h.name === 'Date')?.value
)

const sanitizedContent = computed(() => {
  if (!emailStore.selectedEmail?.body) return ''
  return DOMPurify.sanitize(emailStore.selectedEmail.body, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 
      'blockquote', 'div', 'span', 'table', 'tr', 'td', 'th',
      'thead', 'tbody', 'img'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'style', 'class'],
    ALLOW_DATA_ATTR: false
  })
})
</script>

<template>
  <div class="p-4">
    <div v-if="emailStore.selectedEmail" class="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">
          {{ subject }}
        </h1>
        <div class="text-gray-600">
          From: {{ from }}
        </div>
        <div class="text-gray-500">
          {{ date }}
        </div>
      </div>
      
      <div 
        class="email-content"
        v-html="sanitizedContent"
      />
    </div>
  </div>
</template>

<style scoped>
.email-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.email-content :deep(blockquote) {
  border-left: 3px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #4b5563;
}

.email-content :deep(p) {
  margin: 0.5rem 0;
}

.email-content :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

.email-content :deep(ul), .email-content :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.email-content :deep(ul) {
  list-style-type: disc;
}

.email-content :deep(ol) {
  list-style-type: decimal;
}

.email-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.email-content :deep(table) {
  border-collapse: collapse;
  margin: 1rem 0;
  width: 100%;
}

.email-content :deep(td), .email-content :deep(th) {
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
}
</style>