import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';

@Injectable()
export class GererActionService implements Resolve<any>
{
    routeParams: any;
    reclamation: any;
    onReclamationChanged: BehaviorSubject<any>;
    users: any;

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
        this.onReclamationChanged = new BehaviorSubject({});
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
        
        this.routeParams = route.params;
      
        return new Promise((resolve, reject) => {

            Promise.all([
                
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }




  

    addAction(reclamation): Promise<any>
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };

        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:8084/api/actions',reclamation,httpOptions)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }



    
    
    

   

   


   
}
