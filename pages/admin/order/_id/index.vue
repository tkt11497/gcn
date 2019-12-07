<template>
    <v-container>

             <v-data-table
    :headers="headers"
    :items="[...loadedorder]"
    class="elevation-1" 
    disable-sort 
    hide-default-footer
  >
   <template v-slot:item.deliverystatus="{ item }">
       <v-select :items="items" v-model="loadedorder.deliverystatus"/>
        </template>
  </v-data-table>
  <v-divider/>
     <v-data-table
    :headers="headers1"
    :items="loadedorder.cart"
    class="elevation-1" 
    disable-sort
  >
  
     <template v-slot:item.Sub-total="{ item }">
        {{Number(item.productprice)*item.cquantity}}
        </template>
        
     <v-btn @click="save" color="indigo" dark class="pa-1 ma-1" block slot="footer"><v-icon>done</v-icon></v-btn>
    <v-btn @click="deleteorder" color="indigo" dark class="pa-1 ma-1" block slot="footer"><v-icon>delete</v-icon></v-btn>
  </v-data-table>
  
  <v-row>
    <v-col md="6" sm="12"><h5 class="indigo--text">Total Items:{{loadedorder.totalitem}}</h5></v-col>
      <v-col md="6" sm="12"><h5 class="indigo--text">Total Amount to Pay: {{loadedorder.totalprice}}</h5></v-col>
  </v-row>
   <v-tooltip left color="blue" dark>
         <template v-slot:activator="{ on }">
  <v-btn
      class="elevation-2 caption"
      color="green"
      dark
      fab 
      right
      fixed
      style="top: 290px;"
      top 
      v-on="on"
      v-on:click="printf"
    ><v-icon>local_printshop</v-icon></v-btn>
    </template>
    <span class="white--text">Print voucher</span>
     </v-tooltip>
     <v-tooltip left color="blue" dark>
         <template v-slot:activator="{ on }">
    <v-btn     
    class="elevation-2 caption"
    color="blue"
    dark
    fab 
    right
    fixed 
    v-on="on"
    style="top: 347px;"
    top 
    title="leelar"
    @click="exceldownload"><v-icon>cloud_download</v-icon></v-btn>
    </template>
    <span class="white--text">Download Voucher as Sheet</span>
     </v-tooltip>
 
   
 







    <table class="table table-hover table-bordered" id="table1" v-show="false">
      <thead>
        <tr>
          <th scope="col" class="text-primary">Name</th>
          <th scope="col" class="text-right text-primary">Address</th>
          <th scope="col" class="text-right text-primary">Phone Number</th>
          <th scope="col" class="text-right text-primary">Email</th>
          <th scope="col" class="text-right text-primary">Payment Method</th>
          <th scope="col" class="text-center text-primary">Order Date</th>
          <th scope="col" class="text-center text-primary">Processing Status</th>
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
           <td class="text-right"><v-select :items="items" v-model="loadedorder.deliverystatus"></v-select></td>
        </tr>
        <tr><td colspan="7" ></td></tr>
        <tr>
          <th scope="col" class="text-primary" ></th>
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
   
     <v-row justify="center">
        <h5 class="text-primary">Location: To Deliver</h5>
     </v-row>
    <v-row justify="center">
    <div id="gmap1" style="width:300px;height:300px"></div>
    </v-row>
    </v-container>
</template>
<script>
import axios from 'axios'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
export default {
    middleware:['checkauth','auth'],
      mounted() {
          let element = document.getElementById( 'gmap1' )
  let mapoptions = {
	zoom: 17,
		 center : {	lat: parseFloat(this.loadedorder.lat),	lng: parseFloat(this.loadedorder.long)},
	disableDefaultUI: false, 
	scrollWheel: true, 
    draggable: true, }
   let map = new google.maps.Map( element, mapoptions )
	  let marker = new google.maps.Marker({
	position: mapoptions.center,
		map: map,
		draggable: false
   })


    },
  data(){
    return{
     items:['To be Confirmed','Confirmed(On Going)','Delivered'],
      headers:[
           {
            text: 'Name',
            sortable: false,
            value: 'name',
          },
          { text: 'Address', value: 'address' },
          { text: 'Phone Number', value: 'phno' },
          { text: 'Email', value: 'email' },
          {text:'Payment Method',value:'paymenttype'},
          { text: 'Order Date', value: 'date' },
          {text:"Processing Status",value:"deliverystatus"}
          
        ],
        headers1:[
          { text: 'Item', value: 'productname' },
          { text: 'Qty', value: 'cquantity' },
          { text: 'Price', value: 'productprice' },
          { text: 'Sub-total', value: 'Sub-total' },
        ]
    }
  },
    asyncData(context) {
    return axios.get('https://stecomlikepos.firebaseio.com/'+context.store.state.currentloginname+'/order/'+context.route.params.id+'.json')
    .then((res)=>{
      console.log(res.data)
      context.store.commit('settitle', 'Order Detail')
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
      save(){
          
          this.$store.dispatch('updateorder',{...this.loadedorder,id:this.$route.params.id})
          .then(()=>{alert('Successfully Saved')
          this.$router.push('/admin/order')})
      },
      deleteorder(){
          
          this.$store.dispatch('deleteorder',{...this.loadedorder,id:this.$route.params.id})
          .then(()=>{alert('Successfully Deleted')
          this.$router.push('/admin/order')})
      },
      		
		printf() 
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