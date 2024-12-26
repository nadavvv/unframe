import axios from 'axios'

export const gmailService = {
  async getEmails(params) {
    try {
      const response = await axios.get('/api/emails', { params })
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        const authStore = useAuthStore()
        authStore.clearToken()
        router.push('/login')
        
      }
      throw error
    }
  },

  async getEmail(id) {
    try {
      const response = await axios.get(`/api/emails/${id}`)
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        const authStore = useAuthStore()
        authStore.clearToken()
        router.push('/login')
      }
      throw error
    }
  },

  async deleteEmail(id) {
    return axios.delete(`/api/emails/${id}`)
  },

  async analyzeEmails(query, emails) {
    const response = await axios.post('/api/analyze', { query, emails })
    return response.data
  }
}