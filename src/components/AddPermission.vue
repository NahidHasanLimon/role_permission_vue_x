<template>
  <div>
    <button class="bg-sky-900 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
      Add Permission 
    </button>
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
             Add Permission
            </h3>
            
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-5">
              
              <div v-for="error in errors" :key="error">
                <li>{{ error[0] }}</li>
              </div>

				<form class="space-y-4" action="#" method="POST" @submit.prevent="submit">
					<input type="hidden" name="remember" value="True">
					<div class="rounded-md shadow-sm -space-y-px">
						<div class="grid gap-6">
							<div class="col-span-12">
								<label for="first_name" class="block text-sm font-medium text-gray-700">Name</label>
								<input type="text" name="first_name" id="first_name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" v-model="name">
							</div>

							<div class="col-span-12">
								<label for="email_address" class="block text-sm font-medium text-gray-700">Select a module</label>
								<select name="module" id="" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" v-model="selected_module">
                  <option v-for="option in all_modules" :value="option.id" :key="option">
                      {{ option.name }}
                    </option>
                </select>
							</div>
						</div>
					</div>
					<div>
						<button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<span class="absolute left-0 inset-y-0 flex items-center pl-3">
								
							</span>
							Submit
						</button>
					</div>
				</form>
		</div>
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
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: "AddPermission",
  props: ['all_modules'],
  data() {
    return {
      showModal: false,
      name: '',
      selected_module: '',
      errors : ''
    }
  }, 
  computed: {

      
    },
    mounted() {
    
        // this.selected_permissions = []
    } ,
  methods: {
    toggleModal: function(){
      this.showModal = !this.showModal;
    },
    submit: function(){
        const formData = new FormData()
        formData.append('name',this.name )
        formData.append('module_id',this.selected_module )
        axios.post('/api/sub-module', formData).then((response) => {
        if(response.data.success){
              this.toggleModal()
              this.$emit('custom_event','refreshPermissions')
          }
          }).catch((e) => {
          if(e.response.status){
             this.errors = e.response.data.errors || {};
          }
        })
    }
  },
  created (){
    console.log('module options are '+this.all_modules)
  }
}
</script>