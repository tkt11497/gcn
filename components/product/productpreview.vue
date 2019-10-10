<template>
      <v-card
    width="400" 
    class="mx-auto" 
  >
  <!-- v-if="item.productprice<=$store.state.maximum" -->
    <v-row
      class="py-4 pl-4"
    >
      <v-col class="shrink">
          <nuxt-link v-bind:to="productlink">
        <v-img
          height="200"
          width="200"
          v-bind:src="img"
        ></v-img>
          </nuxt-link>
      </v-col>
      <v-col class="text-center">
        <v-container class="pa-0">
          <v-row>
        <v-card-title class="headline">
          {{productname}}
        </v-card-title>
          </v-row>

        <v-row>
        <v-card-text>
          Price:{{productprice}}$
        </v-card-text>
          </v-row>

        <v-row>
        <v-card-text>
          in Stock{{stock}}
        </v-card-text>
        </v-row>

        <v-row>
        <v-card-text>
          Description{{productdetail}}
        </v-card-text>
        </v-row>
        <v-row>
         <v-card-actions>
          <v-btn color="primary" v-on:click="$emit('addingitem')">
            add item
          </v-btn>
        </v-card-actions>
        </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-card>









</template>
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