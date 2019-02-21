const fs = require('fs');
var groceriesProductData; 


const GroceriesProductSchema = 


`
type GroceriesProduct {
    ProductCode: String!
    ProductDescription: String!
    Category: String!
    Price: Float!
    Instock: Boolean!
    UnitOfMeasure: String!

}
`

fs.readFile('./json_seed/groceriesdata.json', 
        (err, data) =>{
            groceriesProductData = JSON.parse(data);
                // console.log ("Merchant Details Data:",groceriesProductData);
        }    
            
        );

export {GroceriesProductSchema,groceriesProductData}