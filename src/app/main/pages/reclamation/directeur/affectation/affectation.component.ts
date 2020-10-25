import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';


import { Reclamation } from 'app/model/reclamation.model';
import { Router } from '@angular/router';
import { ReclamationDirecteurFormService } from '../form/reclamation-form.service';
import { AffectationService } from './affectation.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { AngularMaterialElementsComponent } from 'app/main/angular-material-elements/angular-material-elements.component';
import { deepEqual } from 'assert';
import { ReclamationDirecteurListComponent } from '../list/reclamation-list.component';
import { ReclamationDirecteurListService } from '../list/reclamation-list.service';
import { Nm_Etat } from 'app/model/etat.model';
import { Action } from 'app/model/action.model';



@Component({
    selector     : 'affectation',
    templateUrl  : './affectation.component.html',
    styleUrls    : ['./affectation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AffectationComponent implements OnInit, OnDestroy
{
    reclamation: Reclamation;
    pageType: string;
    reclamationForm: FormGroup;
    recla:Reclamation;
    etatTmp : Nm_Etat;
    etats:Nm_Etat[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;
    user_id: any;
    users = [];
    userobj: any;
    actionTmp :Action;
    

    /**
     * Constructor
     *
     * @param {ReclamationDirecteurFormService} _reclamationdirecteurformService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _authenticationService : AuthenticationService,
        private _httpClient: HttpClient,
        private _affectationService: AffectationService,
        private _reclamationdirecteurformService: ReclamationDirecteurFormService,
        private _reclamationdirecteurlistservice: ReclamationDirecteurListService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.reclamation = new Reclamation();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {



        this._affectationService.getEtatById('1101')
        .subscribe( (data:any)=>{

         this.etatTmp=data;
         
          this.etats.push(this.etatTmp);

         
                    }
            );     

            this._affectationService.getActions()
            .subscribe( (data:any)=>{
    
             this.actionTmp=data;
             
    
                        }
                );     


        // Subscribe to update product on changes
        this._reclamationdirecteurformService.onReclamationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(reclamation => {

                if ( reclamation )
                {
                    this.reclamation = new Reclamation(reclamation);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.reclamation = new Reclamation();
                }

                this.reclamationForm = this.createReclamationForm();

                {

                    const httpOptions = {
                        headers: new HttpHeaders({
                          'Content-Type':  'application/json',
                          'Authorization': 'Bearer '+this._authenticationService.sessiontoken 
                        })
                      };
            
            
                    return new Promise((resolve, reject) => {
                        
                            this._httpClient.get('http://localhost:8084/api/users' ,httpOptions)
                            
                                .subscribe((response: any) => {
                                    this.userobj = response;

                                

                                    let j=0;
                                    for (let i = 0; i < this.userobj.length; i++) {
                                       
                                        
                                        if (JSON.stringify(this.userobj[i].authorities)==JSON.stringify(["ROLE_ASSISTANT"]))
                                        {
                                           

                                          
                                            this.users.push(this.userobj[i]);
                                           
                                       
                                      
                                    
                                        }
                                      }



                                    
                                    resolve(this.users);
                                }, reject);
                        
                    });
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createReclamationForm(): FormGroup
    {
        return this._formBuilder.group({
           
            
            User: [this.user_id],
            description : [this.reclamation.description]
            
        });
    }

   

   
   



Affecter(): void
    {
        const data = this.reclamationForm.getRawValue();
       
        
    console.log(data);

    this.actionTmp[2].description=data.description;
        this.recla=this._reclamationdirecteurlistservice.rec;
       
        this.recla.affected_to=data.User;
        this.recla.nm_Etats=this.etats;
       
        this._affectationService.Affecter(this.recla)
           .then(() => {

                // Trigger the subscription with new data
                this._reclamationdirecteurformService.onReclamationChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                
            })  ;



            this._affectationService.SaveAction(this.actionTmp[2])
            .then(() => {
 
                 // Trigger the subscription with new data
                 this._reclamationdirecteurformService.onReclamationChanged.next(data);
 
                 // Show the success message
                 this._matSnackBar.open('Product saved', 'OK', {
                     verticalPosition: 'top',
                     duration        : 2000
                 });
 
                 
              })  ;



            this.router.navigate(['/pages/ReclamationDirecteur']);
    }
    


}


