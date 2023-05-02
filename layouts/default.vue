<template>
  <v-app>
  

                          <v-content>
                        <nuxt />
                          </v-content>



   

    
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
