<template>
      <v-container>
    
<v-row>
  <v-flex md="4" sm="12">
      <v-card class="mx-auto"
    max-width="344" 
    min-width="344"
    outlined>
    <v-expansion-panels>
     <v-expansion-panel>
      <v-expansion-panel-header>
        <v-btn 
        color="indigo" 
       class="pa-1 ma-1" 
       dark 
       @click.stop="dialog=true">
      Charge {{totalprice}}
      </v-btn>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-row class="ma-0 pa-0">
         <v-col cols="4" class="text-left pa-0"></v-col>
         <v-col cols="6" class="text-left pa-0" >Item</v-col>
         <v-col cols="2" class="text-left pa-0">Price</v-col>
         <v-divider/>
       </v-row>
          <v-row v-for="item in cart" :key="item.id">
         <v-col cols="4" class="text-left pa-0"> 
           <v-btn v-on:click="$store.dispatch('addingcitem',item)" tile color="indigo" dark x-small>+</v-btn>
          <v-btn @click="$store.dispatch('rmcitem',item)" tile outlined color="indigo" x-small>-</v-btn>
         </v-col>
         <v-col cols="6" class="text-left pa-0">{{item.productname}} x{{item.cquantity}}</v-col>
         <v-col cols="2" class="text-left pa-0">{{Number(item.productprice)*item.cquantity}}</v-col>
       </v-row>
       <v-row>
         <v-col cols="6">
           Total-price : {{totalprice}}
         </v-col>
         <v-col cols="6">
           Total-Items : {{totalitem}}
         </v-col>
       </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels>
    </v-card>


    <v-card class="mx-auto"
    max-width="344" 
    min-width="344"
    outlined>
    <v-expansion-panels>
     <v-expansion-panel>
      <v-expansion-panel-header>
     <h4 class="text-center indigo--text">QR Scanner</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
      <qrcode-stream @decode="onDecode" ></qrcode-stream> 
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels>
    </v-card>
  </v-flex>
  <v-flex md="8" sm="12">

     <v-data-table  :items="loadedproduct" :search="searcher"
      hide-default-header
      >
       
  
        <template v-slot:header>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Stock</th>
              <th>     <v-text-field
          v-model="searcher"
          append-icon="search"
          label="Search"
          single-line
          hide-details 
        ></v-text-field> </th>
              

            </tr>
          </thead>
        </template>
        <template v-slot:body="{items}">
          <tbody>
            <tr
              v-for="(item) in items"
              :key="item.id">
              <td>
                {{item.productname}}
              </td>
              <td>
                {{item.productprice}}
              </td>
               <td>
                {{item.stock}}
              </td>
              <td justify="center" class="text-center">
                  <v-btn v-on:click="$store.dispatch('addingcitem',item)" tile color="indigo" dark>
                    Add
                  </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
     </v-data-table>



  </v-flex>

</v-row>
   
    <v-row justify="center">
   

    <v-dialog
    v-model="dialog"
    max-width="304"
    >
  <receipts  @cancel="dialog=!dialog"/>

    </v-dialog>
  </v-row>
 
    

 
      </v-container>
</template>
<script>

import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import receipts from '~/components/Receipts/receipts.vue'
export default {
      middleware:['checkauth','auth'],
  components:{
     receipts
  },
    data(){
      return{
        searcher:'',
             dialog:false,
        headers:[
            { text: 'Item', value: 'productname' },
          { text: 'Price', value: 'productprice' },
          { text: 'Stock', value: 'stock' },
           {
            text: ' ',
            align: 'center',
            sortable: false,
            value: 'action',
          },
         
          
        ]
    
      }
    },
    computed: {
        loadedproduct(){
            return this.$store.getters.loadedproduct
        },
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
      checkout(){
          this.$store.dispatch('clearcart')
      },
    onDecode (decodedString) {
    console.log(decodedString)
      console.log(this.loadedproduct)
     let indexz = this.loadedproduct.findIndex((i) => decodedString == i.id)
     console.log(this.loadedproduct[indexz])
     this.$store.dispatch('addingcitem',this.loadedproduct[indexz])
  },
  		
	
		

      

    },

}
</script>