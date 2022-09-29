import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from 'src/app/services/sig-in.service';
import { StorageService } from 'src/app/services/storage.service';
import { PasswordsMatch } from 'src/app/validators/passwords-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = "Registro";
  //registerForm: FormGroup = new FormGroup({});
  dataSession: any;
  isCheck: any;
  checkHuman: Array<any> =  [];
  registerSuccess = false;
  userIsTaken = false;
  
  //PasswordsMatch: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null | undefined;

  // name, email, password, city
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(/^[A-Za-z]+$/ )
    ]),
    email:new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    password:new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
    ]),
    confirmPassword:new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
    ]),
    city:new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z -ÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+\D[^/\()@!¡"·$%&()=+*\^{}\[_ªº\]]$/)
    ])
  });


  constructor(
    private storageService: StorageService,
    private signinService: SignInService,
    private PasswordsMatch: PasswordsMatch,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(e:any) {

    // Check if password matchs
    let passwordsMatch = this.PasswordsMatch.validate(
        this.registerForm.controls['password'].value, 
        this.registerForm.controls['confirmPassword'].value);

    if(!!!passwordsMatch) {

      let name = this.registerForm.controls['name'].value;
      let email = this.registerForm.controls['email'].value;
      let password = this.registerForm.controls['password'].value;
      let city = this.registerForm.controls['city'].value;

            // Check if username already exists
            this.storageService.checkUser(name)
            .subscribe(
              (check: any) => {
                // If no records about this plate number you are free to store the car
                if(check.length == 0) {
                  this.userIsTaken = false;
                  
                  this.signinService.register(
                    name, email, password, city
                    )
                    .subscribe(
                      res => {
                        this.dataSession = res;
                        this.registerSuccess = true;
                        this.isCheck = 'REGISTER_SUCCESS';
                      },
                      (err: any) => {
                        this.isCheck = 'ERROR_ON_REGISTER_POST';
                      });

                } else {
                  this.userIsTaken = true;
                  this.isCheck = 'ERROR_USER_IS_TAKEN';
                }
              },
              error => {
                this.isCheck = 'ERROR_WHILE_CONNECTING_TO_DB';
              }
            );

    } else {
      // TODO retornar un toast ???
      this.isCheck = 'ERROR_PASSWORDS_DONT_MATCH';
    }

   
  }

}
