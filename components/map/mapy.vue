<template>
    
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Order form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form"> 
                  <v-text-field
                    label="name"
                    name="name"
                    prepend-icon="mdi-account-circle"
                    type="text"
                    v-model="order.name" 
                    :rules="rules"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Phone Number"
                    name="phonenumber"
                    prepend-icon="mdi-phone"
                    type="text"
                    v-model="order.phno" 
                    :rules="rules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Address"
                    name="address"
                    prepend-icon="mdi-home-circle"
                    type="text"
                    id="address"
                    v-model="order.address" 
                    :rules="rules"
                    required
                  ></v-text-field>
                      <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="order.email" 
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-select
                    :items="items"
                    prepend-icon="mdi-truck"
                     label="Payment Type"
                     v-model="order.paymenttype" 
                     :rules="rules"
                    required
                  ></v-select>
                 
                  Pin your exact destination(Zoom-In Map)
                   <div id="gmap" style="width:260px;height:190px"></div> 
           
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo" @click="confirm" dark>Confirm Order</v-btn>
                <v-btn color="indigo" @click="cancel" dark>Cancel</v-btn>
              </v-card-actions>
            </v-card>
</template>
<script>
export default {
    mounted() {
          let element = document.getElementById( 'gmap' );
   let address=  document.getElementById( 'address' );
  let mapoptions = {
	zoom: 14,
		 center : {	lat: 16.789202627998968,	lng: 96.12879285167196},
	disableDefaultUI: false, 
	scrollWheel: true, 
    draggable: true, }
   let map = new google.maps.Map( element, mapoptions )
	  let marker = new google.maps.Marker({
	position: mapoptions.center,
		map: map,
	 	//icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
		draggable: true
   });

  google.maps.event.addListener( marker, "dragend", ( event )=> {

    console.log( 'i am dragged' )
     this.order.long=  marker.getPosition().lng()
    this.order.lat=marker.getPosition().lat()
    })
   let searchBox = new google.maps.places.SearchBox( address )

   google.maps.event.addListener( searchBox, 'places_changed',  (event)=> {
		var places = searchBox.getPlaces(),
			bounds = new google.maps.LatLngBounds(),
			i, place, lat, long, resultArray,
			addresss = places[0].formatted_address;

		for( i = 0; place = places[i]; i++ ) {
			bounds.extend( place.geometry.location );
			marker.setPosition( place.geometry.location );  // Set marker position new.
    }
    	map.fitBounds( bounds );  // Fit to the bound
  map.setZoom( 15 );
   this.order.long=  marker.getPosition().lng()
    this.order.lat=marker.getPosition().lat()
    this.order.address=`${places[0].name},${places[0].formatted_address}`
    })
   
    },
    data(){
        return {
        items:['CashOnDelivery'],
        order:{
          name:'',
          phno:'',
          address:'',
          email:'',
          paymenttype:'',
          lat:'',
          long:'',
          deliverystatus:'To be Confirmed',
          date: new Date().toISOString().substr(0, 10), 
          
        },
        valid:false,
            emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    rules: [
      v => !!v || 'This field is required',
     
    ],
        }
    },
    methods: {
      confirm(){
         if (this.$refs.form.validate()) {
            //save the post
            this.$emit('confirm',this.order)
         }
        },
        cancel(){
          this.$emit('cancel')
        }
    },
}
</script>