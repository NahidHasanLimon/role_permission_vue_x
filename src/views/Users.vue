<style scoped>
ul >li {
  display: inline !important;
}
.pagination .page-item.pagination-page-nav ul > li {
  display: inline !important;
  color: red !important;;
}
.pagination .page-item .pagination-page-nav ul > li {
  display: inline !important;
  color: red !important;;
}
.custom-pagination li{
  color: red !important;
}
#custom-pagination li 
{
   display: inline-block !important;
   padding: 0px 10px !important;
   color: red;
}
#custom-pagination > .pagination > .page-item > .pagination-page-nav >ul
{
   display: inline-block !important;
}
.page-item .pagination-page-nav{
    display:inline-block !important;
}
.pagination ul > li{
   display:inline-block !important;
}

#custom-pagination .page-item.pagination-page-nav{
  color: red !important;
}
li.page-item.pagination-page-nav{
    color: red !important;
}
ul.pagingation{
  color: teal;
}
</style>

<template>
    <h6 class="text-center">Users</h6>
   
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              <!-- <td class="px-6 py-4">
              {{user.created_at}}
              </td> -->
              <td class="px-6 py-4 text-right">
                <button @click="open_permission_modal(user.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              <!-- <UserPermission :user_id="user.id"/> -->
              </td>
          </tr>
    </tbody>
    </template>
  </table>
</div>
<div id="custom-pagination" class="custom-pagination">
  <h1>Chek</h1>
  <Pagination :data="users" @pagination-change-page="fetch_users" />

</div>
<!-- modal start here  -->
<div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  h-modal md:h-full">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
             User Permissions {{user_id}}
            </h3>
            
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative  flex p-2">
            <!-- <div class="rounded bg-white max-w-xl rounded overflow-hidden shadow-xl"> -->
                  <!-- content  -->
                  <UserPermission :user_id="user_id"/>
                  <!-- content  -->
	        	<!-- </div> -->
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
        //  this.fetch_users();
    },
    methods: {
       fetch_users: function(page = 1){
        //  if (typeof page === 'undefined') {
        //       page = 1;
        //   }
        // axios.get(`/api/user?page=' + page`)
         axios.get('api/user?page=' + page)
          .then(response => (
            this.users = response.data.users
            )
          )
      },
      open_permission_modal: function(user_id){
         console.log('clicked for open modal');
         this.user_id = user_id;
         this.toggleModal()

      },
       toggleModal: function(){
      this.showModal = !this.showModal;
    },
      get_permission(){

      }
    },
    created (){
        console.log('User Component')
       
        this.fetch_users();
    },

  }
</script>
