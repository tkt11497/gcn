<template>
  <v-app>
  

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
 <v-toolbar-title>{{$store.getters.title}}</v-toolbar-title>
      <v-spacer />
    <v-btn text @click="logout">
              <v-icon>mdi-redo</v-icon>Logout
            </v-btn>
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
    class="no-print"
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
          icon: 'dashboard',
          title: 'Dashboard',
          to: '/admin/'
        },
              {
          icon: 'shopping_basket',
          title: 'Sales(POS)',
          to: '/admin/admincart'
        },
        {
          icon: 'mdi-layers',
          title: 'Items',
          to: '/admin/items'
        },
         {
          icon: 'ring_volume',
          title: 'Orders',
          to: '/admin/order'
        },
          {
          icon: 'receipt',
          title: 'Receipts',
          to: '/admin/receipt'
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
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    },  
  },

}
</script>
