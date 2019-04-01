

export type GroceriesProduct =  {
    ProductCode: string;
    ProductDescription: string;
    Category: string;
    Price: number;
    Instock: boolean;
    UnitOfMeasure: string;
    addedToCart: boolean;


}

export type GroceriesProductQuery = {
    GroceriesProductList : GroceriesProduct [];
} 

