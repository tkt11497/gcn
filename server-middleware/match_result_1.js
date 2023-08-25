import axios from 'axios'
import helper from './helper.js';
export default async function (req, res, next) {
    function thousands_separators(num){
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
    let hero_list={1: "MIYA", 2: "BALMOND", 
    3: "SABER", 4: "ALICE", 5: "NANA", 6: "TIGREAL", 7: "ALUCARD", 
    8: "KARINA", 9: "AKAI", 10: "FRANCO", 11: "BANE", 12: "BRUNO", 13: "CLINT", 
    14: "RAFAELA", 15: "EUDORA", 16: "ZILONG", 17: "FANNY", 18: "LAYLA", 19: "MINOTAUR", 
    20: "LOLITA", 21: "HAYABUSA", 22: "FREYA", 23: "GORD", 24: "NATALIA", 25: "KAGURA", 
    26: "CHOU", 27: "SUN", 28: "ALPHA", 29: "RUBY", 30: "YI SUN-SHIN", 31: "MOSKOV", 32: "JOHNSON", 
    33: "CYCLOPS", 34: "ESTES", 35: "HILDA", 36: "AURORA", 37: "LAPU-LAPU", 38: "VEXANA", 39: "ROGER", 
    40: "KARRIE", 41: "GATOTKACA", 42: "HARLEY", 43: "IRITHEL", 44: "GROCK", 45: "ARGUS", 46: "ODETTE", 
    47: "LANCELOT", 48: "DIGGIE", 49: "HYLOS", 50: "ZHASK", 51: "HELCURT", 52: "PHARSA", 53: "LESLEY",
     54: "JAWHEAD", 55: "ANGELA", 56: "GUSION", 57: "VALIR", 58: "MARTIS", 59: "URANUS", 60: "HANABI",
      61: "CHANG'E", 62: "KAJA", 63: "SELENA", 64: "ALDOUS", 65: "CLAUDE", 66: "VALE", 67: "LEOMORD", 
      68: "LUNOX", 69: "HANZO", 70: "BELERICK", 71: "KIMMY", 72: "THAMUZ", 73: "HARITH", 74: "MINSITTHAR",
       75: "KADITA", 76: "FARAMIS", 77: "BADANG", 78: "KHUFRA", 79: "GRANGER", 80: "GUINEVERE", 
       81: "ESMERALDA", 82: "TERIZLA", 83: "X.BORG", 84: "LING", 85: "DYRROTH", 86: "LYLIA", 
       87: "BAXIA", 88: "MASHA", 89: "WANWAN", 90: "SILVANNA", 91: "CECILION", 92: "CARMILLA", 
       93: "ATLAS", 94: "POPOL AND KUPA", 95: "YU ZHONG", 96: "LUO YI", 97: "BENEDETTA",
        98: "KHALEED", 99: "BARATS", 100: "BRODY", 101: "YVE", 102: "MATHILDA",
        103: "PAQUITO", 104: "GLOO", 105: "BEATRIX", 106: "PHOVEUS", 
        107: "NATAN", 108: "AULUS", 109: "AAMON", 110: "VALENTINA", 111: "EDITH", 
        112: "FLORYN", 113: "YIN", 114: "MELISSA", 115: "XAVIER", 116: "JULIAN",
         117: "FREDRINN", 118: "JOY", 119: "Novalia", 120: "ARLOTT", 121 : "Ixia"}
    let responseData={};
    let paramString = req.url.split('?')[1];
    let a= JSON.parse('{"' + decodeURI(paramString)
        .replace(/"/g, '\\"').replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}');
        let hoster=a['hoster']
    let hit_url=`http://esportsdata.mobilelegends.com:30260/postdata?authkey=${a['authkey']}&battleid=${a['battleid']}&dataid=1`
    await axios.get(hit_url).then(async (response)=>{
        //console.log(response.data.data)
        let b=response.data.data
        let win_camp=b.win_camp

        let team_1_players=b.hero_list.filter(function(item){
            return item.campid==1
        })
        
        let team_2_players=b.hero_list.filter(function(item){
            return item.campid==2
        })
        // console.log(team_1_players,team_2_players,'team player list')
        team_1_players=await helper.role_sorter(team_1_players,hoster)
        team_2_players=await helper.role_sorter(team_2_players,hoster)
        // console.log(team_1_players,'after sorting')
        // console.log(team_2_players,'after srting')

        //team1
        responseData.team_1_name=a['team_1_name']|| b.camp_list[0].team_name
        responseData.team_1_logo= a['team_logo_path_1']+(a['team_1_short_name']|| b.camp_list[0].team_simple_name)+'.png'
        responseData.team_1_short_name=a['team_1_short_name']|| b.camp_list[0].team_simple_name
       //team 1 player names
       responseData.team_1_player_1_name=await helper.name_finder(team_1_players[0].roleid,hoster)||team_1_players[0].name
       responseData.team_1_player_2_name=await helper.name_finder(team_1_players[1].roleid,hoster)||team_1_players[1].name
       responseData.team_1_player_3_name=await helper.name_finder(team_1_players[2].roleid,hoster)||team_1_players[2].name
       responseData.team_1_player_4_name=await helper.name_finder(team_1_players[3].roleid,hoster)||team_1_players[3].name
       responseData.team_1_player_5_name=await helper.name_finder(team_1_players[4].roleid,hoster)||team_1_players[4].name
        //team 1 players photo
       responseData.team_1_player_1_photo= a['player_png_path_1']+team_1_players[0].roleid+'.png'
       responseData.team_1_player_2_photo= a['player_png_path_1']+team_1_players[1].roleid+'.png'
       responseData.team_1_player_3_photo= a['player_png_path_1']+team_1_players[2].roleid+'.png'
       responseData.team_1_player_4_photo= a['player_png_path_1']+team_1_players[3].roleid+'.png'
       responseData.team_1_player_5_photo= a['player_png_path_1']+team_1_players[4].roleid+'.png'
        //team 1 player kda
        responseData.team_1_player_1_kda=`${team_1_players[0].kill_num}/${team_1_players[0].dead_num}/${team_1_players[0].assist_num}`
        responseData.team_1_player_2_kda=`${team_1_players[1].kill_num}/${team_1_players[1].dead_num}/${team_1_players[1].assist_num}`
        responseData.team_1_player_3_kda=`${team_1_players[2].kill_num}/${team_1_players[2].dead_num}/${team_1_players[2].assist_num}`
        responseData.team_1_player_4_kda=`${team_1_players[3].kill_num}/${team_1_players[3].dead_num}/${team_1_players[3].assist_num}`
        responseData.team_1_player_5_kda=`${team_1_players[4].kill_num}/${team_1_players[4].dead_num}/${team_1_players[4].assist_num}`
        //team 1 player gold
       responseData.team_1_player_1_gold=thousands_separators(team_1_players[0].total_money)
       responseData.team_1_player_2_gold=thousands_separators(team_1_players[1].total_money)
       responseData.team_1_player_3_gold=thousands_separators(team_1_players[2].total_money)
       responseData.team_1_player_4_gold=thousands_separators(team_1_players[3].total_money)
       responseData.team_1_player_5_gold=thousands_separators(team_1_players[4].total_money)
       //team 1 player heroname
       responseData.team_1_player_1_hero_name=hero_list[team_1_players[0].heroid]
       responseData.team_1_player_2_hero_name=hero_list[team_1_players[1].heroid]
       responseData.team_1_player_3_hero_name=hero_list[team_1_players[2].heroid]
       responseData.team_1_player_4_hero_name=hero_list[team_1_players[3].heroid]
       responseData.team_1_player_5_hero_name=hero_list[team_1_players[4].heroid]
        //team 1 player hero png
        responseData.team_1_player_1_hero_png=a['hero_png_path_1']+team_1_players[0].heroid+'.png'
        responseData.team_1_player_2_hero_png=a['hero_png_path_1']+team_1_players[1].heroid+'.png'
        responseData.team_1_player_3_hero_png=a['hero_png_path_1']+team_1_players[2].heroid+'.png'
        responseData.team_1_player_4_hero_png=a['hero_png_path_1']+team_1_players[3].heroid+'.png'
        responseData.team_1_player_5_hero_png=a['hero_png_path_1']+team_1_players[4].heroid+'.png'
        //team 1 player battle spell png
       responseData.team_1_player_1_battlespell=a['battle_spell_path_1']+team_1_players[0].skillid+'.png'
       responseData.team_1_player_2_battlespell=a['battle_spell_path_1']+team_1_players[1].skillid+'.png'
       responseData.team_1_player_3_battlespell=a['battle_spell_path_1']+team_1_players[2].skillid+'.png'
       responseData.team_1_player_4_battlespell=a['battle_spell_path_1']+team_1_players[3].skillid+'.png'
       responseData.team_1_player_5_battlespell=a['battle_spell_path_1']+team_1_players[4].skillid+'.png'
       //team 1 player runes Object.keys(team__players[0].rune_map).length-1
       responseData.team_1_player_1_rune=team_1_players[0].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_1_players[0].rune_map)[Object.keys(team_1_players[0].rune_map).length-1]+'.png'
       responseData.team_1_player_2_rune=team_1_players[1].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_1_players[1].rune_map)[Object.keys(team_1_players[1].rune_map).length-1]+'.png'
       responseData.team_1_player_3_rune=team_1_players[2].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_1_players[2].rune_map)[Object.keys(team_1_players[2].rune_map).length-1]+'.png'
       responseData.team_1_player_4_rune=team_1_players[3].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_1_players[3].rune_map)[Object.keys(team_1_players[3].rune_map).length-1]+'.png'
       responseData.team_1_player_5_rune=team_1_players[4].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_1_players[4].rune_map)[Object.keys(team_1_players[4].rune_map).length-1]+'.png'
       //team 1 roles
       responseData.team_1_player_1_role=a['role_path_1']+helper.roles_id(team_1_players[0].c_role)+'.png'
       responseData.team_1_player_2_role=a['role_path_1']+helper.roles_id(team_1_players[1].c_role)+'.png'
       responseData.team_1_player_3_role=a['role_path_1']+helper.roles_id(team_1_players[2].c_role)+'.png'
       responseData.team_1_player_4_role=a['role_path_1']+helper.roles_id(team_1_players[3].c_role)+'.png'
       responseData.team_1_player_5_role=a['role_path_1']+helper.roles_id(team_1_players[4].c_role)+'.png'

        //team 1 player 1 items
       responseData.team_1_player_1_item_1=team_1_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[0].equip_list[0]||0)+'.png'
       responseData.team_1_player_1_item_2=team_1_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[0].equip_list[1]||0)+'.png'
       responseData.team_1_player_1_item_3=team_1_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[0].equip_list[2]||0)+'.png'
       responseData.team_1_player_1_item_4=team_1_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[0].equip_list[3]||0)+'.png'
       responseData.team_1_player_1_item_5=team_1_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[0].equip_list[4]||0)+'.png'
       responseData.team_1_player_1_item_6=team_1_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[0].equip_list[5]||0)+'.png'

       responseData.team_1_player_2_item_1=team_1_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[1].equip_list[0]||0)+'.png'
       responseData.team_1_player_2_item_2=team_1_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[1].equip_list[1]||0)+'.png'
       responseData.team_1_player_2_item_3=team_1_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[1].equip_list[2]||0)+'.png'
       responseData.team_1_player_2_item_4=team_1_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[1].equip_list[3]||0)+'.png'
       responseData.team_1_player_2_item_5=team_1_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[1].equip_list[4]||0)+'.png'
       responseData.team_1_player_2_item_6=team_1_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[1].equip_list[5]||0)+'.png'

       responseData.team_1_player_3_item_1=team_1_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[2].equip_list[0]||0)+'.png'
       responseData.team_1_player_3_item_2=team_1_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[2].equip_list[1]||0)+'.png'
       responseData.team_1_player_3_item_3=team_1_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[2].equip_list[2]||0)+'.png'
       responseData.team_1_player_3_item_4=team_1_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[2].equip_list[3]||0)+'.png'
       responseData.team_1_player_3_item_5=team_1_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[2].equip_list[4]||0)+'.png'
       responseData.team_1_player_3_item_6=team_1_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[2].equip_list[5]||0)+'.png'

       responseData.team_1_player_4_item_1=team_1_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[3].equip_list[0]||0)+'.png'
       responseData.team_1_player_4_item_2=team_1_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[3].equip_list[1]||0)+'.png'
       responseData.team_1_player_4_item_3=team_1_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[3].equip_list[2]||0)+'.png'
       responseData.team_1_player_4_item_4=team_1_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[3].equip_list[3]||0)+'.png'
       responseData.team_1_player_4_item_5=team_1_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[3].equip_list[4]||0)+'.png'
       responseData.team_1_player_4_item_6=team_1_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[3].equip_list[5]||0)+'.png'

       responseData.team_1_player_5_item_1=team_1_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[4].equip_list[0]||0)+'.png'
       responseData.team_1_player_5_item_2=team_1_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[4].equip_list[1]||0)+'.png'
       responseData.team_1_player_5_item_3=team_1_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[4].equip_list[2]||0)+'.png'
       responseData.team_1_player_5_item_4=team_1_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[4].equip_list[3]||0)+'.png'
       responseData.team_1_player_5_item_5=team_1_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[4].equip_list[4]||0)+'.png'
       responseData.team_1_player_5_item_6=team_1_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_1_players[4].equip_list[5]||0)+'.png'

       //team2

       responseData.team_2_name=a['team_2_name']|| b.camp_list[1].team_name
       responseData.team_2_logo= a['team_logo_path_1']+(a['team_2_short_name']|| b.camp_list[1].team_simple_name)+'.png'
       responseData.team_2_short_name=a['team_2_short_name']|| b.camp_list[1].team_simple_name
      //team 2 player names
      responseData.team_2_player_1_name=await helper.name_finder(team_2_players[0].roleid,hoster)||team_2_players[0].name
      responseData.team_2_player_2_name=await helper.name_finder(team_2_players[1].roleid,hoster)||team_2_players[1].name
      responseData.team_2_player_3_name=await helper.name_finder(team_2_players[2].roleid,hoster)||team_2_players[2].name
      responseData.team_2_player_4_name=await helper.name_finder(team_2_players[3].roleid,hoster)||team_2_players[3].name
      responseData.team_2_player_5_name=await helper.name_finder(team_2_players[4].roleid,hoster)||team_2_players[4].name
       //team 2 players photo
      responseData.team_2_player_1_photo= a['player_png_path_1']+team_2_players[0].roleid+'.png'
      responseData.team_2_player_2_photo= a['player_png_path_1']+team_2_players[1].roleid+'.png'
      responseData.team_2_player_3_photo= a['player_png_path_1']+team_2_players[2].roleid+'.png'
      responseData.team_2_player_4_photo= a['player_png_path_1']+team_2_players[3].roleid+'.png'
      responseData.team_2_player_5_photo= a['player_png_path_1']+team_2_players[4].roleid+'.png'
       //team 2 player kda
       responseData.team_2_player_1_kda=`${team_2_players[0].kill_num}/${team_2_players[0].dead_num}/${team_2_players[0].assist_num}`
       responseData.team_2_player_2_kda=`${team_2_players[1].kill_num}/${team_2_players[1].dead_num}/${team_2_players[1].assist_num}`
       responseData.team_2_player_3_kda=`${team_2_players[2].kill_num}/${team_2_players[2].dead_num}/${team_2_players[2].assist_num}`
       responseData.team_2_player_4_kda=`${team_2_players[3].kill_num}/${team_2_players[3].dead_num}/${team_2_players[3].assist_num}`
       responseData.team_2_player_5_kda=`${team_2_players[4].kill_num}/${team_2_players[4].dead_num}/${team_2_players[4].assist_num}`
       //team 2 player gold
      responseData.team_2_player_1_gold=thousands_separators(team_2_players[0].total_money)
      responseData.team_2_player_2_gold=thousands_separators(team_2_players[1].total_money)
      responseData.team_2_player_3_gold=thousands_separators(team_2_players[2].total_money)
      responseData.team_2_player_4_gold=thousands_separators(team_2_players[3].total_money)
      responseData.team_2_player_5_gold=thousands_separators(team_2_players[4].total_money)
      //team 2 player heroname
      responseData.team_2_player_1_hero_name=hero_list[team_2_players[0].heroid]
      responseData.team_2_player_2_hero_name=hero_list[team_2_players[1].heroid]
      responseData.team_2_player_3_hero_name=hero_list[team_2_players[2].heroid]
      responseData.team_2_player_4_hero_name=hero_list[team_2_players[3].heroid]
      responseData.team_2_player_5_hero_name=hero_list[team_2_players[4].heroid]
       //team 2 player hero png
       responseData.team_2_player_1_hero_png=a['hero_png_path_1']+team_2_players[0].heroid+'.png'
       responseData.team_2_player_2_hero_png=a['hero_png_path_1']+team_2_players[1].heroid+'.png'
       responseData.team_2_player_3_hero_png=a['hero_png_path_1']+team_2_players[2].heroid+'.png'
       responseData.team_2_player_4_hero_png=a['hero_png_path_1']+team_2_players[3].heroid+'.png'
       responseData.team_2_player_5_hero_png=a['hero_png_path_1']+team_2_players[4].heroid+'.png'
       //team 2 player battle spell png
      responseData.team_2_player_1_battlespell=a['battle_spell_path_1']+team_2_players[0].skillid+'.png'
      responseData.team_2_player_2_battlespell=a['battle_spell_path_1']+team_2_players[1].skillid+'.png'
      responseData.team_2_player_3_battlespell=a['battle_spell_path_1']+team_2_players[2].skillid+'.png'
      responseData.team_2_player_4_battlespell=a['battle_spell_path_1']+team_2_players[3].skillid+'.png'
      responseData.team_2_player_5_battlespell=a['battle_spell_path_1']+team_2_players[4].skillid+'.png'
      //team 2 player runes Object.keys(team__players[0].rune_map).length-1
      responseData.team_2_player_1_rune=team_2_players[0].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_2_players[0].rune_map)[Object.keys(team_2_players[0].rune_map).length-1]+'.png'
      responseData.team_2_player_2_rune=team_2_players[1].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_2_players[1].rune_map)[Object.keys(team_2_players[1].rune_map).length-1]+'.png'
      responseData.team_2_player_3_rune=team_2_players[2].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_2_players[2].rune_map)[Object.keys(team_2_players[2].rune_map).length-1]+'.png'
      responseData.team_2_player_4_rune=team_2_players[3].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_2_players[3].rune_map)[Object.keys(team_2_players[3].rune_map).length-1]+'.png'
      responseData.team_2_player_5_rune=team_2_players[4].rune_map==null?'No Rune':a['rune_path_1']+Object.keys(team_2_players[4].rune_map)[Object.keys(team_2_players[4].rune_map).length-1]+'.png'
      //team 2 roles
      responseData.team_2_player_1_role=a['role_path_1']+helper.roles_id(team_2_players[0].c_role)+'.png'
      responseData.team_2_player_2_role=a['role_path_1']+helper.roles_id(team_2_players[1].c_role)+'.png'
      responseData.team_2_player_3_role=a['role_path_1']+helper.roles_id(team_2_players[2].c_role)+'.png'
      responseData.team_2_player_4_role=a['role_path_1']+helper.roles_id(team_2_players[3].c_role)+'.png'
      responseData.team_2_player_5_role=a['role_path_1']+helper.roles_id(team_2_players[4].c_role)+'.png'

       //team 2 player 1 items
      responseData.team_2_player_1_item_1=team_2_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[0].equip_list[0]||0)+'.png'
      responseData.team_2_player_1_item_2=team_2_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[0].equip_list[1]||0)+'.png'
      responseData.team_2_player_1_item_3=team_2_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[0].equip_list[2]||0)+'.png'
      responseData.team_2_player_1_item_4=team_2_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[0].equip_list[3]||0)+'.png'
      responseData.team_2_player_1_item_5=team_2_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[0].equip_list[4]||0)+'.png'
      responseData.team_2_player_1_item_6=team_2_players[0].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[0].equip_list[5]||0)+'.png'

      responseData.team_2_player_2_item_1=team_2_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[1].equip_list[0]||0)+'.png'
      responseData.team_2_player_2_item_2=team_2_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[1].equip_list[1]||0)+'.png'
      responseData.team_2_player_2_item_3=team_2_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[1].equip_list[2]||0)+'.png'
      responseData.team_2_player_2_item_4=team_2_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[1].equip_list[3]||0)+'.png'
      responseData.team_2_player_2_item_5=team_2_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[1].equip_list[4]||0)+'.png'
      responseData.team_2_player_2_item_6=team_2_players[1].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[1].equip_list[5]||0)+'.png'

      responseData.team_2_player_3_item_1=team_2_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[2].equip_list[0]||0)+'.png'
      responseData.team_2_player_3_item_2=team_2_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[2].equip_list[1]||0)+'.png'
      responseData.team_2_player_3_item_3=team_2_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[2].equip_list[2]||0)+'.png'
      responseData.team_2_player_3_item_4=team_2_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[2].equip_list[3]||0)+'.png'
      responseData.team_2_player_3_item_5=team_2_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[2].equip_list[4]||0)+'.png'
      responseData.team_2_player_3_item_6=team_2_players[2].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[2].equip_list[5]||0)+'.png'

      responseData.team_2_player_4_item_1=team_2_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[3].equip_list[0]||0)+'.png'
      responseData.team_2_player_4_item_2=team_2_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[3].equip_list[1]||0)+'.png'
      responseData.team_2_player_4_item_3=team_2_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[3].equip_list[2]||0)+'.png'
      responseData.team_2_player_4_item_4=team_2_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[3].equip_list[3]||0)+'.png'
      responseData.team_2_player_4_item_5=team_2_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[3].equip_list[4]||0)+'.png'
      responseData.team_2_player_4_item_6=team_2_players[3].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[3].equip_list[5]||0)+'.png'

      responseData.team_2_player_5_item_1=team_2_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[4].equip_list[0]||0)+'.png'
      responseData.team_2_player_5_item_2=team_2_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[4].equip_list[1]||0)+'.png'
      responseData.team_2_player_5_item_3=team_2_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[4].equip_list[2]||0)+'.png'
      responseData.team_2_player_5_item_4=team_2_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[4].equip_list[3]||0)+'.png'
      responseData.team_2_player_5_item_5=team_2_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[4].equip_list[4]||0)+'.png'
      responseData.team_2_player_5_item_6=team_2_players[4].equip_list==null?a['item_png_path_1']+'0.png':a['item_png_path_1']+(team_2_players[4].equip_list[5]||0)+'.png'
      function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + ':' : "";
        var mDisplay = m > 0 ? m + ':': "";
        var sDisplay = s > 0 ? s  : "";
        return hDisplay + mDisplay + sDisplay; 
    }
      //game data
      responseData.game_time=secondsToHms(b.game_time)
      responseData.team_1_total_gold=thousands_separators(b.camp_list[0].total_money)
      responseData.team_2_total_gold=thousands_separators(b.camp_list[1].total_money)

      responseData.team_1_total_tower=b.camp_list[0].kill_tower
      responseData.team_2_total_tower=b.camp_list[1].kill_tower

      responseData.team_1_total_lord=b.camp_list[0].kill_lord
      responseData.team_2_total_lord=b.camp_list[1].kill_lord

      responseData.team_1_total_turtle=b.camp_list[0].kill_totoise
      responseData.team_2_total_turtle=b.camp_list[1].kill_totoise

      responseData.team_1_total_orange_buff=b.camp_list[0].red_buff_num
      responseData.team_2_total_orange_buff=b.camp_list[1].red_buff_num

      
      responseData.team_1_total_purple_buff=b.camp_list[0].blue_buff_num
      responseData.team_2_total_purple_buff=b.camp_list[1].blue_buff_num
      //new
      responseData.team1Victory=win_camp==1?"Victory":""
      responseData.team2Victory=win_camp==2?"Victory":""


       
       
       
    });
//.get(mainurl)
//response[isarray> if array loop >array[0]]


    responseData.message = 'leelr33'
    let e={'data':[responseData,'lee']}
    const jsonContent = JSON.stringify(e);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.
    res.end(jsonContent);
  
    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    //next()
  }