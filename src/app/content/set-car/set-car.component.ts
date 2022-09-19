import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { PlateNumber } from 'src/app/validators/plate-number';

@Component({
  selector: 'app-set-car',
  templateUrl: './set-car.component.html',
  styleUrls: ['./set-car.component.css']
})
export class SetCarComponent implements OnInit {

  userSession = false;
  title = 'Añadir coche';
  colorList = ['Blanco', 'Negro', 'Gris', 'Azul', 'Rojo', 'Verde', 'Granate', 'Amarillo', 'Rosa', 'Beige'];
  carTypeList = ['Diesel', 'Gasolina', 'Eléctrico', 'Híbrido', 'GLP'];
  yearList: string[] = [];
  // To store query results
  dataSession: any;
  // To inform some error and success
  isCheck: any;
  // To check if plate number stored on db
  carIsTaken: undefined | boolean;
  submited = false;
  loading = false;
  id: string | null;
  buttonText = 'Añadir';

  // name, email, password, city
  setACar = new FormGroup({
    plateNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
      this.plateNumber.validate
    ]),
    brand:new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    model:new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9 ]+$/),
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    color:new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    doors:new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1),
      Validators.pattern(/^[\d]{1}$/)
    ]),
    type:new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z -ÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+\D[^/\()@!¡"·$%&()=+*\^{}\[_ªº\]]$/) // diesel, gasolina
    ]),
    kilometers:new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(6),
      Validators.pattern(/^[\d]{1,6}$/)
    ]),
    year:new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern(/^[\d]{4}$/)
    ]),
    engine:new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4),
      Validators.pattern(/^[\d.]+$/) // diesel, gaslina....
    ])
  });

  constructor(
    private plateNumber: PlateNumber,
    private sessionService: SessionService,
    private storageService: StorageService,
    private sessionStatusService: SessionStatusService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) { 
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    // Get the Observable of session status
    this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);

    // Deny access if no session
    if (!this.userSession) {
      this.router.navigateByUrl('/login');
    }

    // Create an populate a year list for the input year select
    let iniYear: number = 2000;
    let lastYear: any = new Date((new Date()).getTime() + 24*60*60*1000);
    lastYear = lastYear.getFullYear();

    for(let i = lastYear; i >= iniYear; i--) {
      this.yearList.push(i.toString());
    }

    // On edit mode change title and button texts
    if(this.id != null) {
      this.title = 'Editar coche';
      this.buttonText = 'Editar';
      let id = parseInt(this.id);

      // Get storage data
      this.storageService.getCar(id)
        .subscribe(
            car => {
              this.dataSession = car;

              // Set storage data on the view fields
              this.setACar.controls['plateNumber'].setValue(this.dataSession['plateNumber']);
              this.setACar.controls['brand'].setValue(this.dataSession['brand']);
              this.setACar.controls['model'].setValue(this.dataSession['model']);
              this.setACar.controls['color'].setValue(this.dataSession['color']);
              this.setACar.controls['type'].setValue(this.dataSession['type']);
              this.setACar.controls['year'].setValue(this.dataSession['year']);
              this.setACar.controls['doors'].setValue(this.dataSession['doors']);
              this.setACar.controls['kilometers'].setValue(this.dataSession['kilometers']);
              this.setACar.controls['engine'].setValue(this.dataSession['engine']);

            },
            error => {
              console.error('NO data session retrieved')
            }          
        )
    }

  }

  // Update the record by id
  editCar() {
    this.submited = true;

    let plateNumber = this.setACar.controls['plateNumber'].value;
    let brand = this.setACar.controls['brand'].value;
    let model = this.setACar.controls['model'].value;
    let color = this.setACar.controls['color'].value;
    let doors = this.setACar.controls['doors'].value;
    let type = this.setACar.controls['type'].value;
    let kilometers = this.setACar.controls['kilometers'].value;
    let year = this.setACar.controls['year'].value;
    let engine = this.setACar.controls['engine'].value;
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    let id = JSON.parse(this.id || '0');

    if(
        plateNumber != '' &&
        brand != '' &&
        model != '' &&
        color != '' &&
        doors != '' &&
        type != '' &&
        kilometers != '' &&
        year != '' &&
        engine != ''     
    ) {

      this.storageService
        .updateCar(plateNumber, brand, model, color, doors, type, kilometers,year, engine, userId, id)
        .subscribe(
          res => {
            this.dataSession = res;
            this.isCheck = 'INSERT_SUCCESS';
            this.router.navigateByUrl('/car');  
          },
          (err: any) => {
            this.isCheck = 'INSERT_ERROR'; 
      });


    } else {
      // TODO retornar un toast ???
      this.isCheck = 'EMPTY_FIELDS_ERROR';
      console.error(this.isCheck)
    }

  }

  // Insert a new record
  addCar() {
    this.submited = true;

    let plateNumber = this.setACar.controls['plateNumber'].value;
    let brand = this.setACar.controls['brand'].value;
    let model = this.setACar.controls['model'].value;
    let color = this.setACar.controls['color'].value;
    let doors = this.setACar.controls['doors'].value;
    let type = this.setACar.controls['type'].value;
    let kilometers = this.setACar.controls['kilometers'].value;
    let year = this.setACar.controls['year'].value;
    let engine = this.setACar.controls['engine'].value;
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    let id = 0;

    if(
        plateNumber != '' &&
        brand != '' &&
        model != '' &&
        color != '' &&
        doors != '' &&
        type != '' &&
        kilometers != '' &&
        year != '' &&
        engine != ''     
    ) {

      // Check if the plate number is already stored
      this.storageService.checkCar(plateNumber)
        .subscribe(
          (check: any) => {
            // If no records about this plate number you are free to store the car
            if(check.length == 0) {
              this.carIsTaken = false;
              this.storageService
                .setCar(plateNumber, brand, model, color, doors, type, kilometers,year, engine, userId, id)
                .subscribe(
                  res => {
                    this.dataSession = res;
                    this.isCheck = 'INSERT_SUCCESS';
                    this.router.navigateByUrl('/car');  
                  },
                  (err: any) => {
                    this.isCheck = 'INSERT_ERROR'; 
              });
            } else {
              this.carIsTaken = true;
            }
          },
          error => {
            console.error('ERROR', plateNumber, error)
          }
        );

    } else {
      // TODO retornar un toast ???
      this.isCheck = 'EMPTY_FIELDS_ERROR';
      console.error(this.isCheck)
    }

  }

  // Deal if this operation is an Edit or an Insert record by id url param
  onSubmit(e: any) {

    this.submited = true;

    if(this.setACar.invalid) {
      return;
    }

    if(this.id != null) {
      this.editCar();
    } else {
      this.addCar();
    }

  }

}
