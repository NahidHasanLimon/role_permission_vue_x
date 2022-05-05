<template>
       <div class="container mx-auto px-4 block p-6 rounded-lg shadow-lg bg-white mb-4">
          <h6 class=" text-center text-5xl font-bold mt-0 mb-6">System Permissions</h6>
         <div class="flex justify-start space-x-4">
              <AddPermission :all_modules = "all_modules" @custom_event='refreshPermissions'/>
              <AddPermissionModule @custom_event='refreshPermissions'/>
         </div>
                <div class="block p-6 rounded-lg shadow-lg bg-white mb-2" v-for="permission of permissions" :key="permission.id">
                    <h6 class="text-gray-900 text-xl leading-tight font-medium mb-2 text-center"> {{permission.name}}</h6>
                    <template v-if="permission.sub_modules.length > 0"  >
                        <div class="flex justify-start">
                        <div class="form-check form-check-inline mr-2" v-for="sub_permission in permission.sub_modules" :key="sub_permission.id">
                            <li class="m-1 p-2"> {{sub_permission.name}} </li>
                        </div>
                        </div>
                    </template>
                    <template v-else>
                        <span class="text-amber-600 text-sm text-center">No Permission Exist</span>
                    </template>
                </div>
       </div>
        

    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AddPermission from '../components/AddPermission.vue';
import AddPermissionModule from '../components/AddPermissionModule.vue';

  export default {
    name: 'Permission',
    components: {
     AddPermission,
     AddPermissionModule
    },
    data () {
    return {
        all_modules: [],
     }
    },
   
    computed: {
      ...mapGetters({
        permissions: 'permission/system_permissions',
      }),
      
    },
    mounted() {
        if(this.userPermissions !== null){
            this.all_modules = this.permissions;
        }
 
    } ,
     methods: {
       refreshPermissions(){
         console.log('From Refresh Permissions')
          this.me()
      }
    },
    created() {
        console.log(this.permissions)
    }
  }
</script>