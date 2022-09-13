import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SessionService } from 'src/app/services/session.service';
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
    private dataService: DataService, // Captcha
    private storageService: StorageService, // session navegador
    private signinService: SignInService,
    private PasswordsMatch: PasswordsMatch,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(e:any) {

    let passwordsMatch = this.PasswordsMatch.validate(
        this.registerForm.controls['password'].value, 
        this.registerForm.controls['confirmPassword'].value);

        console.log('####', this.registerForm, this.registerForm.controls)
        // todo implements validator and sent this.registerForm.controls
        debugger;

    if(!!!passwordsMatch) {

      let name = this.registerForm.controls['name'].value;
      let email = this.registerForm.controls['email'].value;
      let password = this.registerForm.controls['password'].value;
      let confirmPassword = this.registerForm.controls['confirmPassword'].value;
      let city = this.registerForm.controls['city'].value;

      this.signinService.register(
        name, email, password, city
        )
        .subscribe(
          res => {
            this.dataSession = res;
            console.info('register SUCCESS')
            this.registerSuccess = true;
          },
          (err: any) => {
            console.warn('ERROR ON POST - REGISTER')
          });

          // todo toast success

    } else {
      // TODO retornar un toast ???
    }

   
  }

}
