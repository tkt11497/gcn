import axios from 'axios'
import helper from './helper.js';
export default async function (req, res, next) {

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
         117: "FREDRINN", 118: "JOY", 119: "ALOTT", 120: "ALOTT"}
    let responseData={};
    let paramString = req.url.split('?')[1];
    let a= JSON.parse('{"' + decodeURI(paramString)
        .replace(/"/g, '\\"').replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}');
    console.log(a,'sadsad')
    let hit_url=`http://esportsdata.mobilelegends.com:30260/battledata?authkey=${a['authkey']}&battleid=${a['battleid']}&dataid=1`
    await axios.get(hit_url).then((response)=>{
        //console.log(response.data.data)
        let b=response.data.data
        responseData.team_1_name=b.camp_list[0].team_name
        responseData.team_1_short_name=b.camp_list[0].team_simple_name
        responseData.team_1_logo=a['draft_logo_path']+b.camp_list[0].team_name+'.png'

        responseData.team_1_player_1_name=helper.name_finder(b.camp_list[0].player_list[0].roleid)||b.camp_list[0].player_list[0].name
        responseData.team_1_player_2_name=helper.name_finder(b.camp_list[0].player_list[1].roleid)||b.camp_list[0].player_list[1].name
        responseData.team_1_player_3_name=helper.name_finder(b.camp_list[0].player_list[2].roleid)||b.camp_list[0].player_list[2].name
        responseData.team_1_player_4_name=helper.name_finder(b.camp_list[0].player_list[3].roleid)||b.camp_list[0].player_list[3].name
        responseData.team_1_player_5_name=helper.name_finder(b.camp_list[0].player_list[4].roleid)||b.camp_list[0].player_list[4].name

        responseData.team_1_player_1_png=a['draft_player_path']+b.camp_list[0].player_list[0].roleid+'.png'
        responseData.team_1_player_2_png=a['draft_player_path']+b.camp_list[0].player_list[1].roleid+'.png'
        responseData.team_1_player_3_png=a['draft_player_path']+b.camp_list[0].player_list[2].roleid+'.png'
        responseData.team_1_player_4_png=a['draft_player_path']+b.camp_list[0].player_list[3].roleid+'.png'
        responseData.team_1_player_5_png=a['draft_player_path']+b.camp_list[0].player_list[4].roleid+'.png'

        responseData.team_1_player_1_pick_hero_name=hero_list[b.camp_list[0].player_list[0].heroid]
        responseData.team_1_player_2_pick_hero_name=hero_list[b.camp_list[0].player_list[1].heroid]
        responseData.team_1_player_3_pick_hero_name=hero_list[b.camp_list[0].player_list[2].heroid]
        responseData.team_1_player_4_pick_hero_name=hero_list[b.camp_list[0].player_list[3].heroid]
        responseData.team_1_player_5_pick_hero_name=hero_list[b.camp_list[0].player_list[4].heroid]

        responseData.team_1_player_1_pick_hero_png=a['draft_hero_path']+b.camp_list[0].player_list[0].heroid+'.png'
        responseData.team_1_player_2_pick_hero_png=a['draft_hero_path']+b.camp_list[0].player_list[1].heroid+'.png'
        responseData.team_1_player_3_pick_hero_png=a['draft_hero_path']+b.camp_list[0].player_list[2].heroid+'.png'
        responseData.team_1_player_4_pick_hero_png=a['draft_hero_path']+b.camp_list[0].player_list[3].heroid+'.png'
        responseData.team_1_player_5_pick_hero_png=a['draft_hero_path']+b.camp_list[0].player_list[4].heroid+'.png'

        responseData.team_1_player_1_ban_hero_name=hero_list[b.camp_list[0].player_list[0].ban_heroid]
        responseData.team_1_player_2_ban_hero_name=hero_list[b.camp_list[0].player_list[1].ban_heroid]
        responseData.team_1_player_3_ban_hero_name=hero_list[b.camp_list[0].player_list[2].ban_heroid]
        responseData.team_1_player_4_ban_hero_name=hero_list[b.camp_list[0].player_list[3].ban_heroid]
        responseData.team_1_player_5_ban_hero_name=hero_list[b.camp_list[0].player_list[4].ban_heroid]

        responseData.team_1_player_1_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[0].player_list[0].ban_heroid+'.png'
        responseData.team_1_player_2_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[0].player_list[1].ban_heroid+'.png'
        responseData.team_1_player_3_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[0].player_list[2].ban_heroid+'.png'
        responseData.team_1_player_4_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[0].player_list[3].ban_heroid+'.png'
        responseData.team_1_player_5_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[0].player_list[4].ban_heroid+'.png'



        responseData.team_2_name=b.camp_list[1].team_name
        responseData.team_2_short_name=b.camp_list[1].team_simple_name
        responseData.team_2_logo=a['draft_logo_path']+b.camp_list[1].team_name+'.png'

        responseData.team_2_player_1_name=helper.name_finder(b.camp_list[1].player_list[0].roleid)||b.camp_list[1].player_list[0].name
        responseData.team_2_player_2_name=helper.name_finder(b.camp_list[1].player_list[1].roleid)||b.camp_list[1].player_list[1].name
        responseData.team_2_player_3_name=helper.name_finder(b.camp_list[1].player_list[2].roleid)||b.camp_list[1].player_list[2].name
        responseData.team_2_player_4_name=helper.name_finder(b.camp_list[1].player_list[3].roleid)||b.camp_list[1].player_list[3].name
        responseData.team_2_player_5_name=helper.name_finder(b.camp_list[1].player_list[4].roleid)||b.camp_list[1].player_list[4].name

        responseData.team_2_player_1_png=a['draft_player_path']+b.camp_list[1].player_list[0].roleid+'.png'
        responseData.team_2_player_2_png=a['draft_player_path']+b.camp_list[1].player_list[1].roleid+'.png'
        responseData.team_2_player_3_png=a['draft_player_path']+b.camp_list[1].player_list[2].roleid+'.png'
        responseData.team_2_player_4_png=a['draft_player_path']+b.camp_list[1].player_list[3].roleid+'.png'
        responseData.team_2_player_5_png=a['draft_player_path']+b.camp_list[1].player_list[4].roleid+'.png'
            //b.camp_list[1].player_list[0].picking==true?pickingurl:pciking==false&&heroid!=null?heropng:pickfasleurl
        responseData.team_2_player_1_pick_hero_name=hero_list[b.camp_list[1].player_list[0].heroid]
        responseData.team_2_player_2_pick_hero_name=hero_list[b.camp_list[1].player_list[1].heroid]
        responseData.team_2_player_3_pick_hero_name=hero_list[b.camp_list[1].player_list[2].heroid]
        responseData.team_2_player_4_pick_hero_name=hero_list[b.camp_list[1].player_list[3].heroid]
        responseData.team_2_player_5_pick_hero_name=hero_list[b.camp_list[1].player_list[4].heroid]

        responseData.team_2_player_1_pick_hero_png=a['draft_hero_path']+b.camp_list[1].player_list[0].heroid+'.png'
        responseData.team_2_player_2_pick_hero_png=a['draft_hero_path']+b.camp_list[1].player_list[1].heroid+'.png'
        responseData.team_2_player_3_pick_hero_png=a['draft_hero_path']+b.camp_list[1].player_list[2].heroid+'.png'
        responseData.team_2_player_4_pick_hero_png=a['draft_hero_path']+b.camp_list[1].player_list[3].heroid+'.png'
        responseData.team_2_player_5_pick_hero_png=a['draft_hero_path']+b.camp_list[1].player_list[4].heroid+'.png'

        responseData.team_2_player_1_ban_hero_name=hero_list[b.camp_list[1].player_list[0].ban_heroid]
        responseData.team_2_player_2_ban_hero_name=hero_list[b.camp_list[1].player_list[1].ban_heroid]
        responseData.team_2_player_3_ban_hero_name=hero_list[b.camp_list[1].player_list[2].ban_heroid]
        responseData.team_2_player_4_ban_hero_name=hero_list[b.camp_list[1].player_list[3].ban_heroid]
        responseData.team_2_player_5_ban_hero_name=hero_list[b.camp_list[1].player_list[4].ban_heroid]

        responseData.team_2_player_1_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[1].player_list[0].ban_heroid+'.png'
        responseData.team_2_player_2_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[1].player_list[1].ban_heroid+'.png'
        responseData.team_2_player_3_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[1].player_list[2].ban_heroid+'.png'
        responseData.team_2_player_4_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[1].player_list[3].ban_heroid+'.png'
        responseData.team_2_player_5_ban_hero_png=a['draft_hero_path_ban']+b.camp_list[1].player_list[4].ban_heroid+'.png'
        ///new

        responseData.team_1_player_1_picking_url=b.camp_list[0].player_list[0].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_1_player_2_picking_url=b.camp_list[0].player_list[1].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_1_player_3_picking_url=b.camp_list[0].player_list[2].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_1_player_4_picking_url=b.camp_list[0].player_list[3].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_1_player_5_picking_url=b.camp_list[0].player_list[4].picking==true?a['pick_true_url']:a['pick_false_url']

        responseData.team_1_player_1_banning_url=b.camp_list[0].player_list[0].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_1_player_2_banning_url=b.camp_list[0].player_list[1].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_1_player_3_banning_url=b.camp_list[0].player_list[2].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_1_player_4_banning_url=b.camp_list[0].player_list[3].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_1_player_5_banning_url=b.camp_list[0].player_list[4].banning==true?a['ban_true_url']:a['ban_false_url']

        //b.camp_list[1].player_list[0].picking==true?pickingurl:pciking==false&&heroid!=null?heropng:pickfasleurl
        responseData.team_2_player_1_picking_url=b.camp_list[1].player_list[0].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_2_player_2_picking_url=b.camp_list[1].player_list[1].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_2_player_3_picking_url=b.camp_list[1].player_list[2].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_2_player_4_picking_url=b.camp_list[1].player_list[3].picking==true?a['pick_true_url']:a['pick_false_url']
        responseData.team_2_player_5_picking_url=b.camp_list[1].player_list[4].picking==true?a['pick_true_url']:a['pick_false_url']

        responseData.team_2_player_1_banning_url=b.camp_list[1].player_list[0].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_2_player_2_banning_url=b.camp_list[1].player_list[1].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_2_player_3_banning_url=b.camp_list[1].player_list[2].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_2_player_4_banning_url=b.camp_list[1].player_list[3].banning==true?a['ban_true_url']:a['ban_false_url']
        responseData.team_2_player_5_banning_url=b.camp_list[1].player_list[4].banning==true?a['ban_true_url']:a['ban_false_url']
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