<template>
      <div class="text-primary">
    <h1>Admin Cart</h1>

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
     <v-btn color="primary" dark @click="printv">
      Print
    </v-btn>
    <v-btn color="primary" dark @click="checkout">
      Checkout
    </v-btn>
    <v-row justify="center">
   <qrcode-stream @decode="onDecode" ></qrcode-stream> 

  
  </v-row>
 
  </div>
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