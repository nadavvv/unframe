import { createRouter, createWebHistory } from 'vue-router'
import EmailList from '@/views/EmailList.vue'
import EmailDetail from '@/views/EmailDetail.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }

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

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router