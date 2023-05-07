import axios from 'axios'
export default async function (req, res, next) {

   
    let responseData={};
    let paramString = req.url.split('?')[1];
    let a= JSON.parse('{"' + decodeURI(paramString)
        .replace(/"/g, '\\"').replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}');
    console.log(a,'sadsad')
    function thousands_separators(num){
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
    let hit_url=`http://esportsdata.mobilelegends.com:30260/battledata?authkey=${a['authkey']}&battleid=${a['battleid']}&dataid=1`
    await axios.get(hit_url).then((response)=>{
        //console.log(response.data.data)
        let b=response.data.data


        responseData.team_1_player_1_hero_png=a['hero_png_path']+b.camp_list[0].player_list[0].heroid+'.png'
        responseData.team_1_player_2_hero_png=a['hero_png_path']+b.camp_list[0].player_list[1].heroid+'.png'
        responseData.team_1_player_3_hero_png=a['hero_png_path']+b.camp_list[0].player_list[2].heroid+'.png'
        responseData.team_1_player_4_hero_png=a['hero_png_path']+b.camp_list[0].player_list[3].heroid+'.png'
        responseData.team_1_player_5_hero_png=a['hero_png_path']+b.camp_list[0].player_list[4].heroid+'.png'

        responseData.team_1_player_1_gold=thousands_separators(b.camp_list[0].player_list[0].gold)
        responseData.team_1_player_2_gold=thousands_separators(b.camp_list[0].player_list[1].gold)
        responseData.team_1_player_3_gold=thousands_separators(b.camp_list[0].player_list[2].gold)
        responseData.team_1_player_4_gold=thousands_separators(b.camp_list[0].player_list[3].gold)
        responseData.team_1_player_5_gold=thousands_separators(b.camp_list[0].player_list[4].gold)

        responseData.team_1_player_1_item_1=a['item_png_path']+(b.camp_list[0].player_list[0].equip_list[0]||0)+'.png'
        responseData.team_1_player_1_item_2=a['item_png_path']+(b.camp_list[0].player_list[0].equip_list[1]||0)+'.png'
        responseData.team_1_player_1_item_3=a['item_png_path']+(b.camp_list[0].player_list[0].equip_list[2]||0)+'.png'
        responseData.team_1_player_1_item_4=a['item_png_path']+(b.camp_list[0].player_list[0].equip_list[3]||0)+'.png'
        responseData.team_1_player_1_item_5=a['item_png_path']+(b.camp_list[0].player_list[0].equip_list[4]||0)+'.png'
        responseData.team_1_player_1_item_6=a['item_png_path']+(b.camp_list[0].player_list[0].equip_list[5]||0)+'.png'

        responseData.team_1_player_2_item_1=a['item_png_path']+(b.camp_list[0].player_list[1].equip_list[0]||0)+'.png'
        responseData.team_1_player_2_item_2=a['item_png_path']+(b.camp_list[0].player_list[1].equip_list[1]||0)+'.png'
        responseData.team_1_player_2_item_3=a['item_png_path']+(b.camp_list[0].player_list[1].equip_list[2]||0)+'.png'
        responseData.team_1_player_2_item_4=a['item_png_path']+(b.camp_list[0].player_list[1].equip_list[3]||0)+'.png'
        responseData.team_1_player_2_item_5=a['item_png_path']+(b.camp_list[0].player_list[1].equip_list[4]||0)+'.png'
        responseData.team_1_player_2_item_6=a['item_png_path']+(b.camp_list[0].player_list[1].equip_list[5]||0)+'.png'

        responseData.team_1_player_3_item_1=a['item_png_path']+(b.camp_list[0].player_list[2].equip_list[0]||0)+'.png'
        responseData.team_1_player_3_item_2=a['item_png_path']+(b.camp_list[0].player_list[2].equip_list[1]||0)+'.png'
        responseData.team_1_player_3_item_3=a['item_png_path']+(b.camp_list[0].player_list[2].equip_list[2]||0)+'.png'
        responseData.team_1_player_3_item_4=a['item_png_path']+(b.camp_list[0].player_list[2].equip_list[3]||0)+'.png'
        responseData.team_1_player_3_item_5=a['item_png_path']+(b.camp_list[0].player_list[2].equip_list[4]||0)+'.png'
        responseData.team_1_player_3_item_6=a['item_png_path']+(b.camp_list[0].player_list[2].equip_list[5]||0)+'.png'

        responseData.team_1_player_4_item_1=a['item_png_path']+(b.camp_list[0].player_list[3].equip_list[0]||0)+'.png'
        responseData.team_1_player_4_item_2=a['item_png_path']+(b.camp_list[0].player_list[3].equip_list[1]||0)+'.png'
        responseData.team_1_player_4_item_3=a['item_png_path']+(b.camp_list[0].player_list[3].equip_list[2]||0)+'.png'
        responseData.team_1_player_4_item_4=a['item_png_path']+(b.camp_list[0].player_list[3].equip_list[3]||0)+'.png'
        responseData.team_1_player_4_item_5=a['item_png_path']+(b.camp_list[0].player_list[3].equip_list[4]||0)+'.png'
        responseData.team_1_player_4_item_6=a['item_png_path']+(b.camp_list[0].player_list[3].equip_list[5]||0)+'.png'

        responseData.team_1_player_5_item_1=a['item_png_path']+(b.camp_list[0].player_list[4].equip_list[0]||0)+'.png'
        responseData.team_1_player_5_item_2=a['item_png_path']+(b.camp_list[0].player_list[4].equip_list[1]||0)+'.png'
        responseData.team_1_player_5_item_3=a['item_png_path']+(b.camp_list[0].player_list[4].equip_list[2]||0)+'.png'
        responseData.team_1_player_5_item_4=a['item_png_path']+(b.camp_list[0].player_list[4].equip_list[3]||0)+'.png'
        responseData.team_1_player_5_item_5=a['item_png_path']+(b.camp_list[0].player_list[4].equip_list[4]||0)+'.png'
        responseData.team_1_player_5_item_6=a['item_png_path']+(b.camp_list[0].player_list[4].equip_list[5]||0)+'.png'

      

//team2

       

        responseData.team_2_player_1_hero_png=a['hero_png_path']+b.camp_list[1].player_list[0].heroid+'.png'
        responseData.team_2_player_2_hero_png=a['hero_png_path']+b.camp_list[1].player_list[1].heroid+'.png'
        responseData.team_2_player_3_hero_png=a['hero_png_path']+b.camp_list[1].player_list[2].heroid+'.png'
        responseData.team_2_player_4_hero_png=a['hero_png_path']+b.camp_list[1].player_list[3].heroid+'.png'
        responseData.team_2_player_5_hero_png=a['hero_png_path']+b.camp_list[1].player_list[4].heroid+'.png'

        
        responseData.team_2_player_1_gold=thousands_separators(b.camp_list[1].player_list[0].gold)
        responseData.team_2_player_2_gold=thousands_separators(b.camp_list[1].player_list[1].gold)
        responseData.team_2_player_3_gold=thousands_separators(b.camp_list[1].player_list[2].gold)
        responseData.team_2_player_4_gold=thousands_separators(b.camp_list[1].player_list[3].gold)
        responseData.team_2_player_5_gold=thousands_separators(b.camp_list[1].player_list[4].gold)

        responseData.team_2_player_1_item_1=a['item_png_path']+(b.camp_list[1].player_list[0].equip_list[0]||0)+'.png'
        responseData.team_2_player_1_item_2=a['item_png_path']+(b.camp_list[1].player_list[0].equip_list[1]||0)+'.png'
        responseData.team_2_player_1_item_3=a['item_png_path']+(b.camp_list[1].player_list[0].equip_list[2]||0)+'.png'
        responseData.team_2_player_1_item_4=a['item_png_path']+(b.camp_list[1].player_list[0].equip_list[3]||0)+'.png'
        responseData.team_2_player_1_item_5=a['item_png_path']+(b.camp_list[1].player_list[0].equip_list[4]||0)+'.png'
        responseData.team_2_player_1_item_6=a['item_png_path']+(b.camp_list[1].player_list[0].equip_list[5]||0)+'.png'

        responseData.team_2_player_2_item_1=a['item_png_path']+(b.camp_list[1].player_list[1].equip_list[0]||0)+'.png'
        responseData.team_2_player_2_item_2=a['item_png_path']+(b.camp_list[1].player_list[1].equip_list[1]||0)+'.png'
        responseData.team_2_player_2_item_3=a['item_png_path']+(b.camp_list[1].player_list[1].equip_list[2]||0)+'.png'
        responseData.team_2_player_2_item_4=a['item_png_path']+(b.camp_list[1].player_list[1].equip_list[3]||0)+'.png'
        responseData.team_2_player_2_item_5=a['item_png_path']+(b.camp_list[1].player_list[1].equip_list[4]||0)+'.png'
        responseData.team_2_player_2_item_6=a['item_png_path']+(b.camp_list[1].player_list[1].equip_list[5]||0)+'.png'

        responseData.team_2_player_3_item_1=a['item_png_path']+(b.camp_list[1].player_list[2].equip_list[0]||0)+'.png'
        responseData.team_2_player_3_item_2=a['item_png_path']+(b.camp_list[1].player_list[2].equip_list[1]||0)+'.png'
        responseData.team_2_player_3_item_3=a['item_png_path']+(b.camp_list[1].player_list[2].equip_list[2]||0)+'.png'
        responseData.team_2_player_3_item_4=a['item_png_path']+(b.camp_list[1].player_list[2].equip_list[3]||0)+'.png'
        responseData.team_2_player_3_item_5=a['item_png_path']+(b.camp_list[1].player_list[2].equip_list[4]||0)+'.png'
        responseData.team_2_player_3_item_6=a['item_png_path']+(b.camp_list[1].player_list[2].equip_list[5]||0)+'.png'

        responseData.team_2_player_4_item_1=a['item_png_path']+(b.camp_list[1].player_list[3].equip_list[0]||0)+'.png'
        responseData.team_2_player_4_item_2=a['item_png_path']+(b.camp_list[1].player_list[3].equip_list[1]||0)+'.png'
        responseData.team_2_player_4_item_3=a['item_png_path']+(b.camp_list[1].player_list[3].equip_list[2]||0)+'.png'
        responseData.team_2_player_4_item_4=a['item_png_path']+(b.camp_list[1].player_list[3].equip_list[3]||0)+'.png'
        responseData.team_2_player_4_item_5=a['item_png_path']+(b.camp_list[1].player_list[3].equip_list[4]||0)+'.png'
        responseData.team_2_player_4_item_6=a['item_png_path']+(b.camp_list[1].player_list[3].equip_list[5]||0)+'.png'

        responseData.team_2_player_5_item_1=a['item_png_path']+(b.camp_list[1].player_list[4].equip_list[0]||0)+'.png'
        responseData.team_2_player_5_item_2=a['item_png_path']+(b.camp_list[1].player_list[4].equip_list[1]||0)+'.png'
        responseData.team_2_player_5_item_3=a['item_png_path']+(b.camp_list[1].player_list[4].equip_list[2]||0)+'.png'
        responseData.team_2_player_5_item_4=a['item_png_path']+(b.camp_list[1].player_list[4].equip_list[3]||0)+'.png'
        responseData.team_2_player_5_item_5=a['item_png_path']+(b.camp_list[1].player_list[4].equip_list[4]||0)+'.png'
        responseData.team_2_player_5_item_6=a['item_png_path']+(b.camp_list[1].player_list[4].equip_list[5]||0)+'.png'

      //gold diff
      //(Team2 Player1 Gold / (team1 player1 gold + team2 player1 gold) ) *  100
      responseData.exp_gold_different_png=a['gold_diff_path']+
      Math.round((b.camp_list[1].player_list[0].gold / (b.camp_list[0].player_list[0].gold + b.camp_list[1].player_list[0].gold) ) *  100)+'.png'
      //(Team2 Player2 Gold / (team1 player1 gold + team2 player2 gold) ) *  100
      responseData.jg_gold_different_png=a['gold_diff_path']+
      Math.round((b.camp_list[1].player_list[1].gold / (b.camp_list[0].player_list[0].gold + b.camp_list[1].player_list[1].gold) ) *  100)+'.png'
      //(Team2 Player2 Gold / (team1 player3 gold + team2 player3 gold) ) *  100
      responseData.mid_gold_different_png=a['gold_diff_path']+
      Math.round((b.camp_list[1].player_list[1].gold / (b.camp_list[0].player_list[2].gold + b.camp_list[1].player_list[2].gold) ) *  100)+'.png'
      //(Team2 Player2 Gold / (team1 player4 gold + team2 player4 gold) ) *  100
      responseData.gold_gold_different_png=a['gold_diff_path']+
      Math.round((b.camp_list[1].player_list[1].gold / (b.camp_list[0].player_list[3].gold + b.camp_list[1].player_list[3].gold) ) *  100)+'.png'
      //(Team2 Player2 Gold / (team1 player5 gold + team2 player5 gold) ) *  100
      responseData.roam_gold_different_png=a['gold_diff_path']+
      Math.round((b.camp_list[1].player_list[1].gold / (b.camp_list[0].player_list[4].gold + b.camp_list[1].player_list[4].gold) ) *  100)+'.png'
    });
//.get(mainurl)
//response[isarray> if array loop >array[0]]


    responseData.message = 'leelr33'
    let e={'data':[responseData,'lee']}
    const jsonContent = JSON.stringify(e);
    res.end(jsonContent);
  
    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    //next()
  }