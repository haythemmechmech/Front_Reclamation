import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { INm_Etat } from 'app/model/etat.model';
import { INm_Phase } from 'app/model/phase.model';

@Injectable()
export class ReclamationDirecteurFormService implements Resolve<any>
{
    routeParams: any;
    reclamation: any;
    onReclamationChanged: BehaviorSubject<any>;

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
                this.getReclamation()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getReclamation(): Promise<any>
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };


        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onReclamationChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get('http://localhost:8084/api/reclamations/' + this.routeParams.id,httpOptions)
                
                    .subscribe((response: any) => {
                        this.reclamation = response;
                       
                        this.onReclamationChanged.next(this.reclamation);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveReclamation(reclamation): Promise<any>
    { 
      
        reclamation.id = this.routeParams.id;
       
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };

        return new Promise((resolve, reject) => {
            this._httpClient.put('http://localhost:8084/api/reclamations',reclamation,httpOptions)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addReclamation(reclamation): Promise<any>
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };

        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:8084/api/reclamations',reclamation,httpOptions)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }



    getEtatById(id): any
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };

 
            
     return   this._httpClient.get<INm_Etat>('http://localhost:8084/api/nm-etats/'+id  ,httpOptions);
                
        
    }


 
    getPhaseById(id): any
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };

 
            
     return   this._httpClient.get<INm_Phase>('http://localhost:8084/api/nm-phases/'+id  ,httpOptions);
                
        
    }
    getTypeById(id): Promise<any>
    {

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
            })
          };


        return new Promise((resolve, reject) => {
            
                this._httpClient.get('http://localhost:8084/api/nm-type-reclamations/'+id  ,httpOptions)
                
                    .subscribe((response: any) => {
                        
    
                        resolve(response);
                    }, reject);
            
        });
    }



}
