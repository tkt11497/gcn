import axios from 'axios'
export default async function (req, res, next) {
    // req is the Node.js http request object
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
        responseData.team_1_name=a['team_1_name']||b.camp_list[0].team_name
        responseData.team_1_short_name=a['team_1_short_name']||b.camp_list[0].team_simple_name
        responseData.team_1_logo=a['hud_team_logo_path']+(a['team_1_name']||b.camp_list[0].team_name)+'.png'

        // responseData.team_1_name=b.camp_list[0].team_name
        // responseData.team_1_short_name=b.camp_list[0].team_simple_name
        // responseData.team_1_logo=a['hud_team_logo_path']+b.camp_list[0].team_name+'.png'

        responseData.team_1_turtle_kill=b.camp_list[0].kill_tortoise
        responseData.team_1_lord_kill=b.camp_list[0].kill_lord
        responseData.team_1_tower_kill=b.camp_list[0].kill_tower
        responseData.team_1_total_kill=b.camp_list[0].score
        responseData.team_1_total_gold=b.camp_list[0].total_money>9999?
        `${thousands_separators(b.camp_list[0].total_money).split(',')[0]}.${thousands_separators(b.camp_list[0].total_money).split(',')[1][0]}K`
        :thousands_separators(b.camp_list[0].total_money)

        responseData.team_2_name=a['team_2_name']||b.camp_list[1].team_name
        responseData.team_2_short_name=a['team_2_short_name']||b.camp_list[1].team_simple_name
        responseData.team_2_logo=a['hud_team_logo_path']+(a['team_2_name']||b.camp_list[1].team_name)+'.png'
        // responseData.team_2_name=b.camp_list[1].team_name
        // responseData.team_2_short_name=b.camp_list[1].team_simple_name
        // responseData.team_2_logo=a['hud_team_logo_path']+b.camp_list[1].team_name+'.png'

        responseData.team_2_turtle_kill=b.camp_list[1].kill_tortoise
        responseData.team_2_lord_kill=b.camp_list[1].kill_lord
        responseData.team_2_tower_kill=b.camp_list[1].kill_tower
        responseData.team_2_total_kill=b.camp_list[1].score
        responseData.team_2_total_gold=b.camp_list[1].total_money>9999?
        `${thousands_separators(b.camp_list[1].total_money).split(',')[0]}.${thousands_separators(b.camp_list[1].total_money).split(',')[1][0]}K`
        :thousands_separators(b.camp_list[1].total_money)


        let gold_difference_2_team=Math.abs(b.camp_list[0].total_money-b.camp_list[1].total_money)>9999?
        `+${thousands_separators(Math.abs(b.camp_list[0].total_money-b.camp_list[1].total_money)).split(',')[0]}.${thousands_separators(Math.abs(b.camp_list[0].total_money-b.camp_list[1].total_money)).split(',')[1][0]}K`
        :`+${thousands_separators(Math.abs(b.camp_list[0].total_money-b.camp_list[1].total_money))}`
        console.log(gold_difference_2_team)
        //if team 1 gold > team 2 gold==res.team 1 gold = gold diff,team2 gold = empty string png path is 1 and 0
        if(b.camp_list[0].total_money>b.camp_list[1].total_money){
            responseData.team_1_gold_diff=gold_difference_2_team
            responseData.team_1_gold_diff_png=a['hud_gold_diff_path']+'1.png'


            responseData.team_2_gold_diff=''
            responseData.team_2_gold_diff_png=a['hud_gold_diff_path']+'0.png'
        }else{
            responseData.team_1_gold_diff=''
            responseData.team_1_gold_diff_png=a['hud_gold_diff_path']+'0.png'


            responseData.team_2_gold_diff=gold_difference_2_team
            responseData.team_2_gold_diff_png=a['hud_gold_diff_path']+'1.png'
        }
       
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