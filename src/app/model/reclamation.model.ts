import { INm_Phase } from "./phase.model";
import { INm_TypeReclamation } from "./typeReclamation.model";
import { INm_Etat } from "./etat.model";

import { Moment } from "moment";
import { IAction } from "./action.model";


export interface IReclamation {
    id?: number;
    description?: string;
    titre?: string;
    
    nm_TypeReclamation?: INm_TypeReclamation;
    nm_Etats?: INm_Etat[];
    created_by?: string;
    affected_to?: string;
    created_at?: Moment;
    updated_at?: Moment;
    phases?: IAction[];
}

export class Reclamation implements IReclamation {
    constructor(
        public id?: number,
        public description?: string,
        public titre?: string,
        public phases?: IAction[],
        public nm_TypeReclamation?: INm_TypeReclamation,
        public created_by?: string,
        public affected_to?: string,
        public created_at?: Moment,
       
        public updated_at?: Moment,
        public nm_Etats?: INm_Etat[]
    ) {}
}
