<template>
   <div class="text-till m-2">
      <h6 class="w-500">Test Page</h6>
    <p>This page is designed for checking global function and app instance! To create permission basis route and element. </p>
    <p class="m-2">Suppose you have an link that will display upon user permission.using <code> v-if or v-html</code></p>
      <p>Example 1:  <code>  v-html="$canAccess(['product.read','OR','product.delete'])"> </code></p>
      <p>Example 2:  <code> v-if="$canAccess(['product.read','OR','product.delete','AND','stock.update','OR','overview.update'])""> </code></p>
    <a v-if="$canAccess(['rerum2.amet','OR','Doctor.can edit'])" href="demolink">Demo Link</a>
   </div>
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
   
  },
  mounted(){
   
  }

  }
</script>