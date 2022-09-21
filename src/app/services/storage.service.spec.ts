import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let httpTestingController: HttpTestingController;
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ StorageService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Storage for User', () => {

    it('Edit an user - setUser()', () => {
      
      const mockUserDb = {
        "name": "my-Name",
        "email": "email@email.es",
        "password": "123456",
        "city": "City",
        "userId": 0
      };

      const { name, email, password, city, userId } = mockUserDb;

      service.setUser(name, email, password, city, userId)
        .subscribe(
          userData => {
            expect(userData.userId).toEqual(mockUserDb.userId);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/users/${userId}`);

      expect(req.request.method).toEqual('PUT');

      req.flush(mockUserDb);

    });

    it('Get an user - getUser()', () => {

      const mockUser = {
        "name": "my-Name",
        "email": "email@email.es",
        "password": "123456",
        "city": "City",
        "userId": 0
      };

      let userId = mockUser.userId.toString();

      service.getUser(userId)
        .subscribe(
          userData => {
            expect(userData).toEqual(mockUser);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/users/${userId}`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockUser);
    });

    it('Check if an user exists, checkUser()', () => {
      const mockUser = {
        "name": "my-Name",
        "email": "email@email.es",
        "password": "123456",
        "city": "City",
        "userId": 0
      };

      let name = mockUser.name;

      service.checkUser(name)
        .subscribe(
          userData => {
            expect(userData).toEqual(mockUser);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/users?name=${name}`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockUser);
    });

    it('REmove an user - removeUser()', () => {
      const mockUser = {
        "name": "my-Name",
        "email": "email@email.es",
        "password": "123456",
        "city": "City",
        "userId": 0
      };

      let userId = mockUser.userId;

      service.removeUser(userId)
        .subscribe(
          userData => {
            expect(userData).toEqual(mockUser);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/users/${userId}`);

      expect(req.request.method).toEqual('DELETE');

      req.flush(mockUser);

    });

  });

  describe('Storage for Car', () => {

    it('Set a Car - setCar()', () => {
      
      const mockCar = {
        "plateNumber": "1234TRG",
        "brand": "Mock",
        "model": "Model",
        "color": "Rojo",
        "doors": 3,
        "type": "Diesel",
        "kilometers": 250000,
        "year": "2013",
        "engine": 1.5,
        "userId": 0,
        "id": 0
      };

      const { plateNumber, brand, model, color, doors, type, kilometers, 
        year, engine, userId, id } = mockCar;

      service.setCar(plateNumber, brand, model, color, doors, type, kilometers, 
        parseInt(year), engine, userId, id)
        .subscribe(
          carData => {
            expect(carData.plateNumber).toEqual(mockCar.plateNumber);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/cars`);

      expect(req.request.method).toEqual('POST');

      req.flush(mockCar);

    });

    it('Get a car from an user', () => {
      const mockCar = {
        "plateNumber": "1234TRG",
        "brand": "Mock",
        "model": "Model",
        "color": "Rojo",
        "doors": 3,
        "type": "Diesel",
        "kilometers": 250000,
        "year": "2013",
        "engine": 1.5,
        "userId": 0,
        "id": 0
      };

      service.getCar(mockCar.id)
        .subscribe(
          carData => {
            expect(carData.id).toEqual(mockCar.id);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/cars/${mockCar.id}`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockCar);
    });

    it('Get all cars from an user', () => {
      const mockCars = [
      {
        "plateNumber": "1234TRG",
        "brand": "Mock",
        "model": "Model",
        "color": "Rojo",
        "doors": 3,
        "type": "Diesel",
        "kilometers": 250000,
        "year": "2013",
        "engine": 1.5,
        "userId": 0,
        "id": 0
      },
      {
        "plateNumber": "2345YRG",
        "brand": "Mock2",
        "model": "Model",
        "color": "Negro",
        "doors": 5,
        "type": "Diesel",
        "kilometers": 150000,
        "year": "2013",
        "engine": 1.5,
        "userId": 0,
        "id": 2
      },
      {
        "plateNumber": "2345YRG",
        "brand": "Mock2",
        "model": "Model",
        "color": "Negro",
        "doors": 5,
        "type": "Diesel",
        "kilometers": 150000,
        "year": "2013",
        "engine": 1.5,
        "userId": 3,
        "id": 3
      }
    ];

    const mockUserId = 0;


      service.getAllCars(mockUserId)
        .subscribe(
          carData => {
            // TODO How to compare with the request object ??? cause <CarModel[]>
            expect(carData.length).toEqual(3);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/cars?userId=${mockUserId}`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockCars);
    });

    it('Check a car if registered on db', () => {
      const mockCar = {
        "plateNumber": "1234TRG",
        "brand": "Mock",
        "model": "Model",
        "color": "Rojo",
        "doors": 3,
        "type": "Diesel",
        "kilometers": 250000,
        "year": "2013",
        "engine": 1.5,
        "userId": 0,
        "id": 0
      };

      service.checkCar(mockCar.plateNumber)
        .subscribe(
          carData => {
            expect(carData.plateNumber).toEqual(mockCar.plateNumber);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/cars?plateNumber=${mockCar.plateNumber}`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockCar);
    });

    it('Update a car', () => {
      const mockCar = {
        "plateNumber": "1234TRG",
        "brand": "Mock",
        "model": "Model",
        "color": "Rojo",
        "doors": 3,
        "type": "Diesel",
        "kilometers": 250000,
        "year": "2013",
        "engine": 1.5,
        "userId": 0,
        "id": 0
      };

      const { plateNumber, brand, model, color, doors, type, kilometers, 
        year, engine, userId, id } = mockCar;

      service.updateCar(plateNumber, brand, model, color, doors, type, kilometers, 
        parseInt(year), engine, userId, id)
        .subscribe(
          carData => {
            expect(carData).toEqual(mockCar);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/cars/${mockCar.id}`);

      expect(req.request.method).toEqual('PUT');

      req.flush(mockCar);
    });

    it('Remove a car', () => {
      const mockCar = {
        "plateNumber": "1234TRG",
        "brand": "Mock",
        "model": "Model",
        "color": "Rojo",
        "doors": 3,
        "type": "Diesel",
        "kilometers": 250000,
        "year": "2013",
        "engine": 1.5,
        "userId": 0,
        "id": 0
      };

      service.removeCar(mockCar.id)
        .subscribe(
          carData => {
            expect(carData.id).toEqual(mockCar.id);
          });
      
      const req = httpTestingController.expectOne(`http://localhost:3000/cars/${mockCar.id}`);

      expect(req.request.method).toEqual('DELETE');

      req.flush(mockCar);
    });

  });

  describe('Storage for Repair', () => {

    it('Set a repair', () => {
      const mockRepair = {
        "plateNumber": '',
        "userId": 0,
        "faultyPart": '',
        "faultyDescription": '',
        "dateIn": '',
        "fixDescription": '',
        "fixedOn": '',
        "fixed": false,
        "cost": 0,
        "minutes": 0,
        "id": 0,
      };

      const { plateNumber, userId, faultyPart, faultyDescription, dateIn, 
        fixDescription, fixedOn, fixed, cost, minutes } = mockRepair;

        service.setRepair(plateNumber, userId, faultyPart, faultyDescription, dateIn, 
          fixDescription, fixedOn, fixed, cost, minutes)
          .subscribe(
            repairData => {
              expect(repairData.faultyPart).toEqual(mockRepair.faultyPart);
            }
          );

        const req = httpTestingController.expectOne(`http://localhost:3000/repairs`);

        expect(req.request.method).toEqual('POST');
  
        req.flush(mockRepair);
    });

    it('Get a repair', () => {
      const mockRepair = {
        "plateNumber": '',
        "userId": 0,
        "faultyPart": '',
        "faultyDescription": '',
        "dateIn": '',
        "fixDescription": '',
        "fixedOn": '',
        "fixed": false,
        "cost": 0,
        "minutes": 0,
        "id": 0,
      };

      service.getRepair(mockRepair.id)
          .subscribe(
            repairData => {
              expect(repairData.faultyPart).toEqual(mockRepair.faultyPart);
            }
          );

        const req = httpTestingController.expectOne(`http://localhost:3000/repairs/${mockRepair.id}`);

        expect(req.request.method).toEqual('GET');
  
        req.flush(mockRepair);
    });

    it('Get all repairs', () => {
      const mockRepair =[
        {
          "plateNumber": '6574RDS',
          "userId": 0,
          "faultyPart": '',
          "faultyDescription": '',
          "dateIn": '',
          "fixDescription": '',
          "fixedOn": '',
          "fixed": false,
          "cost": 0,
          "minutes": 0,
          "id": 0,
        },
        {
          "plateNumber": '6574RDS',
          "userId": 0,
          "faultyPart": '',
          "faultyDescription": '',
          "dateIn": '',
          "fixDescription": '',
          "fixedOn": '',
          "fixed": false,
          "cost": 0,
          "minutes": 0,
          "id": 1,
        },
        {
          "plateNumber": '6314HJG',
          "userId": 2,
          "faultyPart": '',
          "faultyDescription": '',
          "dateIn": '',
          "fixDescription": '',
          "fixedOn": '',
          "fixed": false,
          "cost": 0,
          "minutes": 0,
          "id": 2,
        }
    ];

    const mockUserId = 0;

        service.getAllRepairs(mockUserId)
          .subscribe(
            repairData => {
              expect(repairData.length).toEqual(3);
            }
          );

        const req = httpTestingController.expectOne(`http://localhost:3000/repairs?userId=${mockUserId}`);

        expect(req.request.method).toEqual('GET');
  
        req.flush(mockRepair);
    });

    it('Get all repairs from an specific car', () => {
      const mockRepair = [
        {
          "plateNumber": '6574RDS',
          "userId": 0,
          "faultyPart": '',
          "faultyDescription": '',
          "dateIn": '',
          "fixDescription": '',
          "fixedOn": '',
          "fixed": false,
          "cost": 0,
          "minutes": 0,
          "id": 0,
        },
        {
          "plateNumber": '6574RDS',
          "userId": 0,
          "faultyPart": '',
          "faultyDescription": '',
          "dateIn": '',
          "fixDescription": '',
          "fixedOn": '',
          "fixed": false,
          "cost": 0,
          "minutes": 0,
          "id": 1,
        },
        {
          "plateNumber": '6314HJG',
          "userId": 2,
          "faultyPart": '',
          "faultyDescription": '',
          "dateIn": '',
          "fixDescription": '',
          "fixedOn": '',
          "fixed": false,
          "cost": 0,
          "minutes": 0,
          "id": 2,
        }
    ];

    const mockedPlateNumber = '6574RDS';

        service.getAllCarRepairs(mockedPlateNumber)
          .subscribe(
            repairData => {
              // TODO check if can compare with request or similar
              expect(repairData.length).toEqual(3);
            }
          );

        const req = httpTestingController.expectOne(`http://localhost:3000/repairs?plateNumber=${mockedPlateNumber}`);

        expect(req.request.method).toEqual('GET');
  
        req.flush(mockRepair);
    });

    it('Update a repair', () => {
      const mockRepair = {
        "plateNumber": '',
        "userId": 0,
        "faultyPart": '',
        "faultyDescription": '',
        "dateIn": '',
        "fixDescription": '',
        "fixedOn": '',
        "fixed": false,
        "cost": 0,
        "minutes": 0,
        "id": 0,
      };

      const { plateNumber, userId, faultyPart, faultyDescription, dateIn, 
        fixDescription, fixedOn, fixed, cost, minutes, id } = mockRepair;

        service.updateRepair(plateNumber, userId, faultyPart, faultyDescription, dateIn, 
          fixDescription, fixedOn, fixed, cost, minutes, id)
          .subscribe(
            repairData => {
              expect(repairData.faultyPart).toEqual(mockRepair.faultyPart);
            }
          );

        const req = httpTestingController.expectOne(`http://localhost:3000/repairs/${id}`);

        expect(req.request.method).toEqual('PUT');
  
        req.flush(mockRepair);
    });

    it('Remove a repair', () => {
      const mockRepair = {
        "plateNumber": '',
        "userId": 0,
        "faultyPart": '',
        "faultyDescription": '',
        "dateIn": '',
        "fixDescription": '',
        "fixedOn": '',
        "fixed": false,
        "cost": 0,
        "minutes": 0,
        "id": 0,
      };

        service.removeRepair(mockRepair.id)
          .subscribe(
            repairData => {
              expect(repairData.faultyPart).toEqual(mockRepair.faultyPart);
            }
          );

        const req = httpTestingController.expectOne(`http://localhost:3000/repairs/${mockRepair.id}`);

        expect(req.request.method).toEqual('DELETE');
  
        req.flush(mockRepair);
    });

  });


});
