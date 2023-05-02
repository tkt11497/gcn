export default function (req, res, next) {
    // req is the Node.js http request object
    console.log(req.url)
    const responseData ={
        "playerInfoList" :
        [
          {
            "uID": 510002331,
            "playerOpenId": "100086",
            "playerName": "PlayerNo101",
            "picUrl": "http://down.qq.com/jdqssy/Share_Icon.png",
            "showPicUrl": false,
            "teamId": 1,
            "character": "None",
            "isFiring": false,
            "posX": -1648,
            "posY": 1054,
            "posZ": 110,
            "health": 100,
            "healthMax": 100,
            "liveState": 0,
            "killNum": 0,
            "playerKey": 1253582361,
            "gotAirDropNum": 0,
            "maxKillDistance": 0,
            "damage": 0,
            "inDamage": 0,
            "heal": 0,
            "headShotNum": 0,
            "killNumInVehicle": 0,
            "surviceTime": 0,
            "driveDistance": 0,
            "marchDistance": 100,
            "assists": 0,
            "killNumByGrenade": 0,
            "rank": 0,
      isOutSideBlueCircle: 0,
      outsideBlueCircleTime: 0,
      useFragGrenadeNum: 0,
      useSmokeGrenadeNum: 0,
      curWeaponID: 0,
      knockouts: 0,
      rescueTimes: 0,
      
      
      
          },
          {
            "uID": 510002331,
            "playerOpenId": "100086",
            "playerName": "PlayerNo101",
            "picUrl": "http://down.qq.com/jdqssy/Share_Icon.png",
            "showPicUrl": false,
            "teamId": 1,
            "character": "None",
            "isFiring": false,
            "posX": -1648,
            "posY": 1054,
            "posZ": 110,
            "health": 100,
            "healthMax": 100,
            "liveState": 0,
            "killNum": 0,
            "playerKey": 1253582361,
            "gotAirDropNum": 0,
            "maxKillDistance": 0,
            "damage": 0,
            "inDamage": 0,
            "heal": 0,
            "headShotNum": 0,
            "killNumInVehicle": 0,
            "surviceTime": 0,
            "driveDistance": 0,
            "marchDistance": 100,
            "assists": 0,
            "killNumByGrenade": 0,
            "rank": 0,
      isOutSideBlueCircle: 0,
      outsideBlueCircleTime: 0,
      useFragGrenadeNum: 0,
      useSmokeGrenadeNum: 0,
      curWeaponID: 0,
      knockouts: 0,
      rescueTimes: 0,
      
      
      
          }
        ]
      }
      
     
    const jsonContent = JSON.stringify(responseData);
    res.end(jsonContent);
  
    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    //next()
  }