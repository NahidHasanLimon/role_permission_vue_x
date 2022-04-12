// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});


router.beforeEach( (to, from, next) => {
  console.log('inside before each: '+store.getters['auth/authenticated'])

console.log('Route From:  '+from.fullPath)
  let isAuthenticated = store.getters['auth/authenticated']
  if (to.name !== 'SignIn' && !isAuthenticated) next({ name: 'SignIn' })
  // if the user is not authenticated, `next` is called twice
  // async
  next()
})


export default router;


// export default router