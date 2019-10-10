<template>
<div>
    <v-snackbar v-model="snackbar" :timeout="5000" top color="success">
      <span>Welcome {{$store.getters.currentloginname}} !!!</span>
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-btn v-on:click="$router.push('/admin/new-post')">Add New Product</v-btn>
    <v-btn v-on:click="logout">Logout</v-btn>
      <v-btn @click="jtosheet">Get current balance</v-btn>
     <v-file-input show-size label="Select Excel File" v-model="excel"  prepend-icon="mdi-folder-open"></v-file-input>
      <v-btn v-on:click="handleFile(excel)">Import Multiple products with excelsheet</v-btn>
       <v-btn v-on:click="$router.push('/admin/order')">Order list</v-btn>
       <v-btn @click="$router.push('/admin/admincart')">Add Items with QR</v-btn>
     <productlist isadmin v-bind:product="loadedproduct" v-on:addingcitem="addingcitem"/>
    <qrcode-stream @decode="onDecode" ></qrcode-stream>
</div>
</template>
<script>

import productlist from '@/components/product/productlist';
import axios from 'axios'
import XLSX from 'XLSX'
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