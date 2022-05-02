import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import access from './access'
import './index.css'
import axios from 'axios'
// import access from './access'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

store.dispatch('auth/me').then(() => {
    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(access)
    app.mount('#app')

   
  })