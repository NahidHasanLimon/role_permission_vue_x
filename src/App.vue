<template>
  <div id="app">
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
       <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/">Home</router-link> |
       <template v-if="!authenticated">
        <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/signin">Sign in</router-link> |
      </template>
      <template v-else>
        <router-link class="block mx-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/account">{{ user.name }}</router-link>
      </template>
      <slot>
        | <router-link class="block mx-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/permission">Permission</router-link>
      </slot>
      <!-- v-if="!$checkAccess('rem.sunt','AND','nam.eos','AND','rem.sunt')" -->
      <slot>
        | <router-link class="block mx-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/rental">Rental</router-link>
      </slot>
    </div>
    <div>
      <template v-if="authenticated">
      <a href="#" @click.prevent="signOut" class="inline-block text-sm px-4 py-2 leading-none border rounded text-red-800 border-yellow-800 hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign out</a>
      </template>
    </div>
  </div>
  <!-- <div v-html="$italicHTML('whats wrong what the hell i am checking')"></div> -->
  <!-- <div v-html="$checkAccess('rem.sunt','AND','nam.eos','AND','rem.sunt')"></div> -->
</nav>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
      })
    },

    methods: {
      ...mapActions({
        signOutAction: 'auth/signOut'
      }),

      async signOut () {
        await this.signOutAction()
        this.$router.replace({ name: 'SignIn' })
      }
    },
     created() {
        console.log('App Component')
        // console.log($this.acces)
        console.log(this);
    }
  }
</script>