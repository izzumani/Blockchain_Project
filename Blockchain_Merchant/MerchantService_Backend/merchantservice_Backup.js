const process =require('process');
const port =process.env.MERCHANT_PORT;
const fs = require('fs');



import { GraphQLServer } from 'graphql-yoga';
import {merchantSchema,merchantDetailsData} from './merchantdetailsschema';
import {GroceriesProductSchema,groceriesProductData} from './groceriesschema';


const typeDefs = `
type Query {
  MerchantDetailsData:Merchant!
  GroceriesProductList:[GroceriesProduct!]!
  FilterGroceriesByCategory (Category: String!): [GroceriesProduct!]!
  GroceriesPriceRange (fromPrice: Float!,toPrice: Float): [GroceriesProduct!]!

}
${merchantSchema}

${GroceriesProductSchema  }
`

const resolvers = {
  Query : {
    MerchantDetailsData (){
      
      return   merchantDetailsData
      
    },
    GroceriesProductList ()
    {
      return groceriesProductData;
    },

  FilterGroceriesByCategory (parent,args,ctx,info) {
    
    return groceriesProductData.filter ((product)=>{
      return product.Category.toLowerCase() ==args.Category.toLowerCase();
    });
  },

  GroceriesPriceRange (parent,args,ctx,info) {
    let fromPrice =args.fromPrice;
    let toPrice = 0;

    args.toPrice == undefined ? toPrice = args.fromPrice  : toPrice = args.toPrice;
     console.log (`Get product with price between ${fromPrice} and ${toPrice}`);
    return groceriesProductData.filter ((product)=>{
      return product.Price >=fromPrice && product.Price <= toPrice;
    });
  }

  
  }
  
  
}

const options = {
  port:port,
  endpoint: '/',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const server = new GraphQLServer ({
typeDefs,
resolvers

});

server.start (options,()=>  console.log('The server is up'))
/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const merchant = require('./merchantdata');


const uuid = require('uuid/v1');
const rp = require('request-promise');


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
*/