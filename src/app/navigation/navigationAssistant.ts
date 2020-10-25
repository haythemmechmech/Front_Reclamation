import { FuseNavigation } from '@fuse/types';

export const navigationAssistant: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            
            
          
           

                   
                    {
                        id        : 'products',
                        title     : 'liste des reclamations',
                        type      : 'item',
                        icon  : 'alarm',
                        url       : '/pages/ReclamationAssistant',
                       
                        
                    },

                    {
                        id        : 'products',
                        title     : 'historique',
                        type      : 'item',
                        icon  : 'alarm',
                        url       : '/pages/Historique',
                        
                    }

                   
                   
                ]
            },
            
        ];
    
    
    

