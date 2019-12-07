<template>
<v-app>
    <v-card width="550" class="mx-auto mt-5">
    <v-card-title v-if="!existingproduct">
        Create Item
    </v-card-title>
      <v-card-title v-else>
        Edit Item
    </v-card-title>
    <v-form class="ma-5" v-model="valid" ref="form">
      <v-text-field
        v-model="product.productname"
        label="Product Name" 
        color="indigo"
        required 
        :rules="requireRule"
      ></v-text-field>
      <v-text-field
        v-model.number="product.productprice"
        label="Price" 
        color="indigo"
        required 
        :rules="numrules"
      ></v-text-field>
    <v-text-field
        v-model.number="product.stock"
        label="Stock" 
        color="indigo"
        required 
        :rules="requireRule"
      ></v-text-field>
    <v-text-field
        v-model="product.productdetail"
        label="Product Detail"
        required 
        :rules="requireRule"
        color="indigo"
      ></v-text-field>
      <v-text-field
        v-model="product.img"
        label="Image Url"
        placeholder="You can type Url or By Uploading Image, it will give u a Url"
        required 
        :rules="requireRule"
        color="indigo"
      ></v-text-field>
       <v-file-input show-size label="Select Image" v-model="img" accept="image/*" @change="filepicked(img)" 
       append-icon="cloud_upload" 
       @click:append="uploadimg(img)"></v-file-input>
      <v-row justify="center">
    <img :src="image" widht="200" height="200"/>
      </v-row>
      <v-card-actions>
      <v-btn class="mr-4" @click="add" v-if="!existingproduct" dark color="indigo">Save</v-btn>
      <v-btn class="mr-4" @click="update" v-if="existingproduct" dark color="indigo">Save</v-btn>
      <v-btn class="mr-4" @click="deleteitem" dark color="indigo">delete</v-btn>
      <v-btn @click="cancel" dark color="indigo">cancel</v-btn>
      </v-card-actions>
    </v-form>
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
            img:null,
            valid:false,
            requireRule: [
      v => !!v || 'This field is required'],
            numrules: [
            v => !!v || 'This field is required',
            v => typeof v =="number" || 'Price must be number',
          ],
        }
    },

    computed: {
      
    },
    methods: {
        add:function (){
            //save the post
            if (this.$refs.form.validate()) {
            this.$emit('add',this.product)
            }
        },
        deleteitem(){
            this.$emit('delete',this.product)
        },
        update(){
          if (this.$refs.form.validate()) {
          this.$emit('update', this.product)
          }
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