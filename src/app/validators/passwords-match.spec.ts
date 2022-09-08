import { AbstractControl, FormControl } from '@angular/forms';
import { PasswordsMatch } from './passwords-match';

describe('PasswordsMatch', () => {
  it('should create an instance', () => {
    expect(new PasswordsMatch()).toBeTruthy();
  });

  it('Check the password matchs - match case', () => {
    
    const passwordMatcher = new PasswordsMatch();
    const password: AbstractControl = new FormControl();
    const confirmPassword: AbstractControl = new FormControl();

    password.setValue('12345');
    confirmPassword.setValue('12345');
    let result = passwordMatcher.validate(password.value, confirmPassword.value);

    expect(result).toBeNull();

  });

  it("Check the password matchs - DON'T match case", () => {
    
    const passwordMatcher = new PasswordsMatch();
    const password: AbstractControl = new FormControl();
    const confirmPassword: AbstractControl = new FormControl();

    password.setValue('12345');
    confirmPassword.setValue('65432');
    let result = passwordMatcher.validate(password.value, confirmPassword.value);

    expect(result).toEqual({ passwordsDontMatch: false });

  });

  it("Check the password matchs - DON'T match case with one empty", () => {
    
    const passwordMatcher = new PasswordsMatch();
    const password: AbstractControl = new FormControl();
    const confirmPassword: AbstractControl = new FormControl();

    password.setValue('');
    confirmPassword.setValue('65432');
    let result = passwordMatcher.validate(password.value, confirmPassword.value);

    expect(result).toEqual({ passwordsDontMatch: false });

  });

  
  it("Check the password matchs - DON'T match case with bpth empty", () => {
    
    const passwordMatcher = new PasswordsMatch();
    const password: AbstractControl = new FormControl();
    const confirmPassword: AbstractControl = new FormControl();

    password.setValue('');
    confirmPassword.setValue('');
    let result = passwordMatcher.validate(password.value, confirmPassword.value);

    expect(result).toBeNull();

  });

});
