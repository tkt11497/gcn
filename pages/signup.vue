<template>

      <v-container
        fluid
        v-on:keydown.13="onsubmit" 
        id="bg" 
       >
      <v-row justify="center">
          <v-flex
            sm12
            md4 
            offset-md="6"
          >
            <v-card tile shaped>
              <!-- <v-toolbar
                color="indigo"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar> -->
              <v-form v-model="valid" @submit.prevent="onsignup" ref="form">
              <v-card-text>
                
                  <v-text-field
                    label="Sign up With Email"
                    name="login"
                    prepend-icon="mdi-account-circle"
                    type="text"
                    v-model="email1" 
                    :rules="emailRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    v-bind:append-icon="showpassword ? 'mdi-eye':'mdi-eye-off'"
                    v-bind:type="showpassword ? 'text':'password'"
                    v-on:click:append="showpassword=!showpassword"
                    v-model="password1" 
                    :rules="passwordRules" 
                    required
                  ></v-text-field>
                
              </v-card-text>
              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="indigo" type="submit" id="btn1" dark block>Register</v-btn>
               
              </v-card-actions>
               </v-form>
            </v-card>
          </v-flex>
      </v-row>

         

       
         <v-snackbar v-model="snackbar" :timeout="5000" top color="red" :auto-height="true" :auto-width="true">
      <span> {{$store.getters.errormsg}} !!!</span>
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
      </v-container>
      

</template>

<script>
export default {
   layout:'public',
   created(){
        this.$store.commit('settitle','Register')
        console.log(this.$router.back)
    },
  mounted() {
    //window.addEventListener("keydown",this.enterkeypress,false)
  },
    data(){
        return{
            showpassword:false,
            valid:false,
            emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be atleast 6 characters',
    ],
           snackbar:false,
            isLogin: true,
            email1:'',
            password1:'',
           
        }
        
    },
    computed:{
    
    
    },
    methods: {
     
      onsignup(){
         if (this.$refs.form.validate()) {
      console.log('submitting')
      this.$store.dispatch('authmethod',{
        isLogin:!this.isLogin,
        email:this.email1,
        password:this.password1
      }).then(()=>{this.snackbar=true})
         }
     
    },
    

    // enterkeypress(e){
    //   if(e.keyCode=="13"){

    //     document.getElementById('btn1').click()
    //   }
    // }
    },
}
</script>
