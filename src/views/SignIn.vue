<template>
<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
  <form action="#" @submit.prevent="submit">
    <div>
      <label for="email">Email address</label>
      <input type="text" name="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker">
    </div>
    <div>
      <label for="password">Password</label>
      <input type="text" name="password" id="password" class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3">
    </div>
    <div>
    <div class="flex items-center justify-between">
        <button class="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded text-black" type="submit">
          Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
          Forgot Password?
        </a>
    </div>
      <!-- <button type="submit">
        Sign in
      </button> -->
    </div>
  </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions } from 'vuex'

  export default {
    name: 'SignIn',

    data () {
      return {
        form: {
          email: '',
          password: '',
        }
      }
    },

    methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      }),

      async submit () {
        await this.signIn(this.form)

        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>