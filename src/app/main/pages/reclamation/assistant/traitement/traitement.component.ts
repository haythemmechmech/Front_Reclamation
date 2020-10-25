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

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { AngularMaterialElementsComponent } from 'app/main/angular-material-elements/angular-material-elements.component';
import { deepEqual } from 'assert';
import { ReclamationAssistantListService } from '../list/reclamation-list.service';
import { ReclamationDirecteurFormService } from '../../directeur/form/reclamation-form.service';
import { TraitementService } from './traitement.service';
import { Action } from 'app/model/action.model';




@Component({
    selector     : 'traitement',
    templateUrl  : './traitement.component.html',
    styleUrls    : ['./traitement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TraitementComponent implements OnInit, OnDestroy
{
    reclamation: Reclamation;
    pageType: string;
    reclamationForm: FormGroup;
    recla:Reclamation;

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
        
        private _reclamationdirecteurformService: ReclamationDirecteurFormService,
        private _reclamationassistantlistservice: ReclamationAssistantListService,
        private _traitementService: TraitementService,
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


        this._traitementService.getActions()
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
           
            
            description : [this.reclamation.description],
            
        });
    }

   

   
    



   addDescription(): void
    {
        const data = this.reclamationForm.getRawValue();
        console.log(this.actionTmp[3].description);
        console.log(this.actionTmp);
        console.log(this.actionTmp[3]);
    console.log(data.description);

    this.actionTmp[3].description=data.description;
    console.log(this.actionTmp[3]);


    this._traitementService.SaveAction(this.actionTmp[3])
           .then(() => {

                // Trigger the subscription with new data
                this._reclamationdirecteurformService.onReclamationChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                
            })  ;
    
    }
    


}


