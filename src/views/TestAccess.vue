<template>
    <h6 class="text-center">Test Page</h6>
    <p>This page is designed for checking global function and app instance! To create permission basis route and element. </p>
</template>


<script>

  export default {
    name: 'TestAccess',
    components: {
      //
    },
//     beforeRouteLeave (to, from, next) {
//     // console.log('left child component')
//     const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//       if (!answer) { return false } else { next()}
//   },
  created (){
    //   console.log( 'Check access methos '+ this.$checkAccess('ren.lim'))
  },
  mounted(){
    //    console.log('Whats wrong'+this.$checkAccess('eyel.l'))
  }

  }
</script>