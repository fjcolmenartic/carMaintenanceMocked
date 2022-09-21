interface Car {
    plateNumber: string;
    brand: string;
    model: string;
    color: string;
    doors: number;
    type: string;
    kilometers: number;
    year: number;
    engine: number;
    userId: number;
    id: number;
}

export class CarModel implements Car {

    plateNumber = '';
    brand = '';
    model = '';
    color = '';
    doors = 0;
    type = '';
    kilometers = 0;
    year = 0;
    engine = 0;
    userId = 0;
    id = 0;
    
    constructor() {}
    

}
