import { INm_Phase } from "./phase.model";



export interface IAction {
    id?: number;
    phase_precedente?: string;
    description?: string;
    ordre?: string;
    nm_PhaseSuivants?: INm_Phase[];
   
   
}

export class Action implements IAction {
    constructor(
        public id?: number,
        public phase_precedente?: string,
        public description?: string,
        public ordre?: string,
      
        public nm_PhaseSuivants?: INm_Phase[]
        
    ) {}
}
