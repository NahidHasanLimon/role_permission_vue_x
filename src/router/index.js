// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
// import {store} from '../store/index'
import store from '../store'
// Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  }
]



// const isAuthenticated = store.getters['auth/authenticated']
let isAuthenticated = store.getters['auth/authenticated'];
// let isAuthenticated = store.stat
console.log(isAuthenticated)

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});


router.beforeEach(async (to, from) => {
  if (!isAuthenticated && to.name !== 'SignIn') {
    // redirect the user to the login page
    return { name: 'SignIn' }
  }else{
    // next('Home')
  }
})


export default router;


// export default router