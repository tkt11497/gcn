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

        <v-flex xs12 sm8 md3 class="ma-2">
         
          <material-stats-card
            color="#002C6D"
            icon="receipt"
            :value="`Receipt`"
            title="Sales">
            <v-btn @click="$router.push('/admin/receipt')" slot="button" small text color="indigo">Go to Receipt</v-btn>
          </material-stats-card>
          </v-flex>
          <v-flex xs12 sm8 md3 class="ma-2">
          <material-stats-card
            color="green"
            icon="store"
            :value="`Online-Store Link`"
            title="Store" 
            >
          <v-row slot="button" dense>
            <v-col cols=8>
              <v-text-field readonly v-model="message" dense height="19" class="text-truncate"></v-text-field>
            </v-col>
            <v-col cols=4>
                <v-btn 
                x-small 
                color="indigo" 
                dark
                v-clipboard:copy="message"
                v-clipboard:success="onCopy">Copy!
                </v-btn>
            </v-col>
          </v-row>
          </material-stats-card>
        </v-flex>
  
      </v-layout>
    </v-col>



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
      v-on:click="gotostore"
    ><v-icon>store</v-icon></v-btn>
    </template>
    <span class="white--text">Go to Store</span>
     </v-tooltip>


    <v-snackbar v-model="snackbar" :timeout="5000" top color="success">
      <span>Welcome {{$store.getters.currentloginname}} !!!</span>
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  
  
    
      
     
   
</v-container>
</template>
<script>

import productlist from '@/components/product/productlist';
import axios from 'axios'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver' 
export default {
    middleware:['checkauth','auth'],
      asyncData(context) {

                return axios.get("https://stecomlikepos.firebaseio.com/"+context.store.state.currentloginname+"/product.json")
                    .then((res) => {
                        const productarray = []
                        for (const key in res.data) {
                            productarray.push({...res.data[key], id: key })
                            console.log(process.env.fbapikey)
                        }
                        context.store.commit('setproduct', productarray)
                        context.store.commit('settitle', 'Dashboard')
                    })
                    .catch((e) => { context.error(e) })
            },
    data(){
      return{
      
        snackbar:true
      }
    },
    components:{
      
    },
     computed:{
    loadedproduct(){
      return this.$store.getters.loadedproduct
    },
    message(){
      return `https://nuxtweb.herokuapp.com/public/${this.$store.state.currentloginname}`
    }
    },
     methods: {
        gotostore () {   
          window.open(this.message);    
      },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    },  
    onCopy (e) {
      alert('You just copied: ' + e.text)
    },
  
}
}
</script>