<template>
    <div>
    <table class="table table-hover table-borderless" id="table1">
      <thead>
        <tr>
          <th scope="col" class="text-primary">Name</th>
          <th scope="col" class="text-right text-primary">Address</th>
          <th scope="col" class="text-right text-primary">Phone Number</th>
          <th scope="col" class="text-right text-primary">Email</th>
          <th scope="col" class="text-right text-primary">Payment Method</th>
          <th scope="col" class="text-right text-primary">Order Date</th>
          <th scope="col" class="text-right text-primary">Processing Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-primary">
          <th scope="row">{{loadedorder.name}}</th>
          <td class="text-right">{{loadedorder.address}}</td>
          <td class="text-right">{{loadedorder.phno}}</td>
          <td class="text-right">{{loadedorder.email}}</td>
          <td class="text-right">{{loadedorder.paymenttype}}</td>
           <td class="text-right">{{loadedorder.date}}</td>
           <td class="text-right">{{loadedorder.deliverystatus}}</td>
        </tr>
        <tr><td colspan="7" ></td></tr>
        <tr>
          <th scope="col" class="text-primary"></th>
          <th scope="col" class="text-primary"></th>
          <th scope="col" class="text-primary"></th>
          <th scope="col" class="text-primary text-right">Item</th>
          <th scope="col" class="text-right text-primary">Qty</th>
          <th scope="col" class="text-right text-primary">Price</th>
          <th scope="col" class="text-right text-primary">Sub-total</th>
        </tr>
        <tr class="text-primary" v-for="citem in loadedorder.cart" v-bind:key="citem.id">
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <th scope="row" class="text-right">{{citem.productname}}</th>
          <td class="text-right">{{citem.cquantity}}</td>
          <td class="text-right">{{citem.productprice}}</td>
          <td class="text-right">{{parseInt(citem.productprice)*citem.cquantity}}</td>
        </tr>
        <tr>  
        <td colspan="3" class="text-right">

        <b class="text-right h3 text-primary">Total Items:{{loadedorder.totalitem}}</b>
  
      </td>
        <td colspan="4" class="text-right">

        <b class="text-right h3 text-primary">Total Amount to Pay:${{loadedorder.totalprice}}</b>
  
      </td>
      </tr>
      </tbody>
    </table>
    <v-btn @click="exceldownload">Download Voucher as Sheet</v-btn>
    <v-btn @click="printv">Print</v-btn>
    <v-dialog
    v-model="dialog"
      width="400"
    >
    <v-card class="elevation-12">
         <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Info</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p></p>
                <p>We will call you to confirm your information</p>
                <p>After Confirmation, </p>
                <p>your items will be shipped to you within 7 working days</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog=false">Ok</v-btn>
              </v-card-actions>
      </v-card>
    </v-dialog>
     
    </div>
</template>
<script>
import axios from 'axios'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
export default {
  data(){
    return{
      dialog:true
    }
  },
    asyncData(context) {
    return axios.get('https://stecomlikepos.firebaseio.com/order/'+context.route.params.id+'.json')
    .then((res)=>{
      console.log(res.data)
      return {loadedorder:res.data}
    
    }).catch((e)=>{context.error(e);
    console.log(e)
    })
        
    },
    methods: {
        exceldownload(){
        let workbook = XLSX.utils.table_to_book(document.getElementById('table1'));
        console.log(workbook)
        //XLSX.writeFile(workbook, 'out.xlsb')
        let wopts = { bookType:'xlsx', bookSST:false, type:'array' };

        let wbout = XLSX.write(workbook,wopts);

        saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");
      },
    
	
			
		printv() 
		{
			var myWindow = window.open('', 'Voucher', 'height=400,width=600');
			myWindow.document.write('<html><head><title>Voucher</title>');
			/*optional stylesheet*/ //myWindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
			myWindow.document.write('<style type="text/css"> *, html {margin:0;padding:0;} </style>');
			myWindow.document.write('</head><body>');
      myWindow.document.write(`<style>body {font-size: 10px;font-family:Calibri;}table {font-size: 13px;font-family:Calibri;line-height: 1.6}</style><table style="width:100%"><tr>
      <td align ="left">ORDER ID</td><td align ="right">${this.$route.params.id}</td></tr><tr><td align ="left">ORDER D/TIME</td><td align ="right">${this.loadedorder.date}</td></tr>
      </table>
      <hr>
      <table style="width:100%">
      <tr><td align ="left">Reciever Name</td><td align ="right">${this.loadedorder.name}</td></tr>
      <tr><td align ="left">Address</td><td align ="right">${this.loadedorder.address}</td></tr>
      <tr><td align ="left">Phone No</td><td align ="right">${this.loadedorder.phno}</td></tr>
      <tr><td align ="left">Email</td><td align ="right">${this.loadedorder.email}</td></tr>
      <tr><td align ="left">Payment Method</td><td align ="right">${this.loadedorder.paymenttype}</td></tr></table>
      <hr><table style="width:100%"><tr><td align ="left">Product Name</td><td align ="center">Qty</td><td align ="right">Sub Total</td></tr>`)
      for(let i in this.loadedorder.cart){

        myWindow.document.write(`<tr><td align ="left">${this.loadedorder.cart[i].productname}</td>
        <td align ="center">${this.loadedorder.cart[i].cquantity}</td>
        <td align ="right">$${parseInt(this.loadedorder.cart[i].productprice)*this.loadedorder.cart[i].cquantity}</td></tr>`)
      }

     
      myWindow.document.write(`</table><hr><table style="width:100%"><tr><td align ="left">Total Items</td><td align="right">${this.loadedorder.totalitem}</td></tr>
      <tr><td align ="left">Total Amount</td><td align="right">$${this.loadedorder.totalprice}</td></tr>
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
<style scoped>
</style>