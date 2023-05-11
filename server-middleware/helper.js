const store = require('data-store')('abc', { cwd: 'server-middleware/datastore' });
export default {
  name_finder(roleid){
    if(store.data.player_list[roleid]){
      return store.data.player_list[roleid].name
    }else{
      return null
    }
  },
  roles_letter(letter){
    let a={
      'exp':1,
      'jg':2,
      'mid':3,
      'gold':4,
      'roam':5,
    }
    if(a[letter]){
      return a[letter]
    }else{
      return 0
    }
    
  },
  roles_id(id){
    let a={
      1:'exp',
      2:'jg',
      3:'mid',
      4:'gold',
      5:'roam',
    }
    if(a[id]){
      return a[id]
    }else{
      return 'not defined'
    }
  },
    role_sorter(array){
      // console.log(store.data.data[333])
      //console.log(store.data.player_list)
      console.log('hehrehredasssssssssssssssssssssssssssss')
       if(store.data.player_list[array[0].roleid])//find player data in stored player list if true
       {
        array[0].c_role=this.roles_letter(store.data.player_list[array[0].roleid].role)
       }else{
        array[0].c_role='undefined'
       }

       if(store.data.player_list[array[1].roleid])//find player data in stored player list if true
       {
        array[1].c_role=this.roles_letter(store.data.player_list[array[1].roleid].role)
       }else{
        array[1].c_role='undefined'
       }
       
       if(store.data.player_list[array[2].roleid])//find player data in stored player list if true
       {
        array[2].c_role=this.roles_letter(store.data.player_list[array[2].roleid].role)
       }else{
        array[2].c_role='undefined'
       }
       if(store.data.player_list[array[3].roleid])//find player data in stored player list if true
       {
        array[3].c_role=this.roles_letter(store.data.player_list[array[3].roleid].role)
       }else{
        array[3].c_role='undefined'
       }
       if(store.data.player_list[array[4].roleid])//find player data in stored player list if true
       {
        array[4].c_role=this.roles_letter(store.data.player_list[array[4].roleid].role)
       }else{
        array[4].c_role='undefined'
       }

      
      //console.log(array,'beforesorting')
      array.sort(function(a, b){return a.c_role - b.c_role});
      //console.log(array,'aftersorting')
      return array
      
    },

      app_setting_filter(type,data){
  
          let a =data.find(i=>
            i.type==type)
      //   console.log(a,'appsetting_type')
        if(a){
          return a
        }else{
          return {status:''}
        }
        
        },
 
      
  }