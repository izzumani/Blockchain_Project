
const sha256 = require('sha256');

module.exports = class merchantdata {

    constructor ()
    {
        this.merchandiseData =[];
   }

   getmerchandiseData ()
   {
    this.merchandiseData = [
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "001",
                "ProductDescription": "EL-510 Scientific Calculator",
                "Price": "13.95",
                "addedToCart":false
                
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "002",
                "ProductDescription": "SFU 1 SUBJECT COIL NOTEBOOK BLACK",
                "Price": "4.95",
                "addedToCart":false
                
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "003",
                "ProductDescription": "STAEDTLER GEOMETRY SET",
                "Price": "4.95",
                "addedToCart":false
                
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "004",
                "ProductDescription": "LAB COAT",
                "Price": "18.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "005",
                "ProductDescription": "DISSECTING KIT",
                "Price": "13.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "006",
                "ProductDescription": "SAFETY GOGGLES VS180",
                "Price": "6.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "007",
                "ProductDescription": "CARDIGAN SFU MAPLE LEAF SHAWL COLLAR",
                "Price": "64",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "008",
                "ProductDescription": "CLASSIC SFU HOODIE",
                "Price": "60",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "009",
                "ProductDescription": "BOAT PEOPLE Book",
                "Price": "24.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "010",
                "ProductDescription": "AMERICAN WAR Book",
                "Price": "21",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "011",
                "ProductDescription": "PRECIOUS CARGO Book",
                "Price": "24.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "012",
                "ProductDescription": "SFU LADIES FULL ZIP HOODIE",
                "Price": "49.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "013",
                "ProductDescription": "LADIES SNOWFLAKE ZIP HOODIE",
                "Price": "69.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "014",
                "ProductDescription": "BÖUES BATH BOMB CUCUMBER MELON MEDIUM",
                "Price": "5.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "015",
                "ProductDescription": "SFU 1 SUBJECT COIL NOTEBOOK BLACK",
                "Price": "4.95",
                "addedToCart":false
            },
            {
                "MerchantHashCode": sha256("Izzumani Bookstore"),
                "MerchantName": "Izzumani Bookstore",
                "ProductCode": "016",
                "ProductDescription": "BÖUES SOAP RAW HONEY&OATMEAL",
                "Price": "7.95",
                "addedToCart":false
            },
        ];

        return this.merchandiseData;
   }


   
}