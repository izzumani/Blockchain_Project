import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError, observable } from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
 import { map,catchError,tap } from 'rxjs/operators';
import {Product} from '../model/productmodel';
import {environment}  from '../../environments/environment';
import {GroceriesProduct,GroceriesProductQuery } from '../model/types/types_groceriesproduct';
import {Merchant,MerchantQuery} from '../model/types/types_merchantdetails'
@Injectable()
export class MerchandiseDataService {
    
  loading: boolean;
  productData: any;

    producUrl = `${environment.apiUrl}`; //replace with environment variable in production
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    constructor( private apollo:Apollo){}
  
     getMerchandiseData(): Observable<GroceriesProduct []>
    {

       return this.apollo
      .watchQuery <GroceriesProductQuery>
        ({
          query:gql `
            query GroceriesProductList
            {  
              GroceriesProductList  
                {
                  ProductCode,
                  ProductDescription,
                  Category,
                  Price,
                  Instock,
                  UnitOfMeasure,
                }
            }
          `
        })
        .valueChanges
        .pipe(
          map(result => result.data.GroceriesProductList)
        );
        
        
    }

    getMerchantDetails () : Observable<Merchant>
    
    {

      return this.apollo
      .watchQuery <MerchantQuery>
        ({
          query:gql `
            query MerchantDetailsData
            {  
              MerchantDetailsData  
                {
                  MerchantName,
                  MerchantBitcoinKey,
                  Address,
                  City,
                  Country,
                  VatNumber,
                  PinNumber
                }
            }
          `
        })
        .valueChanges
        .pipe(
          map(result => result.data.MerchantDetailsData)
        );


    }

    
  }


