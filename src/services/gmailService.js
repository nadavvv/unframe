import axios from 'axios'

export const gmailService = {
  async getEmails(params) {
    console.log('blash');
    
    const response = await axios.get('/api/emails', { params })
    return response.data
  },

  async getEmail(id) {
    const response = await axios.get(`/api/emails/${id}`)
    return response.data
  },

  async deleteEmail(id) {
    return axios.delete(`/api/emails/${id}`)
  },

  async analyzeEmails(query, emails) {
    const response = await axios.post('/api/analyze', { query, emails })
    return response.data
  }
}