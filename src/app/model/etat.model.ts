import { Reclamation } from "./reclamation.model";

export interface INm_Etat {
    id?: number;
    libelle?: string;
    code?: string;
    reclamations?: Reclamation;

}

export class Nm_Etat implements INm_Etat {
    constructor(public id?: number, public libelle?: string, public code?: string, public reclamations?: Reclamation) {}
}
