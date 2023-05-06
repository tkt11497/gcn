<template>

      <v-container
        fluid
        
        id="bg" 
       >
      <v-row justify="center">
          <v-flex
            sm12
            md10 
            offset-md="6"
          >
            <v-card tile shaped style="padding:20px">
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Auth Key" v-model="auth_key"  placeholder="Auth Key" id="authkey" required>
                    </v-text-field>
                    

                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Battle ID" v-model="battle_id"  placeholder="Battle ID" id="name" required>
                    </v-text-field>


                    <h3 style="margin-bottom:15px"> Draft</h3>

                                    <v-text-field label="Team Logo Png" prepend-icon="mdi-account-circle" type="text" 
                                    v-model="draft_logo_path" 
                                    placeholder="C://mypc" id="name" required>
                                    </v-text-field>
                                    
                         
                          
                                    <v-text-field  label="Player Png" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="draft_player_path" id="email" required>
                                    </v-text-field>
                                   
                                
                                    <v-text-field  label="Pick Hero Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="draft_hero_path" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     <v-text-field  label="Ban Hero Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="draft_hero_path_ban" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Picking true Url" type="text" prepend-icon="mdi-account-circle"
                                    v-model="pick_true_url" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Picking false Url" type="text" prepend-icon="mdi-account-circle"
                                    v-model="pick_false_url" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Ban true Url" type="text" prepend-icon="mdi-account-circle"
                                    v-model="ban_true_url" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Ban false Url" type="text" prepend-icon="mdi-account-circle"
                                    v-model="ban_false_url" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                  
                                  
                                 <p>{{draft_hit_link}}</p>
                                 <input type="hidden" readonly id="draft_hit_link"
                                                  :value="draft_hit_link" />
                          <v-card-actions>
                        <v-btn color="indigo" dark block @click="copyTestingCode('draft_hit_link')">Copy Url</v-btn>
                          </v-card-actions>

            </v-card>
          </v-flex>
      </v-row>

         

       

      </v-container>
      

</template>

<script>


    export default {
//playerinfolist (isarray or object) if array loop change all, if object go filter >uid,>picurl,teamid
  computed: {
    // a computed getter
    draft_hit_link() {
      // `this` points to the component instance
      if(process.client){
        console.log(window.location)
        return `${window.location.origin}/draft?main_url=${this.draft_main_url}&draft_logo_path=${this.draft_logo_path}&draft_player_path=${this.draft_player_path}&draft_hero_path=${this.draft_hero_path}&authkey=${this.auth_key}&battleid=${this.battle_id}&draft_hero_path_ban=${this.draft_hero_path_ban}&pick_true_url=${this.pick_true_url}&pick_false_url=${this.pick_false_url}&ban_true_url=${this.ban_true_url}&ban_false_url=${this.ban_false_url}`

      }
      
    },
    draft_main_url() {
      // `this` points to the component instance
      return `battledata`
    }
  },
         data() {
            return {

              auth_key:'ee3af4c1a0963e7f052754e66bcb7b6f',
              battle_id:"664507587847258091",
              draft_logo_path:'',
              draft_player_path:'',
              draft_hero_path:'',
              draft_hero_path_ban:'',
              pick_true_url:'',
              pick_false_url:'',
              ban_true_url:'',
              ban_false_url:'',

                activeName: 'first',
                job_list:[],
                show_list:false,

            }
        },
        created(){
        
        }
        ,
        methods:{
        copyTestingCode(data) {
          let testingCodeToCopy = document.querySelector(`#${data}`);
          console.log(testingCodeToCopy,'asdsa')
          testingCodeToCopy.setAttribute("type", "text");
          testingCodeToCopy.setAttribute("readonly", true);
          testingCodeToCopy.select();
          try {
              var successful = document.execCommand("copy");
              var msg = successful ? "successful" : "unsuccessful";
              alert("successful copy");

          } catch (err) {
              alert("Oops, unable to copy");
          }
          testingCodeToCopy.setAttribute("type", "hidden");
          window.getSelection().removeAllRanges();
      },
          go_detail(index){
            this.$router.push('/careers_detail')
          },
        }

    }
</script>