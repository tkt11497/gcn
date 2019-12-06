<template>
<v-container fluid>


     <v-col md11 offset-md="1">
      <v-layout row wrap class="ml-4">
        <v-flex xs12 sm8 md3 class="ma-2">
        
          <material-stats-card
            color="primary"
            icon="mdi-layers"
            :value="`${$store.getters.loadedproduct.length} Items`"
            title="Items">
            <v-btn @click="$router.push('/admin/items')" slot="button" small text color="indigo">Go to Items</v-btn>
          </material-stats-card>
        
        </v-flex>
        <v-flex xs12 sm8 md3 class="ma-2">
         
          <material-stats-card
            color="teal"
            icon="ring_volume"
            :value="`Orders`"
            title="Orders">
            <v-btn @click="$router.push('/admin/order')" slot="button" small text color="indigo">Go to Order List</v-btn>
          </material-stats-card>
          
        </v-flex>
        <v-flex xs12 sm8 md3 class="ma-2">
         
          <material-stats-card
            color="#002C6D"
            icon="shopping_basket"
            :value="`POS`"
            title="Sales">
            <v-btn @click="$router.push('/admin/admincart')" slot="button" small text color="indigo">Go to Sales(POS)</v-btn>
          </material-stats-card>
        </v-flex>
  
      </v-layout>
    </v-col>






    <v-snackbar v-model="snackbar" :timeout="5000" top color="success">
      <span>Welcome {{$store.getters.currentloginname}} !!!</span>
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
   
    <v-btn v-on:click="logout">Logout</v-btn>
    
      
     
    <qrcode-stream @decode="onDecode" ></qrcode-stream>
 
</v-container>
</template>
<script>

import productlist from '@/components/product/productlist';
import axios from 'axios'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver' 
export default {
    middleware:['checkauth','auth'],
    data(){
      return{
        excel:null,
        snackbar:true
      }
    },
    components:{
        productlist,
      
      // QrcodeDropZone,
      // QrcodeCapture
    },
     computed:{
    loadedproduct(){
      return this.$store.getters.loadedproduct
    }},
     methods: {
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    },  
     handleFile(e) {
       if(e==null){return}
        let f = e;
        let reader = new FileReader();
        let stream=null
        reader.addEventListener('load',(e)=>{
           let data = new Uint8Array(e.target.result);
          let workbook = XLSX.read(data, {type: 'array'});
          console.log(workbook)
         workbook.SheetNames.forEach((sheetname)=>{
           stream = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname], {raw:true})
         })
         console.log(stream)

  

         for(let i in stream){
         this.$store.dispatch('addproduct',stream[i])
         }
          })

          reader.readAsArrayBuffer(f);
          
        },

        addingcitem(item){
       this.$store.dispatch('addingcitem',item)

       },
         jtosheet(){
      const fileName = 'test.xlsx';

    		const ws= XLSX.utils.json_to_sheet(this.loadedproduct);
     		const wb = XLSX.utils.book_new();
    		XLSX.utils.book_append_sheet(wb, ws, 'test');

    		XLSX.writeFile(wb, fileName);
    
    },
      onDecode (decodedString) {
    console.log(decodedString)
      console.log(this.loadedproduct)
     let indexz = this.loadedproduct.findIndex((i) => decodedString == i.id)
     console.log(this.loadedproduct[indexz])
     this.$store.dispatch('addingcitem',this.loadedproduct[indexz])
  }
}
}
</script>