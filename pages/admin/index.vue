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
  
      </v-layout>
    </v-col>






    <v-snackbar v-model="snackbar" :timeout="5000" top color="success">
      <span>Welcome {{$store.getters.currentloginname}} !!!</span>
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
   
    <v-btn v-on:click="logout">Logout</v-btn>
    
      
     
   
</v-container>
</template>
<script>

import productlist from '@/components/product/productlist';
import axios from 'axios'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver' 
export default {
    middleware:['checkauth','auth'],
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
    }},
     methods: {
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    },  
  
}
}
</script>