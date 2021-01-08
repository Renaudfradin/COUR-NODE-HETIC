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

const knex = require("knex")({
    client :"pg",
    connection:{
        connectionString: 'postgres://qjhlbpyvvhtbhm:973f1429c729d05fa72509654039394cdd5fed3c0c89366920860458e75c6f74@ec2-54-78-127-245.eu-west-1.compute.amazonaws.com:5432/d86ape4d1799q2?sllmode=disable',
        ssl:{
            rejectUnauthorized: false,
        }
    },
});



//middleware peut venir avant ou aprés l'execution du handler
//Handler /get /post

app.use(express.json()); //recupere une reponse en json

app.get('/', (req , res) =>{
    //console.log("Request",req);
    return res.status(200).json({
        hello:'world',
        statusCode: 200,
    });
});

app.post('/login',(req,res)=>{
    analytics.identify({
        userId:req.body.userId,
        traits: {
          name: req.body.name,
          email: req.body.email,
        }
    });
    return res.status(201).json({
        statusCode: 201,
        hello:'worldpost'
    });
});



app.get('/users', async (req, res) => {

    let users = [];
    try {
        users = await knex.select(['id','fist_name','last_name','email','username','created_at']).from('users');
    } catch (error) {
        console.log('An error occured: ', error);
        return res.status(500).json({
            statusCode: 500,
            message: 'internal serveur error',
            errors:[{
                message:'failed to query database',
            }],
        });
    }
    console.log(users);
    return res.status(200).json({
        statusCode: 200,
        message: 'succcesful',
        data: users,
    });
});


app.listen(3000, () =>{
    console.log("start on 3000");
});