<template>
  <v-app>

    <v-app-bar
      clipped-left
      fixed
      app 
      class="no-print" 
      color='#283E4A' 
      dark
    >
        
        <v-btn icon class="hidden-xs-only" @click="$router.go(-1)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
      <v-toolbar-title>{{$store.getters.title}}</v-toolbar-title>

      <v-spacer />
    
    </v-app-bar>
      
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
     
    }
    
  },
  methods: {
   
  },

}
</script>
