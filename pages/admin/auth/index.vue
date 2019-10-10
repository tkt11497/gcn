<template>

 <v-content>
 
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
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account-circle"
                    type="text"
                    v-model="email"
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
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" id="btn1" v-on:click="onsubmit">Login</v-btn>
                <v-btn color="primary">sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>   
</template>
<script>
export default {
  mounted() {
    //window.addEventListener("keydown",this.enterkeypress,false)
  },
    data(){
        return{
            showpassword:false,
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