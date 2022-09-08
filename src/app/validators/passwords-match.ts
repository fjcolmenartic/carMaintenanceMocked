import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class PasswordsMatch  {

    validate(control: AbstractControl, confirmControl: AbstractControl): ValidationErrors | null {
        
        let password = control.value;
        let confirmPassword = confirmControl.value;

        if (password != confirmPassword) {
            return { passwordsDontMatch: false }
        } else {
            return null;
        }
        
    }

}