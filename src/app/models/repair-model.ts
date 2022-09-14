interface Repair {
    fixingId: number;
    plateNumber: string;
    faultyPart: string;
    faultyDescription: string;
    dateIn: string;
    fixDescription: string;
    fixedOn: string;
    fixed: boolean;
    cost: number;
}

export class RepairModel implements Repair {

    fixingId = 0;
    plateNumber = '';
    faultyPart = '';
    faultyDescription = '';
    dateIn = '';
    fixDescription = '';
    fixedOn = '';
    fixed = false;
    cost = 0;

    constructor() {}    
    
}
