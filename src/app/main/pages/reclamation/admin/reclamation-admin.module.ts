import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule,MatMenuModule, MatCardModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';


import {DragDropModule} from '@angular/cdk/drag-drop';
import { FuseConfirmDialogModule } from '@fuse/components';

import { GererActionComponent } from './gererAction/gererAction.component';
import { GererActionService } from './gererAction/gererAction.service';
import { ReclamationAdminListComponent } from './list/reclamation-list.component';
import { ReclamationAdminListService } from './list/reclamation-list.service';


const routes: Routes = [
    
    {
        path     : 'GererAction',
        component: GererActionComponent,
        resolve  : {
            data: GererActionService
        }
    },
    {
        path     : 'ActionList',
        component: ReclamationAdminListComponent,
        resolve  : {
            data: ReclamationAdminListService
        }
    },
   
    
];

@NgModule({
    declarations: [
        GererActionComponent,
        ReclamationAdminListComponent
       
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
        DragDropModule,
        MatCardModule,
        

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        GererActionService,
        ReclamationAdminListService
    ],
    
})
export class ReclamationAdminModule
{
}
