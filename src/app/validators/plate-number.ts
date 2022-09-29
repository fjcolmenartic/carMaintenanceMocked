import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class PlateNumber implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        
        // Get the value
        let plateNumber = control.value;

        // Regex format for modern plate number since 2000 in advanced
        let modernPlate = /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/;

        // Guess if the whole plate number is in the exact range
        if (plateNumber.toString().length == 7) {
            // Split the parts of the plate number
            const plateNumberNumbers:number = parseInt(plateNumber.substr(0,4));
            const plateNumberLetters:string = plateNumber.substr(4,3);

            // TODO path for wrong order error
            // Check if plate number is in valid format (exact size of each part and regex format)
            if (
                typeof plateNumberNumbers == 'number' &&
                plateNumberNumbers.toString().length == 4 && 
                plateNumberLetters.length == 3 &&
                modernPlate.test(plateNumber)
            ) {
                return null;
            } else {
                return { modernPlateNumberNoValidLetter: false };
            }
        } else {
            return { modernPlateNumberWrongLongitude: false };
        }
        
    }

}






