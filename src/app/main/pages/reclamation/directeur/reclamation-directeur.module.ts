import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule,MatMenuModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';



import { FuseConfirmDialogModule } from '@fuse/components';
import { ReclamationDirecteurListComponent } from './list/reclamation-list.component';
import { ReclamationDirecteurFormComponent } from './form/reclamation-form.component';
import { ReclamationDirecteurListService } from './list/reclamation-list.service';
import { ReclamationDirecteurFormService } from './form/reclamation-form.service';
import { AffectationComponent } from './affectation/affectation.component';
import { AffectationService } from './affectation/affectation.service';


const routes: Routes = [
    
    {
        path     : 'Affectation',
        component: AffectationComponent,
        resolve  : {
            data: AffectationService
        }
    },
    {
        path     : 'ReclamationDirecteur',
        component: ReclamationDirecteurListComponent,
        resolve  : {
            data: ReclamationDirecteurListService
        }
    },
    {
        path     : 'ReclamationDirecteur/:id',
        component: ReclamationDirecteurFormComponent,
        resolve  : {
            data: ReclamationDirecteurFormService
        }
    },
    {
        path     : 'ReclamationDirecteur/:id/:handle',
        component: ReclamationDirecteurFormComponent,
        resolve  : {
            data: ReclamationDirecteurFormService
        }
    }
    
];

@NgModule({
    declarations: [
        AffectationComponent,
        ReclamationDirecteurFormComponent,
        ReclamationDirecteurListComponent
       
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatMenuModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        FuseConfirmDialogModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        AffectationService,
        ReclamationDirecteurFormService,
        ReclamationDirecteurListService
    ],
    
})
export class ReclamationDirecteurModule
{
}
