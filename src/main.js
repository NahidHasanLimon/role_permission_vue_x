import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './index.css'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

// createApp(App).use([router,store]).mount('#app')
const app = createApp(App)
// app.config.globalProperties.$axios = axios;
app.use(router)
app.use(store)
app.mount('#app')
