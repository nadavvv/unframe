import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toastification'
import "vue-toastification/dist/index.css"
import App from './App.vue'
import router from './router'
import axios from 'axios';
import './index.css'
import { useAuthStore } from './stores/authStore';
axios.defaults.baseURL = 'http://localhost:3000';
const app = createApp(App)
app.use(ToastPlugin, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
})

app.use(createPinia())
app.use(router)

// Initialize auth state
const authStore = useAuthStore()
authStore.initializeAuth()

// Add navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})
app.mount('#app')