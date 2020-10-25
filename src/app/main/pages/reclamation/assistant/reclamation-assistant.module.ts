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
import { ReclamationAssistantListComponent } from './list/reclamation-list.component';
import { ReclamationAssistantListService } from './list/reclamation-list.service';
import { TraitementComponent } from './traitement/traitement.component';
import { TraitementService } from './traitement/traitement.service';
import { ReclamationAssistantHistoriqueComponent } from './historique/historique.component';
import { ReclamationAssistantHistoriqueService } from './historique/historique.service';


const routes: Routes = [
    {
        path     : 'ReclamationAssistant',
        component: ReclamationAssistantListComponent,
        resolve  : {
            data: ReclamationAssistantListService
        }
    },

    {
        path     : 'Historique',
        component: ReclamationAssistantHistoriqueComponent,
        resolve  : {
            data: ReclamationAssistantHistoriqueService
        }
    },

    {
        path     : 'Traitement',
        component: TraitementComponent,
        resolve  : {
            data: TraitementService
        }
    }
    
    
];

@NgModule({
    declarations: [
        TraitementComponent,
        ReclamationAssistantListComponent,
        ReclamationAssistantHistoriqueComponent
       
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
        
        ReclamationAssistantListService,
        TraitementService,
        ReclamationAssistantHistoriqueService
    ],
    
})
export class ReclamationAssistantModule
{
}
