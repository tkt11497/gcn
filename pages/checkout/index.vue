<template>
      <v-container>
    
      <material-cardy color="#283E4A" ref="normal" :title="`Your Cart Total-price is ${totalprice}`">
        <!-- <v-btn @click="extdownload" slot="buttons">Download Voucher as Sheet</v-btn> -->
     <v-btn color="indigo" dark @click.stop="dialog=true" slot="buttons">
      Make Order
    </v-btn>
     <v-data-table
    :headers="headers"
    :items="cart"
    class="elevation-1" 
    disable-sort
  >
    <template v-slot:item.action="{ item }" >
      <v-btn v-on:click="$store.dispatch('addingcitem',item)" tile color="indigo" dark small>+</v-btn>
              <v-btn @click="$store.dispatch('rmcitem',item)" tile outlined color="indigo" small>-</v-btn>
    </template>
     <template v-slot:item.Sub-total="{ item }">
        {{Number(item.productprice)*item.cquantity}}
        </template>
  </v-data-table>
      </material-cardy>
   
    <v-row justify="center">
   

    <v-dialog
    v-model="dialog"
      width="330"
    >
  <mapy v-on:confirm="makeorder" @cancel="dialog=!dialog"/>

    </v-dialog>
  </v-row>
 
      </v-container>
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
        headers:[
           {
            text: ' ',
            align: 'center',
            sortable: false,
            value: 'action',
          },
          { text: 'Item', value: 'productname' },
          { text: 'Qty', value: 'cquantity' },
          { text: 'Price', value: 'productprice' },
          { text: 'Sub-total', value: 'Sub-total' },
          
        ]
    
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