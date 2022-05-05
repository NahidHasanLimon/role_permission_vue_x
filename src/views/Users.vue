<style >
#custom-pagination ul >li {
  display: inline !important;
}
.active{
  color: red !important;
}

</style>

<template>
    <div class="bg-inherit p-6">
      <h6 class="text-center">Users List</h6>
    </div>
   
<div class="relative overflow-x-auto shadow-md sm:rounded-lg justify-center align-middle  m-3">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          ID
        </th>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Email
        </th>
        <th scope="col" class="px-6 py-3">
          Permissions
        </th>
        <!-- <th scope="col" class="px-6 py-3">
        Added at
        </th> -->
        <th scope="col" class="px-6 py-3">
        <span class="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
    <template v-if="users">
       <tbody  v-for="user in users.data" :key="user.id">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{user.id}}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{user.name}}
            </th>
              <td class="px-6 py-4">
                {{user.email}}
              </td>
              <td class="px-6 py-4">
                {{user.permissions}}
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="openPermissionModal(user.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              </td>
          </tr>
    </tbody>
    </template>
  </table>
</div>
<div id="custom-pagination" class="custom-pagination p-2 justify-center flex">
  <Pagination :data="users" @pagination-change-page="fetchUser" />

</div>
<!-- modal start here  -->
<div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  h-modal md:h-full">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t ">
            <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-red h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span> 
            </button>
          </div>
            <div class="justify-center">
              <h3 class="text-3xl font-semibold text-center"> User Permissions</h3>
            </div>
          <!--body-->
          <div class="justify-center  flex p-1">
                  <UserPermission :user_id="user_id" @refreshUser="refreshUser"/>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Close
            </button>
            
          </div>
        </div>
      </div>
    </div>
<!-- modal start here  -->

</template>


<script>
import axios from "axios"
import UserPermission from "../components/UserPermission.vue"
import LaravelVuePagination from 'laravel-vue-pagination';


  export default {
    name: 'Home',
    components: {
      UserPermission,
     'Pagination': LaravelVuePagination
    },
    data(){
      return {
        users: {},
        user_id: '',
        showModal: false,
      }
    },

    mounted(){
        //  this.fetchUser(); we can use mounted or created both for api fetching on the beginning
    },
    methods: {
       fetchUser: function(page = 1){
         axios.get('api/user?page=' + page)
          .then(response => (
            this.users = response.data.users
            )
          )
      },
      openPermissionModal: function(user_id){
         console.log('clicked for open modal');
         this.user_id = user_id;
         this.toggleModal()
      },
       toggleModal: function(){
      this.showModal = !this.showModal;
    },
      refreshUser(user){
        this.users.data.find((item)=>{
          if(item.id == user.id){
            item.permissions = user.permissions
          }
        })
      }
    },
    created (){
        console.log('User Component')
        this.fetchUser();
    },

  }
</script>
