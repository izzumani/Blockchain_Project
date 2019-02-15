const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const process =require('process');
const socketioPort =process.env.SOCKETIO_PORT;
const cors = require('cors');
const app = express();

app.use(cors({
    origins:"http://localhost:* http://127.0.0.1:*",
    credentials: true,  
    origin: true}))



const server = http.createServer(app);  
//  const server = require('http').Server(app);
const io = socketIO(server);

io.on('connection', socket => {
    console.log('User connected')

    

    socket.on('PaymentDetails', (transactions)=>{
      // save the server id to rediscache

      console.log('payments Details: ', transactions);

      socket.emit(transactions.OrderReferenceID, 'confirm payments'); 
    });


     

    socket.on('registerMineNode', (msg)=>{
      console.log('Received the node');
      socket.emit('receiveMineNode', 'confirm payments');  
      }) 
  
 
    

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  

  server.listen(socketioPort,function(){
    console.log(`Listening on port ${socketioPort}...`);
});
