const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const serviceworker = require('./serviceworker');
const uuid = require('uuid/v1');
const rp = require('request-promise');
const process =require('process');


const app = express();

const blockchainPort =process.env.BLOCKCHAIN_PORT;

const sWorker = new serviceworker();

// const _merchant = new merchant();
const nodeAddress = uuid().split('-').join('');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use(cors({
//     origins:"*",
//     credentials: true, 
//     origin: true}))
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

    res.send ("Welcome to Blockchain Applications");   

    
});

app.post('/merchantconfirmPayment',function(req,res)

{
   //Call the client socker IO to confirm  payments



   res.status(200)
   .json({note:`Successful Payments data: ${req.body}`})
   .end();

   //Call the merchant API for successful payments

   //Subscribe for merchant blockchain payments

    // sWorker.MerchantCartSubscribe('merchant_01');
    // console.log('subscribed to channel merchant_01  ')
    // res.send (_merchant.getmerchandiseData());   

    
});


/*

app.post('/addtoCart',function(req,res){
   

sWorker.MerchantCartPublish('merchant_01', req.body)
.then ((data) =>{
    res.status(200)
    .json({note:data})
    .end();
    
})
.catch((err)=>{

    res.status(500)
    .json({note:'Error: ',err})
    .end();

    console.log(err);  

   });

   console.log('received for publish')


});

app.get('/blockchain',function(req,res)
{
    res.send (bitcoin);   

    
});

app.post('/register-and-broadcast-node',function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl)== -1) bitcoin.networkNodes.push(newNodeUrl);
    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions ={
            uri : networkNodeUrl + '/register-node',
            method: 'POST',
            body: {newNodeUrl:newNodeUrl},
            json:true
        };
        regNodesPromises.push(rp(requestOptions));
    });
    
    Promise.all(regNodesPromises)
    .then(data =>{
        
        const bulkRegisterOptions ={
            uri:newNodeUrl + '/register-nodes-bulk',
            method:'POST',
            body: {allNetworkNodes:[...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
            json:true
        };
        return rp(bulkRegisterOptions);
    })
    .then (data =>{
        res.json({note:'New node registered with network successfully.'});
    });
});


app.post('/transaction',function(req,res)
{
    const newTransaction = req.body;
    bitcoin.addTransactionToPendingTransactions(newTransaction);


    res.json({note:`Transaction will be added in block ${bitcoin.blockIndex}`});
    

});
app.post('/transaction/broadcast',function(req,res){

    try {
    
        const newTransaction = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
        bitcoin.addTransactionToPendingTransactions(newTransaction);
        
        
    const requestPromises =[];
    bitcoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions ={
            uri:networkNodeUrl + '/transaction',
            method:'POST',
            body:newTransaction,
            json:true
        };
        requestPromises.push( rp(requestOptions));
    });
    Promise.all(requestPromises)
    .then (data =>{
        res.json({note:'Transaction created and broadcast successfully.'});
    })
    .catch((err)=>{
        res.json({note:'Error on transaction posting.'});
    });
    

   res.status(200)
   .json({note:'Transaction created and broadcast successfully.'})
   .end();
   
    } catch (e) {
    
        res.status(500)
            .json({note:'Error: in Transaction Broadcast.'})
                .end();

            console.log(e);        
    }
    
    
    
    
});


app.get('/mine',function(req,res)
{
        //const lastBlock = bitcoin.getLastBlock();
   //const previousBlockHash =lastBlock['hash']; 
   var previousBlockHash ="0"; 
   bitcoin.getOldBlockHash ()
   .then ((prevblockHash)=>{
    previousBlockHash = prevblockHash;
    console.log('previous block hash: ',previousBlockHash);
    const currentBlockData = {
        transactions:bitcoin.pendingTransaction,
        index:bitcoin.blockIndex
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
    bitcoin.createNewTransaction (12.5,"00",nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);
    bitcoin.insertNewBlock (bitcoin.ownerID,newBlock.index,newBlock.timestamp,newBlock.transactions,newBlock.nonce,newBlock.hash,newBlock.previousBlockHash);

    
   const requestPromises =[];
   bitcoin.networkNodes.forEach(networkNodeUrl =>{
       const requestOptions ={
           uri:networkNodeUrl + '/receive-new-block',
           method:'POST',
           body:{newBlock:newBlock},
           json:true
       };
       requestPromises.push(rp(requestOptions));
   });
   Promise.all(requestPromises)
   .then (data =>{
       const requestOptions ={
           uri:bitcoin.currentNodeUrl + '/transaction/broadcast',
           method: 'POST',
           body :{
               amount:12.5,
               sender:"00",
               recipient:nodeAddress
           },
           json:true
       };
       return rp(requestOptions);
   })
   .then (data =>{
    res.json({
        note:"New Block mined successful",
        block: newBlock
    });
   });
 



    res.status(200)
    .json({note:'blocked Mined Successfuly.'})
    .end();

   })
   .catch((err)=>{

    res.status(500)
    .json({note:'Error: ',err})
    .end();

    console.log(err);  

   });

 

   


});


app.post('/register-node',function(req,res){
const newNodeUrl = req.body.newNodeUrl;
const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) ==-1;
const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
console.log(`node url ${newNodeUrl} not already present ${nodeNotAlreadyPresent} and not current node ${notCurrentNode} as ${bitcoin.currentNodeUrl}`);
if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);

res.send({note:'New Node registered successfully'});
});


app.post('/register-nodes-bulk',function(req,res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl =>{
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) ==-1;
        const notCurrentNode = bitcoin.currentNodeUrl !==networkNodeUrl;
        // console.log(`node url ${networkNodeUrl} not already present ${nodeNotAlreadyPresent} and not current node ${notCurrentNode}`);

        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });
    res.json({note:'Bulk registration successful.'});
});
*/



app.listen(blockchainPort,function(){
    console.log(`Listening on port ${blockchainPort}...`);
});




// const http = require('http').Server(app);
// const server = require('http').createServer();
//const io = require('socket.io')(server);

// const io = require("socket.io")(http, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }
// });