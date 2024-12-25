import { createRouter, createWebHistory } from 'vue-router'
import EmailList from '@/views/EmailList.vue'
import EmailDetail from '@/views/EmailDetail.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'

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
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: AnalyticsView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})