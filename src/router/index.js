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



// const isAuthenticated = store.getters['auth/authenticated']
// console.log('this'+this)
// console.log('__________________________')
// let isAuthenticated = store.getters['auth/authenticated'];
// // let isAuthenticated = store.stat
// console.log(isAuthenticated)

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
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
// router.beforeEach((to, from, next) => {
//   if(to.path != '/signin') {
//       if(isAuthenticated) { 
//           // logger('There is a token, resume. (' + to.path + ')');
//           next();
//       } else {
//           // logger('There is no token, redirect to login. (' + to.path + ')');
//           next('signin');
//       }
//   } else {
//       // logger('You\'re on the login page');
//       next(); // This is where it should have been
//   }
  // next(); - This is in the wrong place
// });


export default router;


// export default router