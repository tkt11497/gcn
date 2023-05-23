<template>

      <v-container
        fluid
        
        id="bg" 
       >
       <v-tooltip 
       :value="true"
        right color="success">
      <template v-slot:activator="{attrs }">
        
        <v-btn
          class="mx-2"
          fab
          dark
          color="teal"
           v-bind="attrs"
           @click="$router.push('/playerList')"
         
        >
          <v-icon dark>
            mdi-format-list-bulleted-square
          </v-icon>
        </v-btn>
      </template>
      <span>Edit Player List</span>
    </v-tooltip>

      <v-row justify="center">
          <v-flex
            sm12
            md10 
            offset-md="6"
          >
            <v-card tile shaped style="padding:20px;margin-bottom:20px">
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Auth Key" v-model="auth_key"  placeholder="Auth Key" id="authkey" required>
                    </v-text-field>
                    

                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Battle ID" v-model="battle_id"  placeholder="Battle ID" id="name" required>
                    </v-text-field>
            </v-card>
            <v-card tile shaped style="padding:20px;margin-bottom:40px">
                <h3 style="margin-bottom:15px"> Team Names</h3>
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Team 1 Name" v-model="team_1_name"  placeholder="Team 1 Name" id="authkey" required>
                    </v-text-field>
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Team 1 Short Name" v-model="team_1_short_name"  placeholder="Team 1 Short Name" id="authkey" required>
                    </v-text-field>
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Team 2 Name" v-model="team_2_name"  placeholder="Team 2 Name" id="authkey" required>
                    </v-text-field>
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Team 2 Short Name" v-model="team_2_short_name"  placeholder="Team 2 Short Name" id="authkey" required>
                    </v-text-field>
            </v-card>

      <v-card tile shaped style="padding:20px;margin-bottom:40px">
                    <h3 style="margin-bottom:15px"> Draft</h3>

                                    <v-text-field label="Team Logo Png" prepend-icon="mdi-account-circle" type="text" 
                                    v-model="draft_logo_path" 
                                    placeholder="C://mypc" id="name" required>
                                    </v-text-field>
                                    
                         
                          
                                    <v-text-field  label="Path 1(Player  Photo Link)" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="E:\Pick Ban\Player" v-model="path_1" id="email" required>
                                    </v-text-field>
                                   
                                
                                    <v-text-field  label="Path 2(No Light Link)" type="text" prepend-icon="mdi-account-circle"
                                    v-model="path_2" placeholder="No Light\10001.png" id="phone" required>
                                    </v-text-field>
                                     <v-text-field  label="Path 3(Light Link)" type="text" prepend-icon="mdi-account-circle"
                                    v-model="path_3" placeholder="Light\10001.png" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Path 4(Hero Link)" type="text" prepend-icon="mdi-account-circle"
                                    v-model="path_4" placeholder="E:\Pick Ban\Hero" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Path 5(Hero Image Sequence)" type="text" prepend-icon="mdi-account-circle"
                                    v-model="path_5" placeholder="10001.png" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Path 6(Before Banning)" type="text" prepend-icon="mdi-account-circle"
                                    v-model="path_6" 
                                    placeholder="E:\Pick Ban\before\10001.png" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Path 7(after Banning)" type="text" prepend-icon="mdi-account-circle"
                                    v-model="path_7" placeholder="E:\Pick Ban" id="phone" required>
                                    </v-text-field>
                                  
                                  
                                 <p>{{draft_hit_link}}</p>
                                 <input type="hidden" readonly id="draft_hit_link"
                                                  :value="draft_hit_link" />
                          <v-card-actions>
                        <v-btn color="indigo" dark block @click="copyTestingCode('draft_hit_link')">Copy Url</v-btn>
                          </v-card-actions>

            </v-card>

             <v-card tile shaped style="padding:20px;margin-bottom:40px">
                <h3 style="margin-bottom:15px"> HUD</h3>
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Team Logo Path for Hud" v-model="hud_team_logo_path"  placeholder="Team Logo path HUD" id="authkey" required>
                    </v-text-field>
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Gold Diff Path for Hud" v-model="hud_gold_diff_path"  placeholder="Gold Diff path HUD" id="authkey" required>
                    </v-text-field>
                    <v-text-field prepend-icon="mdi-account-circle"
                    type="text" label="Team Logo Path for Lord Turtle" v-model="team_logo_for_lord_turtle"  placeholder="team logo path for lord n turtle kill event" id="authkey" required>
                    </v-text-field>
                    <p>{{hud_hit_link}}</p>
                                 <input type="hidden" readonly id="hud_hit_link"
                                                  :value="hud_hit_link" />
                          <v-card-actions>
                        <v-btn color="indigo" dark block @click="copyTestingCode('hud_hit_link')">Copy Url</v-btn>
                          </v-card-actions>
            </v-card>
            <v-card tile shaped style="padding:20px;margin-bottom:40px">
                    <h3 style="margin-bottom:15px">Item Build</h3>

                                    <v-text-field label="Hero Png" prepend-icon="mdi-account-circle" type="text" 
                                    v-model="hero_png_path" 
                                    placeholder="C://mypc" id="name" required>
                                    </v-text-field>
                                    <v-text-field label="Hero Png For Gold Diff" prepend-icon="mdi-account-circle" type="text" 
                                    v-model="hero_png_path_for_gold_diff" 
                                    placeholder="C://Hero Png For Gold Diff" id="name" required>
                                    </v-text-field>
                                    
                         
                          
                                    <v-text-field  label="Item Png Path" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="item_png_path" id="email" required>
                                    </v-text-field>
                                   
                                
                                    <v-text-field  label="Gold Difference Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="gold_diff_path" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     
                                  
                                 <p>{{item_hit_link}}</p>
                                 <input type="hidden" readonly id="item_hit_link"
                                                  :value="item_hit_link" />
                          <v-card-actions>
                        <v-btn color="indigo" dark block @click="copyTestingCode('item_hit_link')">Copy Url</v-btn>
                          </v-card-actions>

            </v-card>
            <v-card tile shaped style="padding:20px;margin-bottom:40px">
                    <h3 style="margin-bottom:15px">MVP</h3>
                                  <v-text-field  label="Player Png Path" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="mvp_player_png_path" id="email" required>
                                    </v-text-field>

                                    <v-text-field label="Hero Png" prepend-icon="mdi-account-circle" type="text" 
                                    v-model="mvp_hero_png_path" 
                                    placeholder="C://mypc" id="name" required>
                                    </v-text-field>
                                    
                         
                          
                                    <v-text-field  label="Item Png Path" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="mvp_item_png_path" id="email" required>
                                    </v-text-field>
                                   
                                
                                    <v-text-field  label="Team Logo Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="mvp_team_logo_path" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Battle Spell Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="mvp_battle_spell_path" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     
                                  
                                 <p>{{mvp_hit_link}}</p>
                                 <input type="hidden" readonly id="mvp_hit_link"
                                                  :value="mvp_hit_link" />
                          <v-card-actions>
                        <v-btn color="indigo" dark block @click="copyTestingCode('mvp_hit_link')">Copy Url</v-btn>
                          </v-card-actions>

            </v-card>
            <v-card tile shaped style="padding:20px;margin-bottom:40px">
                    <h3 style="margin-bottom:15px">Match Result 1</h3>
                                  <v-text-field  label="Player Png Path" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="player_png_path_1" id="email" required>
                                    </v-text-field>

                                    <v-text-field label="Hero Png" prepend-icon="mdi-account-circle" type="text" 
                                    v-model="hero_png_path_1" 
                                    placeholder="C://mypc" id="name" required>
                                    </v-text-field>
                                    
                         
                          
                                    <v-text-field  label="Item Png Path" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="item_png_path_1" id="email" required>
                                    </v-text-field>
                                   
                                
                                    <v-text-field  label="Team Logo Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="team_logo_path_1" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Battle Spell Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="battle_spell_path_1" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     <v-text-field  label="Rune Png path" type="text" prepend-icon="mdi-account-circle"
                                    v-model="rune_path_1" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     <v-text-field  label="Role Png path" type="text" prepend-icon="mdi-account-circle"
                                    v-model="role_path_1" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     
                                  
                                 <p>{{match_result_1_hit_link}}</p>
                                 <input type="hidden" readonly id="match_result_1_hit_link"
                                                  :value="match_result_1_hit_link" />
                          <v-card-actions>
                        <v-btn color="indigo" dark block @click="copyTestingCode('match_result_1_hit_link')">Copy Url</v-btn>
                          </v-card-actions>

            </v-card>
            <v-card tile shaped style="padding:20px;margin-bottom:40px">
                    <h3 style="margin-bottom:15px">Match Result 2</h3>
                                  <v-text-field label="Hero Png" prepend-icon="mdi-account-circle" type="text" 
                                    v-model="hero_png_path_2" 
                                    placeholder="C://mypc" id="name" required>
                                    </v-text-field>

                                  <v-text-field  label="Player Png Path" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="player_png_path_2" id="email" required>
                                    </v-text-field>

                                  <v-text-field  label="Role Png path" type="text" prepend-icon="mdi-account-circle"
                                    v-model="role_path_2" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>

                                    
                                    <v-text-field  label="Damage Deal png" type="text" prepend-icon="mdi-account-circle"
                                    placeholder="C://mypc" v-model="damage_deal_png" id="email" required>
                                    </v-text-field>
                                   
                                
                                    <v-text-field  label="Damage Taken Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="damage_taken_png" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                    <v-text-field  label="Turret Damage Png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="turret_damage_png" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     <v-text-field  label="Turtle Lord Turret png" type="text" prepend-icon="mdi-account-circle"
                                    v-model="lord_turtle_turret_png" placeholder="C://mypc" id="phone" required>
                                    </v-text-field>
                                     
                                     
                                  
                                 <p>{{match_result_2_hit_link}}</p>
                                 <input type="hidden" readonly id="match_result_2_hit_link"
                                                  :value="match_result_2_hit_link" />
                          <v-card-actions>
                        <v-btn color="indigo" dark block @click="copyTestingCode('match_result_2_hit_link')">Copy Url</v-btn>
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
    hoster(){
        if(process.client){
                return window.location.origin
                }
    },
    draft_hit_link() {
      // `this` points to the component instance &team_1_name=${this.team_1_name}&team_1_short_name=${this.team_1_short_name}&team_2_name=${this.team_2_name}&team_2_short_name=${this.team_2_short_name}
      if(process.client){
        console.log(window.location)
        return `${window.location.origin}/draft?main_url=battledata&team_1_name=${this.team_1_name}&team_1_short_name=${this.team_1_short_name}&team_2_name=${this.team_2_name}&team_2_short_name=${this.team_2_short_name}&hoster=${this.hoster}&draft_logo_path=${this.draft_logo_path}&path_1=${this.path_1}&path_2=${this.path_2}&authkey=${this.auth_key}&battleid=${this.battle_id}&path_3=${this.path_3}&path_4=${this.path_4}&path_5=${this.path_5}&path_6=${this.path_6}&path_7=${this.path_7}`

      }
      
    },
    hud_hit_link() {
      // `this` points to the component instance
      if(process.client){
        console.log(window.location)
        return `${window.location.origin}/hud?team_logo_for_lord_turtle=${this.team_logo_for_lord_turtle}&team_1_name=${this.team_1_name}&team_1_short_name=${this.team_1_short_name}&team_2_name=${this.team_2_name}&team_2_short_name=${this.team_2_short_name}&hoster=${this.hoster}&hud_team_logo_path=${this.hud_team_logo_path}&hud_gold_diff_path=${this.hud_gold_diff_path}&authkey=${this.auth_key}&battleid=${this.battle_id}`

      }
      
    },
     item_hit_link() {
      // `this` points to the component instance
      if(process.client){
        console.log(window.location)
        return `${window.location.origin}/itembuild?main_url=battledata&hoster=${this.hoster}&hero_png_path_for_gold_diff=${this.hero_png_path_for_gold_diff}&hero_png_path=${this.hero_png_path}&item_png_path=${this.item_png_path}&gold_diff_path=${this.gold_diff_path}&authkey=${this.auth_key}&battleid=${this.battle_id}`

      }
      
    },
    mvp_hit_link() {
      // `this` points to the component instance
      if(process.client){
        console.log(window.location)
        return `${window.location.origin}/mvp?main_url=postdata&team_1_name=${this.team_1_name}&team_1_short_name=${this.team_1_short_name}&team_2_name=${this.team_2_name}&team_2_short_name=${this.team_2_short_name}&hoster=${this.hoster}&mvp_player_png_path=${this.mvp_player_png_path}&mvp_item_png_path=${this.mvp_item_png_path}&mvp_hero_png_path=${this.mvp_hero_png_path}&mvp_team_logo_path=${this.mvp_team_logo_path}&mvp_battle_spell_path=${this.mvp_battle_spell_path}&authkey=${this.auth_key}&battleid=${this.battle_id}`

      }
      
    },
    match_result_1_hit_link() {
      // `this` points to the component instance
      if(process.client){
        console.log(window.location)
        return `${window.location.origin}/match_result_1?team_1_name=${this.team_1_name}&team_1_short_name=${this.team_1_short_name}&team_2_name=${this.team_2_name}&team_2_short_name=${this.team_2_short_name}&hoster=${this.hoster}&rune_path_1=${this.rune_path_1}&role_path_1=${this.role_path_1}&player_png_path_1=${this.player_png_path_1}&item_png_path_1=${this.item_png_path_1}&hero_png_path_1=${this.hero_png_path_1}&team_logo_path_1=${this.team_logo_path_1}&battle_spell_path_1=${this.battle_spell_path_1}&authkey=${this.auth_key}&battleid=${this.battle_id}`

      }
      
    },
    match_result_2_hit_link() {
      // `this` points to the component instance
      if(process.client){
        console.log(window.location)
        return `${window.location.origin}/match_result_2?team_1_name=${this.team_1_name}&team_1_short_name=${this.team_1_short_name}&team_2_name=${this.team_2_name}&team_2_short_name=${this.team_2_short_name}&hoster=${this.hoster}&damage_deal_png=${this.damage_deal_png}&role_path_2=${this.role_path_2}&player_png_path_2=${this.player_png_path_2}&damage_taken_png=${this.damage_taken_png}&hero_png_path_2=${this.hero_png_path_2}&turret_damage_png=${this.turret_damage_png}&lord_turtle_turret_png=${this.lord_turtle_turret_png}&authkey=${this.auth_key}&battleid=${this.battle_id}`

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
              battle_id:"616494629484529841",
              draft_logo_path:'',
              path_1:'',
              path_2:'',
              path_3:'',
              path_4:'',
              path_5:'',
              path_6:'',
              path_7:'',

              hud_team_logo_path:'',
              hud_gold_diff_path:'',
              team_logo_for_lord_turtle:'',

              team_1_name:'',
              team_1_short_name:'',
              team_2_name:'',
              team_2_short_name:'',

              gold_diff_path:'',
              item_png_path:'',
              hero_png_path:'',
              hero_png_path_for_gold_diff:'',

              mvp_player_png_path:'',
              mvp_hero_png_path:'',
              mvp_item_png_path:'',
              mvp_team_logo_path:'',
              mvp_battle_spell_path:'',

              player_png_path_1:'',
              hero_png_path_1:'',
              item_png_path_1:'',
              team_logo_path_1:'',
              battle_spell_path_1:'',
              role_path_1:'',
              rune_path_1:'',

              player_png_path_2:'',
              hero_png_path_2:'',
              role_path_2:'',
              damage_deal_png:'',
              damage_taken_png:'',
              turret_damage_png:'',
              lord_turtle_turret_png:'',

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