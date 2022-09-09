import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlateNumber } from 'src/app/validators/plate-number';

@Component({
  selector: 'app-set-maintenance',
  templateUrl: './set-maintenance.component.html',
  styleUrls: ['./set-maintenance.component.css']
})
export class SetMaintenanceComponent implements OnInit {

  title = 'Añadir/Editar mantenimento';

  setMaintenance = new FormGroup({
    plateNum: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
      this.plateNumber.validate 
    ]),
    branch:new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    model:new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9]+[`!_,¿?=)(/&%$·"ªº\\^*+)]$/),
      Validators.minLength(5),
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
    ]),
    userId:new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.pattern(/^[\d]+$/)
    ])
  });

  constructor(
    private plateNumber: PlateNumber
  ) { }

  ngOnInit(): void {
  }

  onSubmit(e: any) {

  }

}
