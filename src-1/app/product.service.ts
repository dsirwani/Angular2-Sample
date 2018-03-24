import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './products/products';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class ProductService {
  productUrl : string = "./api/products/products.json";

  constructor(private httpClient : HttpClient) { }

  getProducts(): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(this.productUrl).do(data => console.log('All' + JSON.stringify(data))).
              catch(this.handleError);
  }

  getProduct(id: number): Observable<IProduct>{
    return this.getProducts()
                .map((products: IProduct[]) => products.find(p=> p.productId == id));
  }

  private handleError( err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof Error){
        errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage =`Server returned code ${err.status}, error message is: ${err.message}`;
    }
    return Observable.throw(errorMessage);
  }
}
