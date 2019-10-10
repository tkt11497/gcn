<template>

<v-container fluid class="pa-0">
        <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>

     
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
  
     

      <productlist v-bind:product="loadedproduct" v-on:addingcitem="addingcitem"></productlist>






    </v-flex>
  </v-layout>
 </v-container>


</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import productlist from '~/components/product/productlist'

export default {
  data(){
    return{
     items: [
        {
          src: 'https://backgroundcheckall.com/wp-content/uploads/2017/12/background-fashion-hd.jpg',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/stecomlikepos.appspot.com/o/images%2Fchristian_louboutin_mens_shoes_red_yellow_background-wallpaper-1280x800%20(1).jpg?alt=media&token=824c84e4-02ef-45f5-88ea-6cd101d42211',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/stecomlikepos.appspot.com/o/images%2Fchristian_louboutin_mens_shoes_black_red_background-wallpaper-1280x800.jpg?alt=media&token=21c70734-68af-47df-8263-49279b62cd21',
        },
      
      ],
    }
  },
  components: {
    productlist
  },
  computed: {
    loadedproduct(){
      return this.$store.getters.loadedproduct
    }
  },
  methods: {
    addingcitem(item){
    this.$store.dispatch('addingcitem',item)

    },
    // gotocheckout(){
    //   this.show=!this.show
    // }
  },

  
}
</script>
