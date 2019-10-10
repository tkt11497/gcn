<template>
       <div>
         <qrcode-vue class="no-print" :value="loadedproduct.id"></qrcode-vue>
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
    return axios.get('https://stecomlikepos.firebaseio.com/product/'+context.route.params.productid+'.json')
    .then((res)=>{
      return {loadedproduct:{...res.data,id:context.route.params.productid}}
    
    })
    .catch((e)=>{context.error(e);
    })

  },
  methods: {
    add(){
      this.$router.push('/admin')
    },
      updater(data){
        this.$store.dispatch('updateproduct',data).then(
         (res)=>{this.$router.push('/admin')}
         )
      },
      deleter(data){
         this.$store.dispatch('deleteproduct',data).then(
          (res)=>{this.$router.push('/admin')
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