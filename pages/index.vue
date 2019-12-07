<template>
<v-container fluid pa-0 ma-0>
  <v-img
    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  >
 <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-bold mb-4 white--text">Pocket Pos + Ecom</h1>
        <h4 class="subheading white--text">Innovate your home-backyard shop today!</h4>
      </v-col>
    </v-row>
     <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <v-row justify="center" class="mb-1">
        <v-btn large color="#C9F363" rounded  @click="$router.push('/signup')" >Register</v-btn>
        </v-row>
        <v-row justify="center" class="mt-1">
     <v-btn large color="#C9F363" rounded  @click="$router.push('/admin/auth')">Login</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-img>
   <v-img
    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
     v-show="$vuetify.breakpoint.smAndDown"
  />
  <v-img
    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" 
    v-show="$vuetify.breakpoint.smAndDown"
  />
</v-container>
</template>
<script>
export default {
    layout:'public',
    created(){
        this.$store.commit('settitle','Home')
    },
}
</script>