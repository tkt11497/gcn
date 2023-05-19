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
         117: "FREDRINN", 118: "JOY", 119: "ARLOTT", 120: "ARLOTT"}
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
        let mvp_player=b.hero_list.find(function(item){
            return item.campid==win_camp&&item.mvp==true
        })
        let win_camp_players=b.hero_list.filter(function(item){
            return item.campid==win_camp
        })
        let win_camp_total_kda=0
        win_camp_players.map(function(item){
            win_camp_total_kda=win_camp_total_kda+item.kda
        })
        console.log(win_camp_total_kda)

        responseData.winner_team_name=(win_camp==1?a['team_1_name']:a['team_2_name'])|| b.camp_list[win_camp-1].team_name
        responseData.winner_team_logo= a['mvp_team_logo_path']+((win_camp==1?a['team_1_short_name']:a['team_2_short_name'])|| b.camp_list[win_camp-1].team_simple_name)+'.png'
        responseData.winner_team_short_name=(win_camp==1?a['team_1_short_name']:a['team_2_short_name'])|| b.camp_list[win_camp-1].team_simple_name
       //mvpplayer
       responseData.mvp_player_name=await helper.name_finder(mvp_player.roleid,hoster)||mvp_player.name
       responseData.mvp_player_photo= a['mvp_player_png_path']+mvp_player.roleid+'.png'
       responseData.mvp_player_kda=`${mvp_player.kill_num}/${mvp_player.dead_num}/${mvp_player.assist_num}`
       responseData.mvp_player_gpm=mvp_player.min_money
       responseData.mvp_player_kill_percentage=Math.round((mvp_player.kda/win_camp_total_kda)*100)
       responseData.mvp_player_battlespell=a['mvp_battle_spell_path']+mvp_player.skillid+'.png'
       responseData.mvp_player_item_1=a['mvp_item_png_path']+(mvp_player.equip_list[0]||0)+'.png'
       responseData.mvp_player_item_2=a['mvp_item_png_path']+(mvp_player.equip_list[1]||0)+'.png'
       responseData.mvp_player_item_3=a['mvp_item_png_path']+(mvp_player.equip_list[2]||0)+'.png'
       responseData.mvp_player_item_4=a['mvp_item_png_path']+(mvp_player.equip_list[3]||0)+'.png'
       responseData.mvp_player_item_5=a['mvp_item_png_path']+(mvp_player.equip_list[4]||0)+'.png'
       responseData.mvp_player_item_6=a['mvp_item_png_path']+(mvp_player.equip_list[5]||0)+'.png'

       responseData.mvp_player_hero_name=hero_list[mvp_player.heroid]
       responseData.mvp_player_hero_png=a['mvp_hero_png_path']+mvp_player.heroid+'.png'
       
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