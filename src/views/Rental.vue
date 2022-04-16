<template>
    <h6 class="text-center">Rental Page</h6>
</template>


<script>
import {hasPermission} from '../permission'
  export default {
    name: 'Home',
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