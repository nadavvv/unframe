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
  
  let content = emailStore.selectedEmail.body

  // Only process plain text content, not existing HTML
  if (!content.includes('</')) {
    content = content
      // Handle bullet points/lists
      .replace(/^[•\-]\s+(.*?)$/gm, '<li>$1</li>')
      .replace(/(<li>.*?<\/li>\s*)+/g, '<ul>$&</ul>')
      
      // Handle links and emails
      .replace(/\[\*\*(.*?)\*\*\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/(?<!href=")(https?:\/\/[^\s<"]+)/g, '<a href="$1" target="_blank">$1</a>')
      .replace(/(?<!href="mailto:)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1">$1</a>')
      
      // Handle text formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Handle line breaks and paragraphs
      .replace(/\n\s*\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      
      // Clean up final formatting
      .replace(/^(.+?)$/, '<p>$1</p>')
      .replace(/<p>\s*<ul>/g, '<ul>')
      .replace(/<\/ul>\s*<\/p>/g, '</ul>')
      
      // Remove any remaining mailto formatting artifacts
      .replace(/\(mailto:.*?\)/g, '')
  } else {
    // Clean up any malformed HTML
    content = content
      .replace(/" target="_blank">/g, '">')
      .replace(/""/g, '"')
  }

  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 
      'blockquote', 'div', 'span', 'table', 'tr', 'td', 'th',
      'thead', 'tbody', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    ALLOWED_ATTR: ['href', 'target', 'style', 'class'],
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
  margin: 1em 0;
}

.email-content :deep(p:first-child) {
  margin-top: 0;
}

.email-content :deep(p:last-child) {
  margin-bottom: 0;
}

.email-content :deep(br) {
  display: block;
  content: "";
  margin: 0.5em 0;
}

.email-content :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

.email-content :deep(a + a) {
  margin-left: 0.25em;
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