var Redis = require('ioredis');
module.exports = class serviceworker {


    constructor ()
    {
        this.redisClient = new Redis({
            port: process.env.REDIS_PORT,          // Redis port
            host: process.env.REDIS_HOST,   // Redis host
            family: 4,           // 4 (IPv4) or 6 (IPv6)
            db: 8
          })
         
          this.redisClient.on("error", function (err) {
            console.log("Error " + err);
        });
        
        this.redisSubscriber = this.redisClient.duplicate();
        this.redisPublisher = this.redisClient.duplicate();
           
        this.clientCartChannel =null;
       
        
        
    }

     AddRedisCacheData (key,timeout,value)
    {
        this.redisClient.setex(key, timeout, value);
        
    }

    GetRedisCacheData (key)
    {
        this.redisClient.get(cartChannel, function (err, data) {
            if (err) {
                console.log ('Error in retrieving Channel. Session Expired. Refresh Page');
            };
    
            if (data != null) {
                this.clientCartChannel =data;
                console.log ('get channel name :',this.clientCartChannel);
            } else {
                console.log ('Session Expired. Refresh Page');
            }
        });
    }
    
    MerchantCartSubscribe (channel)
    {
    
        this.redisSubscriber.subscribe(channel, function (err, count) {
            
            if (err) {
                console.log ('Error in subscription');
            };
    
            if (count >= 1) {
                
                console.log ('the number of subscription is :', count);
            } else {
                console.log ('No current subscription');
            }

          });
           
          this.redisSubscriber.on('message', function (channel, message) {
              
            console.log('Receive message %s from channel %s', JSON.stringify(message), channel);
          });
        


    }
    MerchantCartPublish (cartChannelkey,cartItems){

        return new Promise((resolve,reject) =>{
            try {
                this.redisPublisher.publish(cartChannelkey, JSON.stringify(cartItems))
                resolve('Successful Published');
                
                
            } catch (err) {
                reject(err);
            }
             
        });

        
    }
    
}

