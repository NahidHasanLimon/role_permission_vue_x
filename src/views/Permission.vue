<template>
       <div class="container mx-auto px-4 block p-6 rounded-lg shadow-lg bg-white mb-4">
           {{userPermissions}}
           {{this.selected_permissions}}
            <h6 class=" text-center text-5xl font-bold mt-0 mb-6">System Permissions</h6>
            <form @submit.prevent="submit_user_permission" method="post">
                <div class="block p-6 rounded-lg shadow-lg bg-white mb-2" v-for="permission of permissions" :key="permission.id">
                    <h6 class="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">{{permission.id}}  - {{permission.name}}</h6>
                    <template v-if="permission.sub_modules.length > 0"  >
                        <div class="flex justify-start">
                        <div class="form-check form-check-inline mr-2" v-for="sub_permission in permission.sub_modules" :key="sub_permission.id">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox{{sub_permission.id}}" :value="sub_permission.id"  v-model="selected_permissions" >
                            <label class="form-check-label inline-block text-gray-800" for="inlineCheckbox{{subm}}"> {{sub_permission.name}} - {{sub_permission.id}}</label>
                        </div>
                        </div>
                    </template>
                    <template v-else>
                        <span class="text-gray-900 text-sm text-center">No Permission Exist</span>
                    </template>
                </div>
                   
                <div class="relative h-32 w-32">
                    <div class="float-right absolute bottom-0 right-0 h-16 w-16"> 
                        <button type="submit" class="clear-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </div>
            </form>
       </div>
        

    
</template>
<script>
 import { EMPTY_ARR } from '@vue/shared';
import { mapGetters, mapActions } from 'vuex'
 
  export default {
    data () {
    return {
        // selected_permissions:[1,2,3,4],
        selected_permissions: [],
     }
    },
    computed: {
      ...mapGetters({
        permissions: 'permission/system_permissions',
        userPermissions: 'permission/user_permissions',
      }),
      
    },
    mounted() {
        if(this.userPermissions !== null){
            this.selected_permissions = this.userPermissions;
        }
        // this.selected_permissions = []
    } ,
     methods: {
      ...mapActions({
        setUserPermission: 'permission/setUserPermission'
      }),

      async submit_user_permission () {
        const formData = new FormData()
        formData.append('permissions',JSON.stringify(this.selected_permissions) );
        await this.setUserPermission(formData)
      }
    },
    created() {
        console.log('Permission component')
        console.log(this.permissions)
        console.log('Selected permissions are: '+this.selected_permissions)
    }
  }
</script>