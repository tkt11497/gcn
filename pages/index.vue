<template>

<v-container fluid class="pa-0" v-on:keydown.13="doSearch">
  <div class="fb-customerchat"
 page_id="108481103963063">
</div>

        <!-- <v-carousel height="300">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>  -->
<v-row>
  <v-col md="3" sm="12">
     <v-text-field
        append-icon="close"
        class="mx-4"
        flat
        hide-details 
        v-model="text"
        label="Search"
        prepend-inner-icon="search" 
        @click:prepend-inner="doSearch" 
        @click:append="cancelsearch"
        
        color="indigo"
      ></v-text-field>

  </v-col>   
</v-row>
      <productlist v-bind:product="loadedproduct" v-on:addingcitem="addingcitem"></productlist>






  
 </v-container>


</template>

<script>
import productlist from '~/components/product/productlist'
import {
  mapActions as mapSearchActions,
  mapGetters as mapSearchGetters,
  getterTypes,
  actionTypes,
} from 'vuex-search';

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
      text: ''
    }
  },
  components: {
    productlist
  },
  computed: {
    ...mapSearchGetters('loadedproduct', {
    resultIds: getterTypes.result,
    isLoading: getterTypes.isSearching,
  }),
    loadedproduct(){
      return this.$store.getters.loadedproduct.filter((product)=>this.resultIds.includes(product.id))
    }
  },
  methods: {
        ...mapSearchActions('loadedproduct', {
    searchContacts: actionTypes.search,
  }),
    addingcitem(item){
    this.$store.dispatch('addingcitem',item)

    },
    // gotocheckout(){
    //   this.show=!this.show
    // }
  
  doSearch() {
    this.searchContacts(this.text);
  },
  cancelsearch() {
    this.text=""
    this.searchContacts(this.text);
  },
  },
  created(){
  }
  
}
</script>
