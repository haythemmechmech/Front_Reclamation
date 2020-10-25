import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            
            
            {
                id       : 'contacts',
                title    : 'Liste des reclamations',
                translate: 'NAV.CONTACTS',
                type     : 'item',
                icon     : 'account_box',
                url      : '/apps/contacts'
            },
            {
                id   : 'coming-soon',
                title: 'Ajouter une reclamation',
                type : 'item',
                icon : 'alarm',
                url  : '/pages/reclamation'
            },
            {
                id       : 'e-commerce',
                title    : 'E-Commerce',
                translate: 'NAV.ECOMMERCE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'products',
                        title     : 'Liste des reclamations (user)',
                        type      : 'item',
                        url       : '/pages/ReclamationUser',
                        exactMatch: true
                    },

                    {
                        id        : 'products',
                        title     : 'Liste des reclamations (directeur)',
                        type      : 'item',
                        url       : '/pages/ReclamationDirecteur',
                        exactMatch: true
                    },

                    {
                        id        : 'products',
                        title     : 'Gerer le chemin des reclamations (admin)',
                        type      : 'item',
                        url       : '/pages/GererAction',
                        exactMatch: true
                    },

                    {
                        id        : 'products',
                        title     : 'liste des reclamations (assistant)',
                        type      : 'item',
                        url       : '/pages/ReclamationAssistant',
                        exactMatch: true
                    },

                    {
                        id        : 'products',
                        title     : 'historique (assistant)',
                        type      : 'item',
                        url       : '/pages/Historique',
                        exactMatch: true
                    },

                    {
                        id        : 'products',
                        title     : 'historique (user)',
                        type      : 'item',
                        url       : '/pages/HistoriqueUser',
                        exactMatch: true
                    }


                   
                   
                ]
            }
            
        ]
    },
    
    
];
