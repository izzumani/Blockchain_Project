const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');
const fs = require('fs');
var merchantDetailsData; 

fs.readFile('./json_seed/merchantdetails.json', 
        (err, data) =>{
            
            

                     merchantDetailsData = JSON.parse(data);
                     merchantDetailsData.MerchantBitcoinKey = nodeAddress;

                     
                    }    
            
        );


const merchantSchema = 
`type Merchant {
    MerchantName: String!
    MerchantBitcoinKey: String!
    Address: String!
    City: String!
    Country: String!
    VatNumber: String!
    PinNumber: String!
  
  }`

  export {merchantSchema,merchantDetailsData}