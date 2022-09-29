import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { PlateNumber } from 'src/app/validators/plate-number';

@Component({
  selector: 'app-set-repair',
  templateUrl: './set-repair.component.html',
  styleUrls: ['./set-repair.component.css']
})
export class SetRepairComponent implements OnInit {

  userSession = false;
  title = 'Añadir reparación';
  carList: string[] = [];
  repaired = ['Reparado', 'No reparado'];
  dataSession: any;
  isCheck: any;
  submited = false;
  loading = false;
  id: string | null;
  buttonText = 'Añadir';


  setRepair = new FormGroup({
    plateNumber: new FormControl('', [
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

    // On edit mode
    if (this.id != null) {

      this.title = 'Editar reparación';
      this.buttonText = 'Editar';
      let id = parseInt(this.id);

      this.storageService.getRepair(id)
        .subscribe(
          repair => {
            this.dataSession = repair;

            // Set new data for the array carList
            this.carList = [repair['plateNumber']];
            // & assign the unique value for editing
            this.setRepair.controls['plateNumber'].setValue(this.dataSession['plateNumber']);

            this.setRepair.controls['faultyPart'].setValue(this.dataSession['faultyPart']);
            this.setRepair.controls['dateIn'].setValue(this.dataSession['dateIn']);
            this.setRepair.controls['faultyDescription'].setValue(this.dataSession['faultyDescription']);
            this.setRepair.controls['fixDescription'].setValue(this.dataSession['fixDescription']);
            this.setRepair.controls['fixedOn'].setValue(this.dataSession['fixedOn']);
            this.setRepair.controls['cost'].setValue(this.dataSession['cost']);
            this.setRepair.controls['minutes'].setValue(this.dataSession['minutes']);
            
            // Fixed status is stored as boolean - need to convert to string data
            let fixed = null;
            (this.dataSession['fixed'] == true) ? fixed = 'Reparado' : fixed = 'No reparado';
            // Set the string
            this.setRepair.controls['fixed'].setValue(fixed);
            this.isCheck = 'SUCCESS';

          },
          error => {
            this.isCheck = 'ERROR_RETRIEVING_REPAIR_DATA';
          }
        )

    } else {

      // GET THE PLATE NUMBER LIST OF USER'S CARS TO SELECT THE CAR
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
          this.isCheck = 'ERROR_GETTING_ALL_CARS';
        });
    }

  }

  editRepair() {

    let plateNumber = this.setRepair.controls['plateNumber'].value;
    let faultyPart = this.setRepair.controls['faultyPart'].value;
    let faultyDescription = this.setRepair.controls['faultyDescription'].value;
    let dateIn = this.setRepair.controls['dateIn'].value;
    let fixDescription = this.setRepair.controls['fixDescription'].value;
    let fixedOn = this.setRepair.controls['fixedOn'].value;
    let fixed = this.setRepair.controls['fixed'].value;
    let cost = this.setRepair.controls['cost'].value;
    let minutes = this.setRepair.controls['minutes'].value;
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    let id = JSON.parse(this.id || '0');

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
        .updateRepair(plateNumber, userId, faultyPart, faultyDescription, dateIn, fixDescription,
          fixedOn, fixed, cost, minutes, id)
        .subscribe(
          res => {
            this.dataSession = res;
            this.isCheck = 'INSERT_SUCCESS';
            this.router.navigateByUrl('/repairs');
          },
          (err: any) => {
            this.isCheck = 'INSERT_ERROR'; 
          });

    } else {
      // TODO retornar un toast ???
      this.isCheck = 'EMPTY_FIELDS_ERROR';
    }

  }

  addRepair() {

    let plateNumber = this.setRepair.controls['plateNumber'].value;
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

    // Todo minutes as 0 minutes fails on if
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
            this.router.navigateByUrl('/repairs');
          },
          (err: any) => {
            this.isCheck = 'INSERT_ERROR'; 
          });

    } else {
      // TODO retornar un toast ???
      this.isCheck = 'EMPTY_FIELDS_ERROR';
    }

  }
  
  onSubmit(e: any) {

    this.submited = true;

    if (this.setRepair.invalid) {
      return;
    }

    if (this.id != null) {
      this.editRepair();
    } else {
      this.addRepair();
    }

  }

}
