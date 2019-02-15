import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
// import { map,catchError,tap } from 'rxjs/operators';
import {Product} from '../model/productmodel';
import {environment}  from '../../environments/environment';
@Injectable()
export class MerchandiseDataService {
    
    producUrl = `${environment.apiUrl}`; //replace with environment variable in production
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    constructor( private http: HttpClient){}
  
     getMerchandiseData(): Observable<Product[]>
    {
       const headers = new Headers();
      let data;
       headers.append('Accept', 'application/json');
        
        return this.http.get<Product[]>(`${this.producUrl}`); 
      //  .pipe(map( res => res ));
        
    }

    // addCart (merchandise: Merchandise): Observable<Merchandise> {
      
    //   return this.http.post<Merchandise>(`${this.uri}/addtoCart`, JSON .stringify(merchandise), this.httpOptions)
    //   .pipe(
    //      tap((merchandiseRes) => console.log(`added Merchadise w/ description = ${merchandise.ProductDescription}`)),
    //      catchError(this.handleError<Merchandise>('addMerchandise'))
    //   )
    //   }

    private handleError<T> (operation = 'operation', result?: T) {
            return (error: any): Observable<T> => {
              
              if (error.error instanceof ErrorEvent) {
                // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                  } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(
                      `Backend returned code ${error.status}, ` +
                      `body was: ${error.error}`);
                  }
            
                               
                  // Let the app keep running by returning an empty result.
                  return throwError(
                    'Error in Posting.');
                };
              }


    private extractData(res: Response) {
                let body = res;
                return body || { };
              }

  }

















   

      //  return this.http.get(`${this.uri}/merchants`)
      //   .pipe(map(data => {
      //     //console.log(data);
      //     let results = data.json().results.map(item =>{
      //       item.ProductCode,
      //       item.ProductDescription,
      //       item.ProductDollarPrice,
      //       item.ProductCoinsPrice,
      //       item.ProductQuantity,
      //       item.ProductTotalAmount
      //       });
      //       return results;
      //   }));
    
      //  return this.http.get <Merchandise[]> (`${this.uri}/merchants`)
      //         .pipe(map(data => {}))
      //         .subscribe(result => {
      //           console.log(result);
      //           });

        // ...using get request
        //return this.http.get(`${this.uri}/merchants`).map((res:Response) => res.json())
         //...errors if any
         //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));


      
      // const fetchResult = fetch (
      //   new Request(`${this.uri}/merchants`, 
      //   { method: 'GET', cache: 'reload',headers: headers  })
      //   )
      //   .then(res => res.json())
      //   .then(json => console.log(json));
      
      // const response = fetchResult;
      // if (response.ok) {
      //   const jsonData =  response.json();
      //   this.merchandiseData = jsonData;
      //   console.log(jsonData);
      // } else {
      //   console.log(response.statusText);
      //   // throw Error(response.statusText);
      // }

        //  .then(res => res.json())
        // .then(json => console.log(json));
        // for (let productValue of this.merchandiseData )
        // {
        //     //0.00026
        //     productValue.ProductCoinsPrice= parseFloat(productValue.ProductDollarPrice) *0.00026;
        //     productValue.ProductTotalAmount= parseFloat(productValue.ProductCoinsPrice) * parseInt(productValue.ProductQuantity);

        // }