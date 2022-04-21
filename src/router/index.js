// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
import Permission from '../views/Permission.vue'
import Rental from '../views/Rental.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import auth from '../middleware/auth'
import middlewarePipeline from "./middlewarePipeline";
import { hasPermission } from "../permission";



const routes  =  [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  }, {
    path: '/permission',
    name: 'Permission',
    component: Permission,
    meta: {
      middleware: [auth],
     
  },
    
  },
  {
    path: '/rental',
    name: 'Rental',
    component: Rental,
    meta: {
        middleware: [auth],
        checkPermission: 'can.read'
    },
    beforeEnter (to, from) {
      // checkPermission: 'can.read'
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


// router.beforeEach( (to, from, next) => {
  // let isAuthenticated = store.getters['auth/authenticated']
  // if (!isAuthenticated){
  //   if(to.name != 'SignIn') next({ name: 'SignIn' })
  //     next()
  // }else{
  //   if(to.name == 'SignIn'){
  //     //authenticated and trying to enter sign in route
  //     next({ name: 'Home' })
  //   }
  //   else{
  //     next()
  //   }
    
  // }  

// })
  router.beforeEach((to, from, next) => {
   


    const middleware = to.meta.middleware;
    const context = { to, from, next, store };

    if (!middleware) {
      return next();
    }

    middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1),
    });
  });

export default router;


