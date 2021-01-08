//call api Avec une library
/*
const axios = require("axios");
axios.get("https://api.chucknorris.io/jokes/random")
.then(response =>{
    console.log("Response:",response);
})
.catch(error =>{
    console.log("Error:",error);
})*/

//call api AVEC un SDK
/*
var Analytics = require('analytics-node');
var analytics = new Analytics('FNHMiZJOqi3hBERgUFhiG2RHbPCrY7lU');

analytics.identify({
    userId:'f4ca124298',
    traits: {
      name: 'Michael Bolton',
      email: 'mbolton@example.com',
      createdAt: new Date('2014-06-14T02:00:19.467Z')
    }
});
*/
const express = require("express");
const app = express();
var Analytics = require('analytics-node');
var analytics = new Analytics('FNHMiZJOqi3hBERgUFhiG2RHbPCrY7lU');

app.use(express.json());

app.get('/', (req , res) =>{
    //console.log("Request",req);
    return res.status(200).json({
        hello:'world'
    });
});

app.post('/login',(req,res)=>{
    analytics.identify({
        userId:'f4ca124298',
        traits: {
          name: 'Michael Bolton',
          email: 'mbolton@example.com',
          createdAt: new Date('2014-06-14T02:00:19.467Z')
        }
    });
    return res.status(201).json({
        hello:'worldpost'
    });
});


app.listen(3000, () =>{
    console.log("start on 3000");
});