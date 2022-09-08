import { FormControl } from '@angular/forms';
import { PlateNumber } from './plate-number';

describe('PlateNumber', () => {

  it('should create an instance', () => {
    expect(new PlateNumber()).toBeTruthy();
  });

  it('Check for a valid plate number', () => {
    let validator = new PlateNumber();
    let plateNumber: FormControl;

    plateNumber = new FormControl('1234TSJ');
    let validation = validator.validate(plateNumber);

    expect(validation).toBeNull();
  });

  it('Check for invalid plate number - wrong order', () => {
    let validator = new PlateNumber();
    let plateNumber: FormControl;

    plateNumber = new FormControl('DVG1562');
    console.log(plateNumber.value.length)
    let validation = validator.validate(plateNumber);

    expect(validation).toEqual({ modernPlateNumberNoValidLetter: false });
  });

  it('Check for invalid plate number - out of range of 7 chars', () => {
    let validator = new PlateNumber();
    let plateNumber: FormControl;

    plateNumber = new FormControl('1234TS');
    let validation = validator.validate(plateNumber);

    expect(validation).toEqual({ modernPlateNumberWrongLongitude: false });
  });

  it('Check for invalid plate number - in range of 7 chars BUT not valid format (length or position of numns/chars', () => {
    let validator = new PlateNumber();
    let plateNumber: FormControl;

    plateNumber = new FormControl('12R34TS');
    let validation = validator.validate(plateNumber);

    expect(validation).toEqual({ modernPlateNumberNoValidLetter: false });
  });

});
