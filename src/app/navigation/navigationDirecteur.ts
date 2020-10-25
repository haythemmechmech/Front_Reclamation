import { FuseNavigation } from '@fuse/types';

export const navigationDirecteur: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            
            
          
           
            {
                id        : 'products',
                title     : 'Liste des reclamations',
                type      : 'item',
                icon  : 'alarm',
                url       : '/pages/ReclamationDirecteur',
               
            }

                  

                   

                   
                   
                ]
            },
            
        ];
    
    
    

