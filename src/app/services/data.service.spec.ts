import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

// # Http services testing ---------------------------------------------------
  // To check an api you can mock it local on node or json-server BUT for the testing you 
  // must mock the data and the conection (not a real one even local) because Unit testing
  // is for checking the behivoour rather than integration of single parts of code
describe('Data Service testing - general service', () => {

  // (0) Type a service
  let service: DataService;

  beforeEach(() => {
    // ATB
    TestBed.configureTestingModule({});
    // (1) Inject the service
    service = TestBed.inject(DataService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // (3) Test the methods one by one with fake data if necessary
  // Testing a method that return an array of two int numbers
  it('Check number generation', () => {
    // Destruct of response [1,2] random
    const [numberA, numberB] = service.generateNumbers(); 
    const sum = numberA + numberB;
    // Must render a number type
    expect(sum).toMatch(/\d{1,}/); 
  });

  // Testing of methods that checks that the sum of the two provided numbers matchs the provided result
  it('Mathematical check operation', () => {
    const numberA = 5;
    const numberB = 4;
    const check = service.checkOperation(numberA, numberB, 9);
    expect(check).toBeTrue();
  })

});
