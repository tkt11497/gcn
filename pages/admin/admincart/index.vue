<template>
      <v-container>
    <h1>Admin Cart</h1>
<v-row>
  <v-flex>
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
       dark>
      Charge
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
  <v-flex>

     <v-data-table :headers="headers" :items="loadedproduct" :search="searcher">
       
       <v-text-field
          v-model="searcher"
          append-icon="search"
          label="Search"
          single-line
          hide-details 
          slot="header.action"
        ></v-text-field>
       
        <template v-slot:body="{items}">
          <tbody>
            <tr v-show="items.length == 0">
              <td colspan="11" class="font-weight-bold">
                <p class="text-center">---Empty---</p>
              </td>
            </tr>
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
      width="330"
    >
  <mapy v-on:confirm="makeorder" @cancel="dialog=!dialog"/>

    </v-dialog>
  </v-row>
 
    <!-- <router-link class="btn btn-sm btn-outline-info text-dark" to="/">Keep Shopping</router-link> -->
    <v-btn @click="extdownload">Download Voucher as Sheet</v-btn>
     <v-btn color="primary" dark @click="printv">
      Print
    </v-btn>
    <v-btn color="primary" dark @click="checkout">
      Checkout
    </v-btn>
   
    <!-- <v-row justify="center">
   <qrcode-stream @decode="onDecode" ></qrcode-stream> 

  
  </v-row>
   -->
 
      </v-container>
</template>
<script>

import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
export default {
      middleware:['checkauth','auth'],
  components:{
     
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
  		printv() 
		{
			var myWindow = window.open('', 'Voucher', 'height=400,width=600');
			myWindow.document.write('<html><head><title>Voucher</title>');
			/*optional stylesheet*/ //myWindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
			myWindow.document.write('<style type="text/css"> *, html {margin:0;padding:0;} </style>');
			myWindow.document.write('</head><body>');
      myWindow.document.write(`
      <hr><table style="width:100%"><tr><td align ="left">Product Name</td><td align ="center">Qty</td><td align ="right">Sub Total</td></tr>`)
      for(let i in this.cart){

        myWindow.document.write(`<tr><td align ="left">${this.cart[i].productname}</td>
        <td align ="center">${this.cart[i].cquantity}</td>
        <td align ="right">$${parseInt(this.cart[i].productprice)*this.cart[i].cquantity}</td></tr>`)
      }

     
      myWindow.document.write(`</table><hr><table style="width:100%"><tr><td align ="left">Total Items</td><td align="right">${this.totalitem}</td></tr>
      <tr><td align ="left">Total Amount</td><td align="right">$${this.totalprice}</td></tr>
      </table></body></html>`);
			myWindow.document.close(); 

			myWindow.onload=function(){ 

				myWindow.focus(); 
				myWindow.print();
				myWindow.close();
			};
		}

      

    },

}
</script>