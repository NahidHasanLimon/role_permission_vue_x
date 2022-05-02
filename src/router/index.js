// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
import Permission from '../views/Permission.vue'
import Rental from '../views/Rental.vue'
import Users from '../views/Users.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import auth from '../middleware/auth'
import middlewarePipeline from "./middlewarePipeline";
import { hasPermission } from "../brain/permission";
import permission from "../store/permission";



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
    },
    beforeEnter (to, from) {
      return hasPermission(['facere.yes','OR','can.read'])
    }

    
    
  }, 
   {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
        middleware: [auth],
    },  
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

  router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      // console.log('to.meta');
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];
      const context = {
        from,
        next,
        store,
        to,
      };
      const nextMiddleware = middlewarePipeline(context, middleware, 1);
      const middleware_result =  middleware[0]({
         ...context, 
          next: nextMiddleware 
      });
      
    }else{
      
    }
   
    return next();
   });

export default router;


