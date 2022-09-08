import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SignInService } from 'src/app/services/sig-in.service';
import { StorageService } from 'src/app/services/storage.service';
import { PlateNumber } from 'src/app/validators/plate-number';
import { PasswordsMatch } from 'src/app/validators/passwords-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = "Registro";
  //registerForm: FormGroup = new FormGroup({});
  isCheck: any;
  checkHuman: Array<any> =  [];
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
  }

  );


  constructor(
    private dataService: DataService,
    private storageService: StorageService,
    private plateNumber: PlateNumber,
    private signinService: SignInService,
    private PasswordsMatch: PasswordsMatch
  ) { }

  ngOnInit(): void {
  }

  onSubmit(e:any) {

  }

}
