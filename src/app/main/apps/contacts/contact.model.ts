import { FuseUtils } from '@fuse/utils';

export class Contact
{
    id: string;
    description: string;
    titre: string;
    

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.description = contact.description || '';
            this.titre = contact.titre || '';
            
        }
    }
}
