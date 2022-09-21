interface Repair {
    
    plateNumber: string;
    faultyPart: string;
    faultyDescription: string;
    dateIn: string;
    fixDescription: string;
    fixedOn: string;
    fixed: boolean;
    cost: number;
    minutes: number; // new one
    id: number;
}

export class RepairModel implements Repair {

    plateNumber = '';
    faultyPart = '';
    faultyDescription = '';
    dateIn = '';
    fixDescription = '';
    fixedOn = '';
    fixed = false;
    cost = 0;
    minutes = 0; // new one
    id = 0;

    constructor() {}    
    
}
