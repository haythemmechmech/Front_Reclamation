import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { ReclamationUserFormService } from '../form/reclamation-form.service';

@Injectable()
export class ReclamationUserListService implements Resolve<any>
{
    reclamations: any[];
    onReclamationsChanged: BehaviorSubject<any>;
    etats:any;
    routeParams: any;



    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _reclamationuserformService: ReclamationUserFormService,
        private _authenticationService : AuthenticationService,
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onReclamationsChanged = new BehaviorSubject({});
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
                this.getReclamations()
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
    getReclamations(): Promise<any>
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
                    this.reclamations = response;
                    console.log(this.reclamations);
                   
                   

                    this.onReclamationsChanged.next(this.reclamations);
                    resolve(response);
                }, reject);
        });
    }


    deleteReclamation(reclamation): Promise<any>
    {
        

        const httpOptions1 = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer '+this._authenticationService.sessiontoken
              })
  
          };

        return new Promise((resolve, reject) => {

            this._httpClient.delete('http://localhost:8084/api/reclamations/' +reclamation.id,httpOptions1)
                .subscribe(response => {
                    this.getReclamations();
                    resolve(response);
                });
        });
    }

    
    getEtat(): Promise<any>
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };


        return new Promise((resolve, reject) => {
            
                this._httpClient.get('http://localhost:8084/api/nm-etats' ,httpOptions)
                
                    .subscribe((response: any) => {
                        this.etats = response;
                        
                      
                        
                        
                        resolve(response);
                    }, reject);
            
        });
    }


}




