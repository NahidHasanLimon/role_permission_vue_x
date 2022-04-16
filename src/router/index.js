// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
import Permission from '../views/Permission.vue'
import Rental from '../views/Rental.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import { Result } from "postcss";
function check_access(...allowed){
  let sp = store.getters['permission/system_permissions']
  let up = store.getters['permission/user_permissions']
  let final_state = false;
  let returned_result = [];
  if(allowed.length %2 ==0 ){
    throw new TypeError("Parameter must be odd.")
  }
  allowed.forEach((element,index) => {
    if( index%2 !=0){
      if((element !== 'OR') && ( element !== 'AND' )){
        throw new TypeError("Method parameter order not correct.")
      }
    }
    let found_sub_module = false;
    let found_module = false;
    let is_permission_exist_to_user = false;
    if(element != 'OR' && element != 'AND' ){

      let single_allowed = element.split(".")
      found_module = sp.find(x => {
        return x.name ==  single_allowed[0];
      });
      if(found_module !=undefined){
        if(found_module.sub_modules !='' && found_module.sub_modules.length > 0){
          found_module.sub_modules.filter((ele,index)=>{
            if(ele.name == single_allowed[1]){
              found_sub_module = true;
              is_permission_exist_to_user = up.includes(ele.id)
              console.log('is exist: '+is_permission_exist_to_user)
            }
          })
        }
      }

      returned_result [index] =is_permission_exist_to_user
    }
    // if or and 
    else if(element =='OR'){
      returned_result [index] = element;
    }
    else if(element =='AND'){
      returned_result [index] = element;
    }
  });
  console.log('Retuned result: '+JSON.stringify(returned_result));

  // For Result Combination
  
  let returned_result_length = returned_result.length;
  if(returned_result_length > 1){ 
    returned_result.filter((ele,index)=>{
      if(ele == 'OR'){
        if(returned_result[index - 1 ] == true || returned_result[index+1] == true){
          final_state = true;
        }
      }
       if(ele == 'AND'){
        if(!returned_result.includes('OR')){
          console.log('No Or Operator')
          if(returned_result[index - 1 ] && returned_result[index + 1] == true){
            final_state = true;
          }else{
            final_state = false;
          }
        }else{
          if(final_state == true && returned_result[index + 1] == true){
            final_state = true;
          }else{
            final_state = false;
          }
        }
           
      }
  })} else{
    final_state = returned_result [0];
  }
  console.log('Final state is  '+final_state)
  return final_state;
}


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
  }, {
    path: '/permission',
    name: 'Permission',
    component: Permission,
    
  },
  {
    path: '/rental',
    name: 'Rental',
    component: Rental,
    beforeEnter: (to, from) => {
      return check_access('rem.sunt','AND','nam.eos','AND','rem.sunt')
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