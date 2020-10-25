export interface INm_TypeReclamation {
    id?: number;
    code?: string;
    libelle?: string;
    
}

export class Nm_TypeReclamation implements INm_TypeReclamation {
    constructor(public id?: number, public code?: string, public libelle?: string) {}
}
