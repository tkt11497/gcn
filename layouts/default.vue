<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app 
      class="no-print"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="indigo">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app 
      class="no-print" 
      color='indigo' 
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
            {{$store.getters.totalitem}}
        <v-icon>mdi-cart</v-icon>
    
      </v-btn>
    </v-app-bar>
      
                          <v-content>
                        <nuxt />
                          </v-content>



   <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed class="no-print" color="indigo" dark>


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
     
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app 
      class="no-print"
    >
      <span>&copy; 2019</span>
    </v-footer>
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
