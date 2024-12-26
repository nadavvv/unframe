import { createRouter, createWebHistory } from 'vue-router'
import EmailList from '@/views/EmailList.vue'
import EmailDetail from '@/views/EmailDetail.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'emails',
    component: EmailList,
    meta: { requiresAuth: true }
  },
  {
    path: '/email/:id',
    name: 'email-detail',
    component: EmailDetail,
    meta: { requiresAuth: true }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})