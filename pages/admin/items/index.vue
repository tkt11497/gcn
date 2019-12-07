<template>

<v-container fluid class="pa-0" v-on:keydown.13="doSearch">

<v-row>
  <v-col md="3" sm="12">
     <v-text-field
        append-icon="search"
        class="mx-4"
        flat
        hide-details 
        v-model="text"
        label="Search"
        prepend-inner-icon="close" 
        @click:prepend-inner="cancelsearch" 
        @click:append="doSearch"
        
        color="indigo"
      ></v-text-field>

  </v-col> 
  <v-col md="3" sm="12">
      
       <v-file-input show-size label="Import items with Excel File" v-model="excel"  prepend-icon="mdi-folder-open" 
       append-icon="cloud_upload" 
       @click:append="handleFile(excel)"
       ></v-file-input>
  </v-col>
    
</v-row>
 <!-- <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Left</v-btn>
      </template>
      <span>Left tooltip</span>
    </v-tooltip> -->
    <v-tooltip left color="blue" dark>
         <template v-slot:activator="{ on }">
  <v-btn
      class="elevation-2 caption"
      color="green"
      dark
      fab 
      right
      fixed
      style="top: 290px;"
      top 
      v-on="on"
      v-on:click="$router.push('/admin/new-post')"
    ><v-icon>mdi-plus</v-icon></v-btn>
    </template>
    <span class="white--text">Add new item</span>
     </v-tooltip>
     <v-tooltip left color="blue" dark>
         <template v-slot:activator="{ on }">
    <v-btn     
    class="elevation-2 caption"
    color="blue"
    dark
    fab 
    right
    fixed 
    v-on="on"
    style="top: 347px;"
    top 
    @click="jtosheet"><v-icon>cloud_download</v-icon></v-btn>
    </template>
    <span class="white--text">Current Stock</span>
     </v-tooltip>
      <productlist isadmin v-bind:product="loadedproduct" v-on:addingcitem="addingcitem"></productlist>






  <v-row><v-col cols="12"></v-col></v-row>
 </v-container>


</template>

<script>
import productlist from '~/components/product/productlist'
import axios from 'axios'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver' 
import {
  mapActions as mapSearchActions,
  mapGetters as mapSearchGetters,
  getterTypes,
  actionTypes,
} from 'vuex-search';

export default {
    middleware:['checkauth','auth'],
      asyncData(context) {

                return axios.get("https://stecomlikepos.firebaseio.com/"+context.store.state.currentloginname+"/product.json")
                    .then((res) => {
                        const productarray = []
                        for (const key in res.data) {
                            productarray.push({...res.data[key], id: key })
                            console.log(process.env.fbapikey)
                        }
                        context.store.commit('settitle', 'Items')
                        context.store.commit('setproduct', productarray)
                    })
                    .catch((e) => { context.error(e) })
            },
  data(){
    return{
      text: '',
      excel:null,
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
   jtosheet(){
      const fileName = 'balance.xlsx';

    		const ws= XLSX.utils.json_to_sheet(this.loadedproduct);
     		const wb = XLSX.utils.book_new();
    		XLSX.utils.book_append_sheet(wb, ws, 'test');

    		XLSX.writeFile(wb, fileName);
    
    },
         handleFile(e) {
       if(e==null){return}
        let f = e;
        let reader = new FileReader();
        let stream=null
        reader.addEventListener('load',(e)=>{
           let data = new Uint8Array(e.target.result);
          let workbook = XLSX.read(data, {type: 'array'});
          console.log(workbook)
         workbook.SheetNames.forEach((sheetname)=>{
           stream = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname], {raw:true})
         })
         console.log(stream)

  

         for(let i in stream){
         this.$store.dispatch('addproduct',stream[i])
         }
          })

          reader.readAsArrayBuffer(f);
          
        },

  },
  created(){
  }
  
}
</script>
