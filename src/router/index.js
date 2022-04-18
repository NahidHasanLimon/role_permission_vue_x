// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
import Permission from '../views/Permission.vue'
import Rental from '../views/Rental.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import {hasPermission} from '../permission'
// import access from '../access'
// import {app} from '../main'
import {  getCurrentInstance } from "vue";
const routes  =  [
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
  }, {
    path: '/permission',
    name: 'Permission',
    component: Permission,
    
  },
  {
    path: '/rental',
    name: 'Rental',
    component: Rental,
    beforeEnter (to, from) {
      console.log('Why this kolavery di');
      // console.log('what .............. '+getCurrentInstance().appContext.config.globalProperties.$checkAccess)
      console.log('what .............. '+getCurrentInstance())
      
      // next(vm => {
      //   // access to component instance via `vm`
      //   console.log(vm.$keycloak.authenticated);
      // })
    }

    
    
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound', component: NotFound 
  }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    
});
// export const createRouter = (app) => {
//   return createVueRouter({
//     history: createWebHistory(),
//     routes: createRoutes(app), 👈
//   })
// }


// router.beforeEach( (to, from, next) => {
//   // console.log('what defined: '+ JSON.stringify(router))
//   // console.log('WHATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'+this.a) 
//   // console.log(router.app)
//   // console.log('this is: '+this.$router)
//   // console.log(app.config.globalProperties.$store)
//   console.log('inside before each is authenticated: '+store.getters['auth/authenticated'])
//   console.log('Route From:  '+from.fullPath)
//   console.log('Route to:  '+to.fullPath)
//   console.log('Route to Name:  '+to.name)
//   console.log('Route From Name:  '+from.fullPath)

// console.log('Route From:  '+from.fullPath)
//   let isAuthenticated = store.getters['auth/authenticated']
//   if (!isAuthenticated){
//     if(to.name != 'SignIn') next({ name: 'SignIn' })
//       next()
//   }else{
//     if(to.name == 'SignIn'){
//       console.log('authenticated and trying to enter sign in route')
//       next({ name: 'Home' })
//     }
//     else{
//       next()
//     }
    
//   }  
//   // if the user is not authenticated, `next` is called twice
//   // async
 
// })


// export default router;


// export default router

export default {
  install(app, options) {
      router.install(app)
      router.beforeEach((to, from, next) => {
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
 
          // ... stuff ...
      });
  },
};