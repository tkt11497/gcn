import axios from 'axios'
import helper from './helper.js';
const store = require('data-store')('abc', { cwd: 'server-middleware/datastore' });
export default async function (req, res, next) {

    // req is the Node.js http request object
    let responseData={};
    let paramString = req.url.split('?')[1];
    let a= JSON.parse('{"' + decodeURI(paramString)
        .replace(/"/g, '\\"').replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}');
        if (a['data']=='get'){
            responseData.message = 'success'
            let e={'data':[responseData,store.data]}
            const jsonContent = JSON.stringify(e);
            res.end(jsonContent);
            return
        }
        if(a['data']=='clear'){
            store.clear();
        }
        else{
            var c= JSON.parse(a['data'])
            //console.log(c,'sadsad')
            store.set('player_list', c); 
            //console.log(store.data);
        }
   





    responseData.message = 'success'
    let e={'data':[responseData,store.data]}
    const jsonContent = JSON.stringify(e);
    res.end(jsonContent);
  
  }