import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class PlateNumber implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        throw new Error("Method not implemented.");
    }

}