import { FuseNavigation } from '@fuse/types';
import { AuthenticationService } from 'app/main/pages/authentication/login/authentication.service';

export const navigationAdmin: FuseNavigation[] = [
    
  
   
    {  

      
        
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
               
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/apps/dashboards/analytics'
                    },
                    {
                        id   : 'project',
                        title: 'Project',
                        type : 'item',
                        url  : '/apps/dashboards/project'
                    }
                ]
            }
            
            

            


            
            
        ]
    }
    
    
    
];
