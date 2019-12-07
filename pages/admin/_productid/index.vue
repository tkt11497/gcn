<template>
       <div>
         <v-row justify="center">
           <v-btn small @click="printf">Print</v-btn>
           
         <qrcode-vue class="no-print" :value="loadedproduct.id"></qrcode-vue>
         </v-row>
    <adminform class="no-print" v-bind:existingproduct="loadedproduct" @add="add" v-on:update="updater" v-on:delete="deleter"/>
      <div class="container on-print">
  <div class="row">
    <div class="col-sm">
      <qrcode-vue :value="loadedproduct.id" :size="qrsize"></qrcode-vue>
    </div>
    <div class="col-sm">
     <qrcode-vue :value="loadedproduct.id" :size="qrsize"></qrcode-vue>
    </div>
    <div class="col-sm">
      <qrcode-vue :value="loadedproduct.id" :size="qrsize"></qrcode-vue>
    </div>
  </div>
</div>
</div>
</template>
<script>
import adminform from "@/components/admin/adminform.vue";
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'
export default {
    data(){
      return{
        print:false,
        qrsize: 300
      }
    },
    middleware:['checkauth','auth'],
    components:{
        adminform,
        QrcodeVue
    },
asyncData(context) {
    return axios.get('https://stecomlikepos.firebaseio.com/'+context.store.state.currentloginname+'/product/'+context.route.params.productid+'.json')
    .then((res)=>{
      context.store.commit('settitle', 'Edit Item')
      return {loadedproduct:{...res.data,id:context.route.params.productid}}
    
    })
    .catch((e)=>{context.error(e);
    })

  },
  methods: {
    printf(){
      window.print()
    },
    add(){
      this.$router.push('/admin/items')
    },
      updater(data){
        this.$store.dispatch('updateproduct',data).then(
         (res)=>{this.$router.push('/admin/items')}
         )
      },
      deleter(data){
         this.$store.dispatch('deleteproduct',data).then(
          (res)=>{this.$router.push('/admin/items')
                 alert('successfully deleted')
                
               }
         )
      }
    
  },
}
</script>
<style scoped>
.on-print{
    display: none;
  }
@media print{
  .on-print{
    display: block;
  }
  .no-print{
    display: none;
  }
}
</style>