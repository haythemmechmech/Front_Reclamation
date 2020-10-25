import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { IAction } from 'app/model/action.model';

@Injectable()
export class TraitementService implements Resolve<any>
{
    routeParams: any;
    reclamation: any;
    onReclamationChanged: BehaviorSubject<any>;
    users: any;
    actions :any[];

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




    AddDescription(reclamation):   Promise<any>
    {
        
           
            const httpOptions = {
          headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
            };

return new Promise((resolve, reject) => {
    this._httpClient.put('http://localhost:8084/api/actions',reclamation,httpOptions)
        .subscribe((response: any) => {
            resolve(response);
            
        }, reject);
});




    }
    
    

    getActions(): any
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };

        return    this._httpClient.get<IAction>('http://localhost:8084/api/actions',httpOptions);
                
        
    }

    SaveAction(action):   Promise<any>
    {
        
           
            const httpOptions = {
          headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
            };

return new Promise((resolve, reject) => {
    this._httpClient.put('http://localhost:8084/api/actions',action,httpOptions)
        .subscribe((response: any) => {
            resolve(response);
            
        }, reject);
});




    }

   


   
}
