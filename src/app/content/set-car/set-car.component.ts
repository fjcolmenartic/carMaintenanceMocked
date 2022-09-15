import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { PlateNumber } from 'src/app/validators/plate-number';

@Component({
  selector: 'app-set-car',
  templateUrl: './set-car.component.html',
  styleUrls: ['./set-car.component.css']
})
export class SetCarComponent implements OnInit {

  title = 'Editar coche';
  colorList = ['Blanco', 'Negro', 'Gris', 'Azul', 'Rojo', 'Verde', 'Granate', 'Amarillo', 'Rosa', 'Beige'];
  carTypeList = ['Diesel', 'Gasolina', 'Eléctrico', 'Híbrido', 'GLP'];
  yearList: string[] = [];
  dataSession: any;
  isCheck: any;

  // name, email, password, city
  setACar = new FormGroup({
    plateNum: new FormControl('', [
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
      Validators.pattern(/^[A-Za-z0-9]+$/),
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
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[\d.]+$/) // diesel, gaslina....
    ])
  });

  constructor(
    private plateNumber: PlateNumber,
    private sessionService: SessionService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {

    // Create an populate a year list for the input year select
    let iniYear: number = 2000;
    let lastYear: any = new Date((new Date()).getTime() + 24*60*60*1000);
    lastYear = lastYear.getFullYear();

    for(let i = lastYear; i >= iniYear; i--) {
      this.yearList.push(i.toString());
    }

  }

  onSubmit(e: any) {

    let plateNum = this.setACar.controls['plateNum'].value;
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
        plateNum != '' &&
        brand != '' &&
        model != '' &&
        color != '' &&
        doors != '' &&
        type != '' &&
        kilometers != '' &&
        year != '' &&
        engine != ''     
    ) {
      // Update user data
      this.storageService
        .setCar(plateNum, brand, model, color, doors, type, kilometers,year, engine, userId, id)
        .subscribe(
          res => {
            this.dataSession = res;
            this.isCheck = 'INSERT_SUCCESS';
            console.warn(this.isCheck)    
          },
          (err: any) => {
            this.isCheck = 'INSERT_ERROR'; 
            console.error(this.isCheck)
          });

    } else {
      // TODO retornar un toast ???
      this.isCheck = 'EMPTY_FIELDS_ERROR';
      console.error(this.isCheck)
    }

  }

}
