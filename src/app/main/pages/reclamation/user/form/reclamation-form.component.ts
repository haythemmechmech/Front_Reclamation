import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { Reclamation } from 'app/model/reclamation.model';
import { Router } from '@angular/router';
import { ReclamationUserFormService } from './reclamation-form.service';
import { orderStatuses } from './order-statuses';
import { Nm_Etat } from 'app/model/etat.model';
import { ReclamationUserListService } from '../list/reclamation-list.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { Nm_Phase } from 'app/model/phase.model';
import { Action } from 'app/model/action.model';

@Component({
    selector     : 'reclamation-user-form',
    templateUrl  : './reclamation-form.component.html',
    styleUrls    : ['./reclamation-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ReclamationUserFormComponent implements OnInit, OnDestroy
{
    reclamation: Reclamation;
    
    pageType: string;
    reclamationForm: FormGroup;
    orderStatuses: any;
    etat :any;
    
    private _unsubscribeAll: Subject<any>;
    nm_Etats_id: any;
    
    nm_Type_libelle: any;
    types: any;
    
    etatTmp : Nm_Etat;
    phaseTmp : Nm_Phase;
    etats:Nm_Etat[] = [];
    phases:Nm_Phase[] = [];
    sessionOBJ : any;

    /**
     * Constructor
     *
     * @param {ReclamationUserFormService} _reclamationuserformService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _authenticationService : AuthenticationService,
        private _httpClient: HttpClient,
        private _reclamationuserformService: ReclamationUserFormService,
        private _reclamationuserlistService: ReclamationUserListService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
      //  this.reclamation = new Reclamation();
       
      //  this.etat = this.getEtat();
     
       
        this.orderStatuses = orderStatuses;

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


        this._reclamationuserformService.getEtatById('3352')
            .subscribe( (data:any)=>{
   
             this.etatTmp=data;
             
              this.etats.push(this.etatTmp);

             
                        }
                );     


this._reclamationuserformService.getPhaseById('2353')
.subscribe( (data:any)=>{
   
    this.phaseTmp=data;
  
    this.phases.push(this.phaseTmp);

    console.log(this.phases);

   
}
);     




        // Subscribe to update product on changes
        this._reclamationuserformService.onReclamationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(reclamation => {

                if ( reclamation )
                {
                    this.reclamation = reclamation;
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
                        
                            this._httpClient.get('http://localhost:8084/api/nm-type-reclamations' ,httpOptions)
                            
                                .subscribe((response: any) => {
                                    this.types = response;
                                    
                                   
                                    
                                    
                                    
                                    resolve(this.types);
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
           
            titre            : [this.reclamation.titre],
            description     : [this.reclamation.description],
            nm_TypeReclamation : [this.reclamation.nm_TypeReclamation],
            nm_Etats :[this.reclamation.nm_Etats],
            nm_Phases :[this.reclamation.phases],
            created_by :[this.reclamation.created_by],
            created_at:[this.reclamation.created_at],
            updated_at :[],
            affected_to :[this.reclamation.affected_to]
   
            
        });
        
      
        
    }

    /**
     * Save product
     */
    saveReclamation(): void
    {

       
        const data = this.reclamationForm.getRawValue();
        console.log(data);
        data.updated_at=new Date;
       
        console.log(data);

       
      

        this._reclamationuserformService.saveReclamation(data)
            .then(() => {

                // Trigger the subscription with new data
                this._reclamationuserformService.onReclamationChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                this.router.navigate(['/pages/ReclamationUser']);
                
            });
    }

    /**
     * Add product
     */
    addReclamation(): void
    {

       
        const data = this.reclamationForm.getRawValue();
       
      console.log(data);
        this.sessionOBJ =JSON.parse(sessionStorage.getItem('user'));
        
          data.created_by = JSON.parse(sessionStorage.getItem('user')).firstName +" " +JSON.parse(sessionStorage.getItem('user')).lastName; 
          data.nm_Etats=this.etats;
          data.nm_Phases=this.phases;  
          data.created_at=new Date;
          data.updated_at=new Date;
          data.affected_to="";

          console.log(data);
        this._reclamationuserformService.addReclamation(data)
            .then(() => {

                // Trigger the subscription with new data
                this._reclamationuserformService.onReclamationChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
                
                this.router.navigate(['/pages/ReclamationUser']);
            });
    }

    
   

    

   

    
}


