// import Vue from 'vue'
import {createWebHistory, createRouter} from "vue-router";
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Account from '../views/Account.vue'
import Permission from '../views/Permission.vue'
import Rental from '../views/Rental.vue'
import NotFound from '../views/NotFound.vue'
// import {store} from '../store/index'
import store from '../store'
// Vue.use(VueRouter)
function check_access(...allowed){
  let sp = store.getters['permission/system_permissions']
  let up = store.getters['permission/user_permissions']
  let final_state = false;
  let returned_result = [];

  allowed.forEach((element,index) => {
    let found_sub_module = false;
   let found_module = false;
    // console.log(index)
    if(element != 'OR' && element != 'AND' ){

      let single_allowed = element.split(".")
      found_module = sp.find(x => {
        return x.name ==  single_allowed[0];
      });
      // if(found_module !=undefined){
      //   found_sub_module = found_module.sub_modules.find(x => {
      //     return x.name == single_allowed[1];
          
      //   });
      // }
      // if(found_sub_module !=undefined && found_sub_module != ''){
      //   found_sub_module = true;
      // }else{
      //   found_sub_module =false;
      // }
      // returned_result [index] = found_sub_module;
      if(found_module !=undefined){
        if(found_module.sub_modules !='' && found_module.sub_modules.length > 0){
          found_module.sub_modules.filter((ele,index)=>{
            console.log('filter: '+ JSON.stringify(ele))
            if(ele.name == single_allowed[1]){
              console.log('Yahoo matched ' + ele.name)
              found_sub_module = true;
            }
          })
        }
      }
      returned_result [index] = found_sub_module;
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
  // console.log('allowed list:'+allowed)
  if(returned_result.length > 1){
    returned_result.filter((ele,index)=>{
      if(ele == 'OR'){
        if(returned_result[index - 1 ] == true || returned_result[index+1] == true){
          final_state = true;
        }
      }
       if(ele == 'AND'){
        if(final_state == true && returned_result[index + 1] == true){
          final_state = true;
        }else{
          final_state = false;
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
      console.log(check_access('rem.sunt')) 
        // console.log(check_access('rem.sunt','OR','rental.write','AND','rem.sunt','AND','rem.suknt')) 
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