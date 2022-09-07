interface Repair {
    fixingId: number;
    plateNumber: string;
    faultyPart: string;
    faultyDescription: string;
    dateIn: string;
    fixDescription: string;
    fixedOn: string;
    status: string;
    repeat: boolean;
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
    status = '';
    repeat = false;
    cost = 0;

    constructor() {}    
    
}
