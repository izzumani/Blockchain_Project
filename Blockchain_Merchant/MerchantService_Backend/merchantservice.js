const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const merchant = require('./merchantdata');


const uuid = require('uuid/v1');
const rp = require('request-promise');
const process =require('process');

const app = express();

const port =process.env.MERCHANT_PORT;

const _merchant = new merchant();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }

  app.use(cors(corsOptions))

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
app.get('/',function(req,res)
{

    res.send (_merchant.getmerchandiseData());   

    
});

app.get('/payment',function(req,res){
    


    
});

app.listen(port,function(){
    console.log(`Listening on port ${port}...`);
});
