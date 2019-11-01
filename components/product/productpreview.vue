<template>
      <!-- <v-card
    width="400" 
    class="mx-auto" 
  >
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
 -->


      <v-hover v-slot:default="{ hover }">
        <v-flex xs12 sm8 md3 class="ma-2">
      
            <v-card :color="'#952175'" dark>
              <v-expand-transition>
           <nuxt-link v-bind:to="productlink">  <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out indigo darken-1 v-card--reveal display-2 white--text pl-1"
              style="height: 100%;"
            >
            In Stock {{stock}}
            </div>
           </nuxt-link>
          </v-expand-transition>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="productname"></v-card-title>
                  <v-card-subtitle v-text=" `Price:${productprice}Kyats`"></v-card-subtitle>
                   <v-card-text>
          Description {{productdetail}}
        </v-card-text>
                </div>
  
                <v-avatar class="ma-3" size="125" >
                  <v-img :src="img"></v-img>
                </v-avatar>
              </div>
              <v-card-actions>
               <v-btn color="primary" v-on:click="$emit('addingitem')">
            add item
          </v-btn>
              </v-card-actions>
            </v-card>
          
    </v-flex>
     </v-hover>




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