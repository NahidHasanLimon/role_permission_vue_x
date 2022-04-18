// import Vue from 'vue'
import {createWebHistory, createRouter as createVueRouter} from "vue-router";
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
import Permission from '../views/Permission.vue'
import Rental from '../views/Rental.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'



const routes  = (app) => [
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
      console.log('Why this kolavery di: '+app.config.globalProperties.$checkAccess('rem.okay'));
      // console.log('Why this kolavery di'+app.config.globalProperties.$checkAccess('Finally.YEs'));
    }

    
    
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound', component: NotFound 
  }
]
// const router = createRouter({
//     history: createWebHistory(),
//     routes: routes,
    
// });

 export const createRouter = (app) => {
  const router =  createVueRouter({
    history: createWebHistory(),
    routes: routes(app),
  })
  router.beforeEach( (to, from, next) => {
  
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
  return router;
}




// export default createRouter;


// export default router

