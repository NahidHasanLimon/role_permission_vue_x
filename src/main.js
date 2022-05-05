import { createApp } from 'vue'
import {createRouter} from './router'
import store from './store'
import App from './App.vue'
import access from './access'
import './index.css'
import axios from 'axios'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

store.dispatch('auth/me').then(() => {
    const app = createApp(App)
    app.use(store)
    const router = createRouter(app)
    app.use(router)
    app.use(access)
    app.use(VueSweetalert2)
    app.mount('#app')

   
  })