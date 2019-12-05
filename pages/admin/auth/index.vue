<template>


 
      <v-container
        fluid
        fill-height
        v-on:keydown.13="onsubmit" 
        
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="indigo"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    label="Login With Email"
                    name="login"
                    prepend-icon="mdi-account-circle"
                    type="text"
                    v-model="email" 
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
                    v-model="password" 
                    :rules="passwordRules" 
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo" type="submit" id="btn1" v-on:click="onsubmit" dark>Login</v-btn>
                <v-btn color="indigo" dark>sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
         <v-snackbar v-model="snackbar" :timeout="5000" top color="red" :auto-height="true" :auto-width="true">
      <span> {{$store.getters.errormsg}} !!!</span>
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
      </v-container>
      

</template>
<script>
export default {
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
            email:'',
            password:'',
           
        }
        
    },
    methods: {
        onsubmit(){
      console.log('submitting')
      this.$store.dispatch('authmethod',{
        isLogin:this.isLogin,
        email:this.email,
        password:this.password
      }).then(
        (res)=>{
          this.snackbar=true
          this.$router.push('/admin') 
        }
      )
     
    },

    // enterkeypress(e){
    //   if(e.keyCode=="13"){

    //     document.getElementById('btn1').click()
    //   }
    // }
    },
}
</script>