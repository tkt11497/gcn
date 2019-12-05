<template>
  <v-app>
   <div class="fb-customerchat"
 page_id="108481103963063">
</div>

    <v-navigation-drawer
      v-model="drawer" 
      v-show="!$vuetify.breakpoint.smAndDown" 
      app
      fixed 
      expand-on-hover  
      clipped
      class="no-print" 
      dark
      color="#283E4A"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to" 
          active-class="blue"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app 
      class="no-print" 
      color='#283E4A' 
      dark
    >
      
      <v-btn
        icon
        @click.stop=" drawer=!drawer" 
         v-show="!$vuetify.breakpoint.smAndDown"
      >
        <v-icon>list</v-icon>
      </v-btn> 

      <v-spacer />
    
    </v-app-bar>
      
                          <v-content>
                        <nuxt />
                          </v-content>



   <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed class="no-print" color="#283E4A" dark>


      <v-list>
        <v-list-item @click.native="right = !right" color="indigo">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-icon>mdi-cart</v-icon>
          <v-list-item-title>Cart ({{$store.getters.totalitem}})</v-list-item-title>

        </v-list-item>
        <v-divider />

     
      <v-list-item>Total Price:{{$store.getters.totalprice}}$</v-list-item>
      
      <v-list-item>Total Selected Item:{{$store.getters.totalitem}}</v-list-item>
      <v-divider />
     
        



      
      <v-list-item v-for="it in $store.getters.cart" v-bind:key="it.id">

         <v-icon v-on:click="rmitem(it)">remove</v-icon>&nbsp
        {{it.productname}}({{it.cquantity}})
       

      </v-list-item>
      <v-divider/>
      <v-list-item-action>
        
       <v-btn color="indigo" class="lighten-3" v-on:click="gotocheckout">
            Go to Cart
      </v-btn>
      </v-list-item-action>
      </v-list>
     
    </v-navigation-drawer> -->
    <v-bottom-navigation 
    v-show="$vuetify.breakpoint.smAndDown"
    dark
    shift 
    background-color="#283E4A"
    app 
    fixed 
  >
      
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to" 
          active-class="blue"
          router
          exact
        >
         
            <v-icon color="white">{{ item.icon }}</v-icon>
          
          <span>{{item.title}}</span>
        </v-btn>
      
  </v-bottom-navigation>
    <!-- <v-footer
      :fixed="fixed"
      app 
      class="no-print"
    >
      <span>&copy; 2019</span>
    </v-footer> -->



      <v-menu
    :close-on-content-click="false"
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
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'store',
          title: 'Products',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
         {
          icon: 'mdi-chart-bubble',
          title: 'CheckOut',
          to: '/checkout'
        },
            {
          icon: 'dashboard',
          title: 'admin',
          to: '/admin'
        }

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      
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
