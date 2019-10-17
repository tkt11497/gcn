<template>
      <div class="text-primary">
    <h1>Cart</h1>

    <table class="table table-hover" id="table2">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" class="text-primary">Item</th>
          <th scope="col" class="text-center text-primary">Qty</th>
          <th scope="col" class="text-right text-primary">Price</th>
          <th scope="col" class="text-right text-primary">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-primary" v-for="citem in cart" v-bind:key="citem.id">
          <td class="text-center">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button v-on:click="$store.dispatch('addingcitem',citem)" class="btn btn-info">+</button>
              <button @click="$store.dispatch('rmcitem',citem)" class="btn btn-outline-info">-</button>
            </div>
          </td>
          <th scope="row">{{citem.productname}}</th>
          <td class="text-center">{{citem.cquantity}}</td>
          <td class="text-right">{{citem.productprice}}</td>
          <td class="text-right">{{parseInt(citem.productprice)*citem.cquantity}}</td>
        </tr>
        <tr>  
          <td colspan="5" class="text-right">

        <b class="text-right h3 text-primary">Total:{{totalprice}}</b>
  
      </td>
      </tr>
              <tr>  
          <td colspan="5" class="text-right">

      
  
      </td>
      </tr>
      </tbody>
    </table>
    <!-- <router-link class="btn btn-sm btn-outline-info text-dark" to="/">Keep Shopping</router-link> -->
    <v-btn @click="extdownload">Download Voucher as Sheet</v-btn>
     <v-btn color="primary" dark @click.stop="dialog=true">
      Make Order
    </v-btn>
    <v-row justify="center">
   

    <v-dialog
    v-model="dialog"
      width="400"
    >
  <mapy v-on:confirm="makeorder"/>

    </v-dialog>
  </v-row>
 
  </div>
</template>
<script>
import XLSX from 'xlsx'
import mapy from '~/components/map/mapy.vue'
import { saveAs } from 'file-saver'
export default {
  components:{
    mapy
  },
    data(){
      return{
        dialog:false,
    
      }
    },
    computed: {
        cart(){
            return this.$store.getters.cart
        },
        totalprice(){
            return this.$store.getters.totalprice
        },
        totalitem(){
            return this.$store.getters.totalitem
        },

    },
    methods: {
      extdownload(){
        let workbook = XLSX.utils.table_to_book(document.getElementById('table2'));
        console.log(workbook)
        //XLSX.writeFile(workbook, 'out.xlsb')
        let wopts = { bookType:'xlsx', bookSST:false, type:'array' };

        let wbout = XLSX.write(workbook,wopts);

        saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");
      },
      makeorder(ordery){
        console.log(this.totalitem)
        if(this.totalitem==0){return}
        let orderx={...ordery,cart:this.cart,totalprice:this.totalprice,totalitem:this.totalitem}
        //console.log(orderx)
        this.$store.dispatch('addorder',orderx)
        //this.$store.dispatch('makeorder')
      },

      

    },

}
</script>