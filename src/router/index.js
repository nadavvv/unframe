import { createRouter, createWebHistory } from 'vue-router'
import EmailList from '@/views/EmailList.vue'
import EmailDetail from '@/views/EmailDetail.vue'

const routes = [
  {
    path: '/',
    name: 'emails',
    component: EmailList
  },
  {
    path: '/email/:id',
    name: 'email-detail',
    component: EmailDetail
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})