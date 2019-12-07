<template>
     <v-card 
     class="elevation-12" max-width="304" 
     >
    
       <v-card-subtitle>
           <v-row>
           <v-col cols="6" class="pa-0">Total Paid<v-text-field v-model.number="paid" dense></v-text-field></v-col>
           <v-col cols="6" class="pa-0">Change<v-text-field v-model="change" disabled dense></v-text-field></v-col>
           </v-row>
       </v-card-subtitle>
      <v-card-text>
            <v-row>
         <v-col cols="6">
           Total-price : {{totalprice}}
         </v-col>
         <v-col cols="6">
           Total-Items : {{totalitem}}
         </v-col>
       </v-row>
       <v-row class="ma-0 pa-0">
         
         <v-col cols="6" class="text-center pa-0" >Item</v-col>
         <v-col cols="6" class="text-center pa-0">Price</v-col>
         <v-divider/>
       </v-row>
          <v-row v-for="item in cart" :key="item.id">
        
         <v-col cols="6" class="text-center pa-0">{{item.productname}} x{{item.cquantity}}</v-col>
         <v-col cols="6" class="text-center pa-0">{{Number(item.productprice)*item.cquantity}}</v-col>
       </v-row>
       <v-row>
         <v-col cols="6">
           <v-btn color="indigo" dark @click="printv">
                Print
            </v-btn>
         </v-col>
         <v-col cols="6">
           <v-btn color="indigo" dark @click="newsale">
               New Sale
            </v-btn>
         </v-col>
       </v-row>
      </v-card-text>
    </v-card>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            paid:0,
             date: new Date().toISOString().substr(0, 10),
            
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
        change(){
            return this.paid-this.totalprice
        },
        totalitem(){
            return this.$store.getters.totalitem
        },
},
methods:{
    newsale(){
        console.log(this.totalitem)
        if(this.totalitem==0){return}
        axios.post('https://stecomlikepos.firebaseio.com/'+this.$store.state.currentloginname+'/receipts.json', 
        {date:this.date,paid:this.paid,change:this.change,cart:this.cart,totalprice:this.totalprice,totalitem:this.totalitem})
        .then(
                    (result) => {
                       
                       
                       this.$store.dispatch('clearcart')
                        this.$emit('cancel')
                    }
                ).catch((err) => console.log(err))
       
        
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
      </table>`);
       myWindow.document.write(`<hr><table style="width:100%"><tr><td align ="left">Total Paid</td><td align="right">${this.paid}</td></tr>
      <tr><td align ="left">Change</td><td align="right">${this.change}</td></tr>
      </table></body></html>`);
			myWindow.document.close(); 

			myWindow.onload=function(){ 

				myWindow.focus(); 
				myWindow.print();
				myWindow.close();
			};
		}

}
}
</script>