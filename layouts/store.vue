<template>
  <v-app>
   <div class="fb-customerchat"
 page_id="108481103963063">
</div>
        <v-toolbar
        clipped-left
        fixed
        app 
        class="no-print" 
        color='#283E4A' 
        dark 
        min-height="65" 
        max-height="65">
      <v-toolbar-title>{{$store.getters.title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
         <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to" 
          active-class="blue" 
          text
          router
          exact
        >
         
            <v-icon color="white">{{ item.icon }}</v-icon>
          
          <span>{{item.title}}</span>
        </v-btn>

      </v-toolbar-items>

    </v-toolbar>
  
      
                          <v-content>
                        <nuxt />
                          </v-content>

    <!-- <v-footer
      :fixed="fixed"
      app 
      class="no-print"
    >
      <span>&copy; 2019</span>
    </v-footer> -->

      <v-menu
    :close-on-content-click="true"
    bottom
    left
    min-width="270"
    max-width="270"
    nudge-right="12"
    offset-x
    transition="slide-y-transition"
    
  > 
   
   <template v-slot:activator="{ on }">
        <v-btn
      class="elevation-2 caption"
      color="indigo"
      dark
      fab 
      right
      fixed
      style="top: 156px;"
      top 
      text
       v-on="on"
    >
      <v-icon size="35">shopping_cart</v-icon>{{$store.getters.totalitem}}
    
    </v-btn>
      </template>
    <v-card>
      <v-container grid-list-xl>
        <v-layout wrap row justify="center" class="text-center">
          <v-flex xs12 class="indigo white--text">
            <div class="text-xs-center body-2 text-uppercase sidebar-filter white--text">Total items : {{$store.getters.totalitem}}</div>
            
             <div class="text-xs-center body-2 text-uppercase sidebar-filter white--text">Total Price : {{$store.getters.totalprice}}</div>

         
           
          </v-flex>
           
          <v-flex
            xs12 
          >
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">Items</div>
      <v-list dense>
        <v-list-item
          v-for="(it) in $store.getters.cart"
          :key="it.id" 
          
          
        >
          <v-list-item-action>
             <v-icon v-on:click="rmitem(it)" color="#283E4A">remove_circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
             {{it.productname}}({{it.cquantity}})
          </v-list-item-content>
          <v-list-item-avatar>
          <v-img :src="it.img"></v-img>
        </v-list-item-avatar>
        </v-list-item>
      </v-list>
          </v-flex>
         
          
          <v-flex xs12>
           
            <v-btn color="indigo" @click="gotocheckout" class="white--text" block>
            Go to Cart
      </v-btn>
          </v-flex>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase">
              <div class=" sidebar-filter">
                Thank You for Sharing!
              </div>

              <div>
                <v-btn
                  color="indigo"
                  class="mr-2 v-btn-facebook"
                  fab
                  icon
                  small
                  rounded
                >
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                  color="cyan"
                  class="v-btn-twitter"
                  fab
                  icon
                  small
                  rounded
                >
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    
  </v-menu>
  </v-app>
</template>
<style scoped>
@media print{
  .on-print{
    display: block;
  }
  .no-print{
    display: none;
  }
}
</style>
<script>
export default {
  data () {
    return {
         items: [
        {
          icon: 'store',
          title: 'Store',
          to: `/public/${this.$store.getters.currentloginname}`
        },
        {
          icon: 'mdi-cart',
          title: 'Cart',
          to: '/checkout'
        },
    

      ],
    }
    
  },
  methods: {
    rmitem(citem){
      this.$store.dispatch('rmcitem',citem)
    },
    gotocheckout(){
      console.log('goingcheckout')
      this.$router.push('/checkout')
    }
  },

}
</script>
