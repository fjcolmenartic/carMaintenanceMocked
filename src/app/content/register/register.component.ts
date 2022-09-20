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

    console.warn('on submit', e);
    debugger;

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
                  console.warn('user not stored')
                  
                  this.signinService.register(
                    name, email, password, city
                    )
                    .subscribe(
                      res => {
                        this.dataSession = res;
                        console.info('register SUCCESS')
                        this.registerSuccess = true;
                        console.warn(this.dataSession, res)
                      },
                      (err: any) => {
                        console.warn('ERROR ON POST - REGISTER')
                      });

                } else {
                  this.userIsTaken = true;
                  console.error('user exists', check)
                }
              },
              error => {
                console.error('ERROR while checking if user exists on db', error)
              }
            );

    } else {
      // TODO retornar un toast ???
      console.error('Passwords dont match')
    }

   
  }

}
