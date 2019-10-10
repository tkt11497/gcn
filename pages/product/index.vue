<template>

      <v-container>
         <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-spacer/>

      <productlist v-bind:product="loadedproduct" v-on:addingcitem="addingitem"></productlist>






    </v-flex>
  </v-layout>
      </v-container>

   
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import productlist from '~/components/product/productlist'

export default {
  components: {
    Logo,
    VuetifyLogo,
    productlist
  },
  computed: {
    loadedproduct(){
      return this.$store.getters.loadedproduct
    }
  },
  methods: {
    addingitem(item){
    this.$store.dispatch('addingcitem',item)

    },
    // gotocheckout(){
    //   this.show=!this.show
    // }
  },

  
}
</script>