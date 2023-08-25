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
        //total damage taken
        let team_1_total_damage_taken=0
        team_1_players.map(function(item){
            team_1_total_damage_taken=team_1_total_damage_taken+item.total_hurt
        })
        let team_2_total_damage_taken=0
        team_2_players.map(function(item){
            team_2_total_damage_taken=team_2_total_damage_taken+item.total_hurt
        })
        //total tower damage
        let team_1_total_damage_turret=0
        team_1_players.map(function(item){
            team_1_total_damage_turret=team_1_total_damage_turret+item.total_damage_tower
        })
        let team_2_total_damage_turret=0
        team_2_players.map(function(item){
            team_2_total_damage_turret=team_2_total_damage_turret+item.total_damage_tower
        })



        // console.log(team_1_players,team_2_players,'team player list')
        team_1_players=await helper.role_sorter(team_1_players,hoster)
        team_2_players=await helper.role_sorter(team_2_players,hoster)
        // console.log(team_1_players,'after sorting')
        // console.log(team_2_players,'after srting')

       //team 1 player names
       responseData.team_1_player_1_name=await helper.name_finder(team_1_players[0].roleid,hoster)||team_1_players[0].name
       responseData.team_1_player_2_name=await helper.name_finder(team_1_players[1].roleid,hoster)||team_1_players[1].name
       responseData.team_1_player_3_name=await helper.name_finder(team_1_players[2].roleid,hoster)||team_1_players[2].name
       responseData.team_1_player_4_name=await helper.name_finder(team_1_players[3].roleid,hoster)||team_1_players[3].name
       responseData.team_1_player_5_name=await helper.name_finder(team_1_players[4].roleid,hoster)||team_1_players[4].name
       
       //team 1 player heroname
       responseData.team_1_player_1_hero_name=hero_list[team_1_players[0].heroid]
       responseData.team_1_player_2_hero_name=hero_list[team_1_players[1].heroid]
       responseData.team_1_player_3_hero_name=hero_list[team_1_players[2].heroid]
       responseData.team_1_player_4_hero_name=hero_list[team_1_players[3].heroid]
       responseData.team_1_player_5_hero_name=hero_list[team_1_players[4].heroid]
        //team 1 player hero png
        responseData.team_1_player_1_hero_png=a['hero_png_path_2']+team_1_players[0].heroid+'.png'
        responseData.team_1_player_2_hero_png=a['hero_png_path_2']+team_1_players[1].heroid+'.png'
        responseData.team_1_player_3_hero_png=a['hero_png_path_2']+team_1_players[2].heroid+'.png'
        responseData.team_1_player_4_hero_png=a['hero_png_path_2']+team_1_players[3].heroid+'.png'
        responseData.team_1_player_5_hero_png=a['hero_png_path_2']+team_1_players[4].heroid+'.png'

        responseData.team_1_total_damage=thousands_separators(b.camp_list[0].total_damage)
        responseData.team_1_total_damage_taken=thousands_separators(team_1_total_damage_taken)
        responseData.team_1_total_damage_turret=thousands_separators(team_1_total_damage_turret)
        responseData.team_1_turtle_lord_turret=`${b.camp_list[0].kill_totoise}/${b.camp_list[0].kill_lord}/${b.camp_list[0].kill_tower}`

       //team2
        responseData.team_2_player_1_name=await helper.name_finder(team_2_players[0].roleid,hoster)||team_2_players[0].name
       responseData.team_2_player_2_name=await helper.name_finder(team_2_players[1].roleid,hoster)||team_2_players[1].name
       responseData.team_2_player_3_name=await helper.name_finder(team_2_players[2].roleid,hoster)||team_2_players[2].name
       responseData.team_2_player_4_name=await helper.name_finder(team_2_players[3].roleid,hoster)||team_2_players[3].name
       responseData.team_2_player_5_name=await helper.name_finder(team_2_players[4].roleid,hoster)||team_2_players[4].name
       
       //team 2 player heroname
       responseData.team_2_player_1_hero_name=hero_list[team_2_players[0].heroid]
       responseData.team_2_player_2_hero_name=hero_list[team_2_players[1].heroid]
       responseData.team_2_player_3_hero_name=hero_list[team_2_players[2].heroid]
       responseData.team_2_player_4_hero_name=hero_list[team_2_players[3].heroid]
       responseData.team_2_player_5_hero_name=hero_list[team_2_players[4].heroid]
        //team 2 player hero png
        responseData.team_2_player_1_hero_png=a['hero_png_path_2']+team_2_players[0].heroid+'.png'
        responseData.team_2_player_2_hero_png=a['hero_png_path_2']+team_2_players[1].heroid+'.png'
        responseData.team_2_player_3_hero_png=a['hero_png_path_2']+team_2_players[2].heroid+'.png'
        responseData.team_2_player_4_hero_png=a['hero_png_path_2']+team_2_players[3].heroid+'.png'
        responseData.team_2_player_5_hero_png=a['hero_png_path_2']+team_2_players[4].heroid+'.png'

        responseData.team_2_total_damage=thousands_separators(b.camp_list[1].total_damage)
        responseData.team_2_total_damage_taken=thousands_separators(team_2_total_damage_taken)
        responseData.team_2_total_damage_turret=thousands_separators(team_2_total_damage_turret)
        responseData.team_2_turtle_lord_turret=`${b.camp_list[1].kill_totoise}/${b.camp_list[1].kill_lord}/${b.camp_list[1].kill_tower}`


        let team1_turtle_lord_turret=b.camp_list[0].kill_totoise+b.camp_list[0].kill_lord + b.camp_list[0].kill_tower
        let team2_turtle_lord_turret=b.camp_list[1].kill_totoise+b.camp_list[1].kill_lord + b.camp_list[1].kill_tower
        //both team
        //(Team2 totalDamage /  ( team1 totalDamage  + team2 totalDamage ) ) * 100
        responseData.damage_deal_png=a['damage_deal_png']+
        Math.round((b.camp_list[1].total_damage / (b.camp_list[0].total_damage + b.camp_list[1].total_damage) ) *  100)+'.png'
        //(Team2 totalDamageTaken /  ( team1 totalDamageTaken  + team2 totalDamageTaken ) ) * 100
        responseData.damage_taken_png=a['damage_taken_png']+
        Math.round((team_2_total_damage_taken / (team_1_total_damage_taken + team_2_total_damage_taken) ) *  100)+'.png'
        //
        responseData.turret_damage_png=a['turret_damage_png']+
        Math.round((team_2_total_damage_turret / (team_1_total_damage_turret + team_2_total_damage_turret) ) *  100)+'.png'
        //
        responseData.turtle_lord_turret_png=a['lord_turtle_turret_png']+
        Math.round((team2_turtle_lord_turret / (team1_turtle_lord_turret + team2_turtle_lord_turret) ) *  100)+'.png'
        let hightest_gpm_player;
        let hightest_damage_player;
        let hightest_damage_taken_player;
        let most_assit_player;
        function hightest_finder(){
            b.hero_list.sort(function(a, b){return b.min_money - a.min_money});
            
            hightest_gpm_player=b.hero_list[0]

            b.hero_list.sort(function(a, b){return b.total_damage - a.total_damage});
            hightest_damage_player=b.hero_list[0]

            b.hero_list.sort(function(a, b){return b.total_hurt - a.total_hurt});
            hightest_damage_taken_player=b.hero_list[0]

            b.hero_list.sort(function(a, b){return b.assist_num - a.assist_num});
            most_assit_player=b.hero_list[0]
            
        }
        hightest_finder()
        responseData.hightest_gpm_player_name=await helper.name_finder(hightest_gpm_player.roleid,hoster)||hightest_gpm_player.name
        responseData.hightest_gpm_player_png=a['player_png_path_2']+hightest_gpm_player.roleid+'.png'
        responseData.hightest_gpm_player_gpm=hightest_gpm_player.min_money

        responseData.hightest_damage_player_name=await helper.name_finder(hightest_damage_player.roleid,hoster)||hightest_damage_player.name
        responseData.hightest_damage_player_png=a['player_png_path_2']+hightest_damage_player.roleid+'.png'
        responseData.hightest_damage_player_damage=hightest_damage_player.total_damage

        responseData.hightest_damage_taken_player_name=await helper.name_finder(hightest_damage_taken_player.roleid,hoster)||hightest_damage_taken_player.name
        responseData.hightest_damage_taken_player_png=a['player_png_path_2']+hightest_damage_taken_player.roleid+'.png'
        responseData.hightest_damage_taken_player_damageTaken=hightest_damage_taken_player.total_hurt

        responseData.most_assit_player_name=await helper.name_finder(most_assit_player.roleid,hoster)||most_assit_player.name
        responseData.most_assit_player_png=a['player_png_path_2']+most_assit_player.roleid+'.png'
        responseData.most_assit_player_assit=most_assit_player.assist_num
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