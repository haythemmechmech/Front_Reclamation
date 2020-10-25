import { Reclamation } from "./reclamation.model";

export interface INm_Phase {
    id?: number;
    libelle?: string;
    code?: string;
    reclamations?: Reclamation;
}

export class Nm_Phase implements INm_Phase {
    constructor(public id?: number, public libelle?: string, public code?: string) {}
}
