# RoleAndPermissonPanel
## Features


- [Global-canAccess] - For Vue instance
- [middleware pipeline] - auth middleware implemetented with pipeline. One or more as much as u want  can be implemented
- [Multiple permission parameter] - Markdown parser done right. Fast and easy to extend.
- [branching] - branch if you want to use app instance in vue-router you can use app-instance-in-vue-router

### canAccess
Created a global method named as "canAccess" which basically replicates hasPermission in vue instance. 
###### example:  v-html="$canAccess(['product.read','OR','product.write','AND','product.delete'])


### hasPermission 
Created a custom function called hasPermission in permission.js file which placed in brain directory. this  "hasPermission" used to check whether an user can or can not do certain things.
hasPermission(allowed) takes parameters as an array which describes user permission list and simply return true or false. 
suppose you have an route that leads to "product" page or section. but if logged user not permitted to see product section it will create a barries by returning false. What if we need to check multiple condition, you can simply pass as paramater as much as you want: 
###### example: hasPermission(['product.read','OR','product.write','AND','product.delete'])
###### here product is the  module name and read/write/delete is the permission name. 

#### Some usefull links

##### [/permission](/permission) 
##### [/users](/users)
##### [/test-access ](/test-access)

### Used Technology Frontend 
- Vue 3
- Vue Router
- Vue X
### Used Technology Backend
- Laravel 9 
- Sanctum SPA for Auth