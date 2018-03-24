import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IProduct } from './IProduct';

@Injectable()
export class ProductService {
    constructor(private _http: HttpClient) { }
    productUrl : string = "./api/products/products.json";
    getProducts(): Observable<IProduct[]> {
            return this._http.get<IProduct[]>(this.productUrl)//('http://localhost:4444/allProductDetailsJSON')
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
        }

    getProduct(productId: number): Observable<IProduct> {
    //     let params = new HttpParams();
    //     params = params.set('productId', productId.toString());
    //     return this._http.get<IProduct>(this.productUrl, {params : params})
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //     .catch(this.handleError);
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p=> p.productId == productId));
     }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
