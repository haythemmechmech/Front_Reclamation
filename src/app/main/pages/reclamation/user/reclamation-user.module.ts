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
import { ReclamationUserFormComponent } from './form/reclamation-form.component';
import { ReclamationUserListComponent } from './list/reclamation-list.component';
import { ReclamationUserListService } from './list/reclamation-list.service';
import { ReclamationUserFormService } from './form/reclamation-form.service';
import { ReclamationUserHistoriqueComponent } from './historique/historique.component';
import { ReclamationUserHistoriqueService } from './historique/historique.service';

const routes: Routes = [
    {
        path     : 'ReclamationUser',
        component: ReclamationUserListComponent,
        resolve  : {
            data: ReclamationUserListService
        }
    },
    {
        path     : 'ReclamationUser/:id',
        component: ReclamationUserFormComponent,
        resolve  : {
            data: ReclamationUserFormService
        }
    },
    {
        path     : 'ReclamationUser/:id/:handle',
        component: ReclamationUserFormComponent,
        resolve  : {
            data: ReclamationUserFormService
        }
    },

    {
        path     : 'HistoriqueUser',
        component: ReclamationUserHistoriqueComponent,
        resolve  : {
            data: ReclamationUserHistoriqueService
        }
    },
    
];

@NgModule({
    declarations: [
        ReclamationUserFormComponent,
        ReclamationUserListComponent,
        ReclamationUserHistoriqueComponent
       
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
        ReclamationUserFormService,
        ReclamationUserListService,
        ReclamationUserHistoriqueService
    ],
    
})
export class ReclamationUserModule
{
}
