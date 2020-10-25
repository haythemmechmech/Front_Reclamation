import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { Reclamation } from 'app/model/reclamation.model';
import { INm_Etat } from 'app/model/etat.model';

@Injectable()
export class ReclamationDirecteurListService implements Resolve<any>
{
    reclamations: any[];
    onReclamationsChanged: BehaviorSubject<any>;
    routeParams: any;
    rec: Reclamation;
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
                    this.onReclamationsChanged.next(this.reclamations);
                    console.log(this.reclamations);
                    resolve(response);
                }, reject);
        });
    }


    deleteReclamation(reclamation): Promise<any>
    {
        
console.log(reclamation);
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

    
    affecter(reclamation): void
    {



                console.log(reclamation);
        
       this.rec=reclamation;

                console.log(this.rec);


       

    }

    refuser(reclamation): void
    {



                console.log(reclamation);
        
       this.rec=reclamation;

                console.log(this.rec);


       

    }


    saveReclamation(reclamation): Promise<any>
    { 
      
        console.log(reclamation);
       
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



}




