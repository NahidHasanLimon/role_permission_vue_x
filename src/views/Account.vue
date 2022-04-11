<template>
   <div style="padding:35px;">
    <h1 style=" text-align: center;">Account page</h1>
    <h2 style=" text-align: center;">Logged user is: {{ user.name }}</h2>
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
  }
</script>