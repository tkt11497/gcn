<template>
     
      <v-col md="3" sm="12">
         
      <v-hover v-slot:default="{ hover }">
  <v-card>
    <v-img
      class="indigo--text align-end"
      height="200px"
      :src="img"
    >
      
    </v-img>
    <v-card-title>{{productname}}</v-card-title>
    <v-card-subtitle class="text--primary">Price: {{productprice}} Kyats Stock: {{stock}}</v-card-subtitle>

    <v-card-text class="text--primary">
      {{productdetail}}
    </v-card-text>
      <v-flex xs12>
           
       <v-card-actions v-if="!isadmin">
      <v-btn
        color="indigo"
        :text="!hover" 
        block 
        v-on:click="$emit('addingitem')"
      >
        ADD TO CART
      </v-btn>
      

    
    </v-card-actions>
    <v-card-actions>
    <v-btn v-if="isadmin" @click="$router.push(productlink)" color="indigo" block dark><v-icon>edit</v-icon></v-btn>
    </v-card-actions>
          </v-flex>
   
  </v-card>
      </v-hover>
         
      </v-col>


</template>
<style scoped>
.v-card--reveal {
align-items: center;
bottom: 0;
justify-content: right;
opacity: .5;
position: absolute;
width: 100%;
}
li a {
    text-decoration: none;
}
</style>
<script>
export default {
    computed: {
      productlink: function(){
        return this.isadmin 
        
        ? '/admin/'+ this.id :'product/'+this.id
      }
    },
    props:{
        id :{
            type: String,
            required: true
        },
        isadmin:{
          type: Boolean,
          required: true
        },
        productname: {
            type: String,
            required: true
        },
        productprice:{
            type: Number,
            required: true
        },
        stock:{
            type: Number,
            required: true
        },
        productdetail:{
            type: String,
            required: true
        },
        img:{
            type: String,
            required: true
        }


    }
}
</script>