import axios from 'axios'
export default function (req, res, next) {
    // req is the Node.js http request object
    console.log(req.url)

    let paramString = req.url.split('?')[1];
    let a= JSON.parse('{"' + decodeURI(paramString)
        .replace(/"/g, '\\"').replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}');
    console.log(a['key_tree'])
    axios.get("http://esportsdata.mobilelegends.com:30260/postdata?authkey=ee3af4c1a0963e7f052754e66bcb7b6f&battleid=662029327292949194&fbclid=IwAR08fGerZ6BbM11QssxSTz7dptHAnBmqVnoqQJrIRgdWODVEE1RCxM2XFQA").then((response)=>{
        console.log(response)
    });
//.get(mainurl)
//response[isarray> if array loop >array[0]]


    const responseData = {
        message:"Hello, GFG Learner",
      articleData:{
          articleName: "How to send JSON response from NodeJS",
          category:"NodeJS",
          status: "published"
      },
      endingMessage:"Visit Geeksforgeeks.org for more"
    }
     
    const jsonContent = JSON.stringify(responseData);
    res.end(jsonContent);
  
    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    //next()
  }