import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import access from './access'
// import permission from './permission'   // as plugin
import {hasPermission} from './permission'
import './index.css'
import axios from 'axios'
// import access from './access'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

// createApp(App).use([router,store]).mount('#app')
// const app = createApp(App)
// // app.config.globalProperties.$axios = axios;
// app.use(router)
// app.use(store)
// app.mount('#app')


store.dispatch('auth/me').then(() => {
    const app = createApp(App)
    app.use(store)
    app.use(router,app)
    app.use(access)
    // app.use(hasPermission('kk.l'))
    // app.use(axios)
    // app.use(access)
    app.mount('#app')

   
  })
  // export { app }