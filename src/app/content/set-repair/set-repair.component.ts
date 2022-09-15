import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { PlateNumber } from 'src/app/validators/plate-number';

@Component({
  selector: 'app-set-repair',
  templateUrl: './set-repair.component.html',
  styleUrls: ['./set-repair.component.css']
})
export class SetRepairComponent implements OnInit {

  title = 'Añadir/editar reparación';
  carList: string[] = [];
  repaired = ['Reparado', 'No reparado'];
  dataSession: any;
  isCheck: any;


  setRepair = new FormGroup({
    plateNum: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
      this.plateNumber.validate
    ]),
    faultyPart:new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z ÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+$/),
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    faultyDescription:new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
      Validators.pattern(/^[a-zA-Z -ÁÉÍÓÚáéíóúÄËÏÖÜäëïöü][^/\·$=+*{}\[_\]]+$/)
    ]),
    dateIn:new FormControl('', [
      Validators.required
    ]),
    fixDescription:new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
      Validators.pattern(/^[a-zA-Z -ÁÉÍÓÚáéíóúÄËÏÖÜäëïöü][^/\·$=+*{}\[_\]]+$/)
    ]),
    fixedOn:new FormControl('', [
      Validators.required
    ]),
    fixed:new FormControl('', [
      Validators.required,
    ]),
    cost:new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(4),
      Validators.pattern(/^[\d.]+$/)
    ]),
    minutes:new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(4),
      Validators.pattern(/^[\d]+$/)
    ])
  });

  constructor(
    private plateNumber: PlateNumber,
    private sessionService: SessionService,
    private storageService: StorageService, 
    private router: Router
  ) { }

  ngOnInit(): void {

    // GET THE PLATE NUMBER LIST OF USER'S CARS
    // Get the user id from storage
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();

    // Get the user data
    this.storageService.getAllCars(userId)
    .subscribe(
      res => {
        this.dataSession = res;
        this.isCheck = 'SUCCESS';

        for (let i = 0; i < this.dataSession.length; i++) {
          this.carList.push(this.dataSession[i]['plateNumber']);
        }

      },
      (err: any) => {
        this.isCheck = 'ERROR_USER';
      });


  }
  
  onSubmit(e: any) {
    let plateNumber = this.setRepair.controls['plateNum'].value;
    let faultyPart = this.setRepair.controls['faultyPart'].value;
    let faultyDescription = this.setRepair.controls['faultyDescription'].value;
    let dateIn = this.setRepair.controls['dateIn'].value;
    let fixDescription = this.setRepair.controls['fixDescription'].value;
    let fixedOn = this.setRepair.controls['fixedOn'].value;
    let fixed = this.setRepair.controls['fixed'].value;
    let cost = this.setRepair.controls['cost'].value;
    let minutes = this.setRepair.controls['minutes'].value;
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');

    (fixed == 'Reparado') ? fixed = true : fixed = false;

    if(
      plateNumber != '' &&
      faultyPart != '' &&
      faultyDescription != '' &&
      dateIn != '' &&
      fixDescription != '' &&
      fixedOn != '' &&
      typeof fixed == 'boolean' &&
      cost != '' &&
      minutes != ''     
    ) {
      // Update user data
      this.storageService
        .setRepair(plateNumber, userId, faultyPart, faultyDescription, dateIn, fixDescription,
          fixedOn, fixed, cost, minutes)
        .subscribe(
          res => {
            this.dataSession = res;
            this.isCheck = 'INSERT_SUCCESS';
            console.warn(this.isCheck)    
            this.router.navigateByUrl('/repairs');
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
