<template>
<v-app>
    <v-card width="550" class="mx-auto mt-5" >
    <v-card-title>
        Add Product
    </v-card-title>
    <form class="ma-5">
      <v-text-field
        v-model="product.productname"
        label="Product Name"
        required
      ></v-text-field>
      <v-text-field
        v-model.number="product.productprice"
        label="Price"
        required
      ></v-text-field>
    <v-text-field
        v-model.number="product.stock"
        label="Stock"
        required
      ></v-text-field>
    <v-text-field
        v-model="product.productdetail"
        label="Product Detail"
        required
      ></v-text-field>
      <v-text-field
        v-model="product.img"
        label="Image Url"
        placeholder="You can type Url or By Uploading Image, it will give u a Url"
        required
      ></v-text-field>
       <v-file-input show-size label="Select Image" v-model="img" accept="image/*" @change="filepicked(img)"></v-file-input>
      <v-btn v-on:click="uploadimg(img)">Upload Image</v-btn>
    <img :src="image" widht="200" height="200"/>
      <v-select
        :items="items"
        label="Item"
        required
      ></v-select>
      <v-btn class="mr-4" @click="add">add</v-btn>
      <v-btn class="mr-4" @click="update">update</v-btn>
      <v-btn class="mr-4" @click="deleteitem">delete</v-btn>
      <v-btn @click="cancel">cancel</v-btn>
    </form>
    </v-card>
</v-app>
</template>
<script>
import axios from 'axios'
import {firebase} from '~/plugins/firebase.js'
  export default {
     props:{
        existingproduct:{
            type:Object,
            required:false
        }
    },
data(){
        return{
           product:this.existingproduct ?{...this.existingproduct}:{
                productname:'',
                productprice:'',
                img:null,
                stock:0,
                productdetail:''
            },
            items:['item1','item2','item3'],
            image:'',
            img:null
        }
    },

    computed: {
      
    },
    methods: {
        add:function (){
            //save the post
            this.$emit('add',this.product)
        },
        deleteitem(){
            this.$emit('delete',this.product)
        },
        update(){
          this.$emit('update', this.product)
        },
        cancel(){
            //cancel the post
            this.$router.push('/admin');
        },
        filepicked(img){
          const filereader= new FileReader()
           filereader.addEventListener('load',()=>{
           this.image=filereader.result
          })
           if(img==null){return}
          filereader.readAsDataURL(img)
        },
        uploadimg(img){
          if(img==null){return}
           var storageRef = firebase.storage().ref('images/'+ img.name); 
		      var uploadTask = storageRef.put(img); 
		      uploadTask.then(()=> { return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{ return downloadURL}) 
                    }).then(url=>this.product.img=url)
        }
        
    }
  }
</script>