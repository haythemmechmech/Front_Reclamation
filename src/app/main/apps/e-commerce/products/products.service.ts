import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';

@Injectable()
export class EcommerceProductsService implements Resolve<any>
{
    products: any[];
    onProductsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
       
        private _authenticationService : AuthenticationService,
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any>
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };

        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8084/api/reclamations',httpOptions)
                .subscribe((response: any) => {
                    this.products = response;
                    this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }


    deleteReclamation(product): Promise<any>
    {
        
console.log(product);
        const httpOptions1 = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer '+this._authenticationService.sessiontoken
              })
  
          };

        return new Promise((resolve, reject) => {

            this._httpClient.delete('http://localhost:8084/api/reclamations/' +product.id,httpOptions1)
                .subscribe(response => {
                    this.getProducts();
                    resolve(response);
                });
        });
    }



}




