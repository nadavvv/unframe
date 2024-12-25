import { defineStore } from 'pinia'
import {gmailService} from '../services/gmailService'

export const useEmailStore = defineStore('email', {
  state: () => ({
    emails: [],
    selectedEmail: null,
    pageToken: null,
    loading: false,
    aiResponse: ''
  }),
  
  actions: {
    async fetchEmails(params) {
      this.loading = true
      try {
        const data = await gmailService.getEmails(params)
        this.emails = data.emails
        this.pageToken = data.nextPageToken
      } finally {
        this.loading = false
      }
    },

    async fetchEmail(id) {
      const email = await gmailService.getEmail(id)
      this.selectedEmail = email
    },

    async deleteEmail(id) {
      await gmailService.deleteEmail(id)
      this.emails = this.emails.filter(email => email.id !== id)
    }
  }
})