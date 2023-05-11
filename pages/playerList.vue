<template>

      <v-container
        fluid
        
        id="bg" 
       >
         <v-tooltip 
       :value="true"
        right color="success">
      <template v-slot:activator="{  attrs }">
        
        <v-btn
          class="mx-2"
          fab
          dark
          color="teal"
           v-bind="attrs"
           @click="$router.push('/')"
         
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </template>
      <span>Back</span>
    </v-tooltip>
      <v-row justify="center">
          <v-flex
            sm12
            md10 
            offset-md="6"
          >
            <v-card tile shaped style="padding:20px;margin-bottom:40px">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                 <v-row justify="center" v-for="(item,index) in id_list" :key="index">
                    <v-flex
                        sm4
                        md4 
                        offset-md="0"
                    >
                        <v-text-field :rules="nameRules" prepend-icon="mdi-account-circle"
                        type="text" label="Player Id" v-model="id_list[index]"  placeholder="roleId:12333" id="authkey" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex
                        sm4
                        md4 
                        offset-md="0"
                    >
                        <v-text-field :rules="nameRules" prepend-icon="mdi-account-circle"
                        type="text" label="Player Name" v-model="name_list[index]"  placeholder="rubydd" id="authkey" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex
                        sm3
                        md3 
                        offset-md="0"
                    >
                        <v-select
                        :items="items"
                        label="Roles"
                        :rules="nameRules"
                        
                        v-model="role_list[index]"
                        required
                          prepend-icon="mdi-map"
                        ></v-select>
                    </v-flex>
                     <v-flex
                        sm1
                        md1 
                        offset-md="0"
                    >
                    <v-btn
                        icon
                        color="red"
                        style="margin-top:15px"
                        @click="remove_element(index)"
                        >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                     </v-flex>
                 </v-row>
                </v-form>
                    <v-row style="margin-bottom:30px">
                        <v-btn
                        depressed
                        color="primary"
                        @click="add_field"
                        >
                            Add More Players
                        </v-btn>
                    </v-row>
                    <v-row>
                        <v-btn color="indigo" :disabled='disabled' dark block @click="upload_player_list()">Upload Data</v-btn>
                    </v-row>
                    <v-row style="margin-top:20px;margin-bottom:20px">
                         <v-btn color="indigo" :disabled='disabled' dark block @click="clear_player_list()">Clear Data</v-btn>
                    </v-row>
                   <v-row>
                    <h3>Current Data</h3>
                    <p>{{saved_data_onserver}}</p>
                   </v-row>
            </v-card>

          </v-flex>
      </v-row>

         

       

      </v-container>
      

</template>

<script>
import axios from 'axios'

    export default {
//playerinfolist (isarray or object) if array loop change all, if object go filter >uid,>picurl,teamid
  computed: {
    // a computed getter

  },
         data() {
            return {
                items:['exp','jg','mid','gold','roam'],
                id_list:[''],
                name_list:[''],
                role_list:[''],
                send_data:{},
                saved_data_onserver:{},
                disabled:false,
                valid: true,
                nameRules: [
                    v => !!v || 'Name is required',
                ],

            }
        },
        created(){
            if(process.client){
             axios.post(`${window.location.origin}/player_list?data=get`).then((res)=>{
                console.log(res)
                 let object=res.data.data[1].player_list
                 if(Object.keys(object).length>0){
                       for (const key in object) {
                        this.id_list.push(key)
                        this.name_list.push(object[key].name)
                        this.role_list.push(object[key].role)
                        }
                    this.remove_element(0)

                 }
             
                this.saved_data_onserver=res.data.data[1]
                 
            })
            }
        }
        ,
        methods:{
        remove_element(index){
        this.id_list.splice(index, 1);
        this.name_list.splice(index, 1);
        this.role_list.splice(index, 1);
        },
        add_field(){
            this.id_list.push('')   
            this.name_list.push('')
            this.role_list.push('')
        },
        make_sender(){
            this.id_list.forEach( (value, index) =>{
                    this.send_data[value]={'role':this.role_list[index],'name':this.name_list[index]}
                });
                console.log(this.send_data)
        },
          async upload_player_list(){
            this.disabled=true
            if(this.$refs.form.validate()){
                        await this.make_sender()
                        let a=JSON.stringify(this.send_data)
                        axios.post(`${window.location.origin}/player_list?data=${a}`).then((res)=>{
                            console.log(res)
                            this.saved_data_onserver=res.data.data[1]
                            this.disabled=false
                            window.location.reload()
                        })
            }else{
                this.disabled=false
            }

          },
          clear_player_list(){
             this.disabled=true
            axios.post(`${window.location.origin}/player_list?data=clear`).then((res)=>{
                console.log(res)
                 this.saved_data_onserver=res.data.data[1]
                 this.disabled=false
                  window.location.reload()
            })
          },
        }

    }
</script>