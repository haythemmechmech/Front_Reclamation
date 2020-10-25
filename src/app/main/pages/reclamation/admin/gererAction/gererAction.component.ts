import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';



import { Router } from '@angular/router';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';
import { AngularMaterialElementsComponent } from 'app/main/angular-material-elements/angular-material-elements.component';
import { deepEqual } from 'assert';
import { AffectationService } from '../../directeur/affectation/affectation.service';
import { ReclamationDirecteurFormService } from '../../directeur/form/reclamation-form.service';
import { ReclamationDirecteurListService } from '../../directeur/list/reclamation-list.service';
import { GererActionService } from './gererAction.service';
import { Action } from 'app/model/action.model';
import { Nm_Phase } from 'app/model/phase.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';




@Component({
    selector     : 'gererAction',
    templateUrl  : './gererAction.component.html',
    styleUrls    : ['./gererAction.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class GererActionComponent implements OnInit, OnDestroy
{
    action: Action;
    actionobj:Action;
     act =[];
    pageType: string;
    reclamationForm: FormGroup;
    
    nm_PhaseSuivants = [];
    // Private
    private _unsubscribeAll: Subject<any>;
    user_id: any;
    users = [];
    phaseobj: any;
    a= [];
  phase_precedente: any;
  ordre: any;
    

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
        private _reclamationadmingereractionservice: GererActionService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.action = new Action();
        this.actionobj = new Action();

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
        // Subscribe to update product on changes
        this._reclamationdirecteurformService.onReclamationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(reclamation => {

                if ( reclamation )
                {
                    this.action = new Action(reclamation);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.action = new Action();
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
                        
                            this._httpClient.get('http://localhost:8084/api/nm-phases' ,httpOptions)
                            
                                .subscribe((response: any) => {
                                    this.phaseobj = response;
                                
                                    resolve(this.phaseobj);
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
           
            
          nm_PhaseSuivants: [this.nm_PhaseSuivants]

            /*
          nm_PhaseSuivants: [this.nm_PhaseSuivants],
          phase_precedente: [],
          ordre: []
          for (let i = 0; i < data.nm_PhaseSuivants.length; i++)
            */
        });
    }

   


      onDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data,
            event.previousIndex,
            event.currentIndex);
        } else {
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex, event.currentIndex);
        }
      }


      Affecter(): void
    {
        const data = this.reclamationForm.getRawValue();

        console.log(data);
        
        this.act.push(data.nm_PhaseSuivants[0]);
        this.actionobj.nm_PhaseSuivants=this.act;
        
        this.actionobj.phase_precedente="null";
        this.actionobj.ordre="1";
        
        
        this._reclamationadmingereractionservice.addAction(this.actionobj)
        .then(() => {

            // Trigger the subscription with new data
            this._reclamationdirecteurformService.onReclamationChanged.next(data);

          
        });

        for (let i = 1; i < data.nm_PhaseSuivants.length; i++)

          {
           
               let num = i+1;
               
               this.act =[];
            this.act.push(data.nm_PhaseSuivants[i]);
            this.actionobj.nm_PhaseSuivants=this.act;
            
            this.actionobj.phase_precedente=data.nm_PhaseSuivants[i-1].libelle;
            this.actionobj.ordre= num.toString();
            
            
            this._reclamationadmingereractionservice.addAction(this.actionobj)
            .then(() => {
    
                // Trigger the subscription with new data
                this._reclamationdirecteurformService.onReclamationChanged.next(data);
    
              
            });

                    
                     
          }

          console.log(this.actionobj);
          this.router.navigate(['/pages/ActionList']);
          

           
    }
    


}


