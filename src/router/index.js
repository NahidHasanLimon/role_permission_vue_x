// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
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
  console.log('inside before each is authenticated: '+store.getters['auth/authenticated'])
  console.log('Route From:  '+from.fullPath)
  console.log('Route to:  '+to.fullPath)
  console.log('Route to Name:  '+to.name)
  console.log('Route From Name:  '+from.fullPath)

console.log('Route From:  '+from.fullPath)
  let isAuthenticated = store.getters['auth/authenticated']
  if (!isAuthenticated){
    if(to.name != 'SignIn') next({ name: 'SignIn' })
      next()
  }else{
    if(to.name == 'SignIn'){
      console.log('authenticated and trying to enter sign in route')
      next({ name: 'Home' })
    }
    else{
      next()
    }
    
  }  
  // if the user is not authenticated, `next` is called twice
  // async
 
})


export default router;


// export default router