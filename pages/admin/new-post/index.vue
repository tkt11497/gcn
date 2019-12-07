<template>


<adminform v-on:add="add" v-on:delete="deleteitem"></adminform>
</template>
<script>
import adminform from '@/components/admin/adminform';
import axios from 'axios'
export default {
  created(){
    this.$store.commit('settitle', 'Add Item')
  },
    middleware:['checkauth','auth'],
    components:{
        adminform

    },
    methods: {
       add (product) {
          //axios.post('https://stecomlikepos.firebaseio.com/product.json',product).then(result=>console.log(result.data.name))
        this.$store.dispatch('addproduct',product)
        //.then(this.$router.push('/admin/'))
      },
      deleteitem (product) {
           alert('Nothing to delete')
      }
      }
 
}
</script>