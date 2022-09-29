interface Maintenance {
    maintenanceId: number;
    plateNumber: string;
    date: string;
    kilometers: number;
    faultyBodyWork: boolean;
    bodyWorkStatus: string;
    faultyPaint: boolean;
    paintStatus: string;
    tyrePressureStatus: boolean;
    engineOilStatus: boolean;
    windshieldWasherFluiStatus: boolean;
    coolantStatus: boolean;
    breakFluidStatus: boolean;
    cabinFilterStatus: boolean;
    engineOilFilter: boolean;
    engineAirFilter: boolean;
    batteryStatus: boolean;
    breaksSatus: boolean;
    headlightsStatus: boolean;
    bulbHeadlightsSatus: boolean;
    description: string;
    authorizedWorkshop: boolean;
    authorizedParts: boolean;
    invoiceNo: string;
    cost: number;
}

export class MaintenanceModel implements Maintenance {

    maintenanceId = 0;
    plateNumber = '';
    date = '';
    kilometers = 0;
    faultyBodyWork = false;
    bodyWorkStatus = '';
    faultyPaint = false;
    paintStatus = '';
    tyrePressureStatus = false;
    engineOilStatus = false;
    windshieldWasherFluiStatus = false;
    coolantStatus = false;
    breakFluidStatus = false;
    cabinFilterStatus = false;
    engineOilFilter = false;
    engineAirFilter = false;
    batteryStatus = false;
    breaksSatus = false;
    headlightsStatus = false;
    bulbHeadlightsSatus = false;
    description = '';
    authorizedWorkshop = false;
    authorizedParts = false;
    invoiceNo = '';
    cost = 0;

    constructor() {}
    
}
