import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  title = 'Listado de coches';
  carList: any = [];
  dataSession: any;
  isCheck: any;
  userSession = false;

  constructor(
    private sessionService: SessionService,
    private storageService: StorageService,
    private sessionStatusService: SessionStatusService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Get the Observable of session status
    this.sessionStatusService.getSessionStart()
      .subscribe(
        res => {
          this.userSession = res
        },
        (err:any) => {
          this.isCheck = 'ERROR_CANNOT_CHECK_USER_SESSION_STATUS';
        }
    );

    // Deny access if no session
    if (!this.userSession) {
      this.router.navigateByUrl('/login');
    }

    // Get the user id from storage
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
    // Get the user data
    this.storageService.getAllCars(userId)
    .subscribe(
      res => {
        this.dataSession = res;
        this.carList = res;
        this.isCheck = 'SUCCESS';

      },
      (err: any) => {
        this.isCheck = 'ERROR_RETRIEVING_ALL_CARS';
      });

  }

  reloadCarList() {
        // Get the user id from storage
        let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
        userId = userId.toString();
        // Get the user data
        this.storageService.getAllCars(userId)
        .subscribe(
          res => {
            this.dataSession = res;
            this.carList = res;
            this.isCheck = 'SUCCESS';
    
          },
          (err: any) => {
            this.isCheck = 'ERROR_RELOADING_ALL_CARS';
          });
  }

  onDelete(id:number) {

    // Get the platenumber of this id car
    this.storageService.getCar(id)
      .subscribe({
        next: car => {

          // Get all repairs for this plate number car
          this.storageService.getAllCarRepairs(car.plateNumber)
            .subscribe({
              next: carRepairs => {
                
                // Remove these car repairs
                for(let i = 0; i < carRepairs.length; i++) {
                  this.storageService.removeRepair(carRepairs[i].id)
                    .subscribe({
                      next: carDeletion => {
                        this.isCheck = 'SUCCESS_REPAIR_DELETE';
                      },
                      error: error => {
                        this.isCheck = 'ERROR_REPAIR_DELETION';
                      }
                  });
                }

                this.storageService.removeCar(car.id)
                  .subscribe({
                    next: carRemoved => {
                      this.isCheck = 'SUCCESS_CAR_DELETEION';
                      this.reloadCarList();
                    },
                    error: error => {
                      this.isCheck = 'ERROR_CAR_DELETION';
                    }
                });
              },
              error: error => {
                this.isCheck = 'ERROR_RETRIVING_ALL_CAR_REPAIRS';
              }
            });
        },
        error: error => {
          this.isCheck = 'ERROR_GETTING_CAR_DATA';
        }
      });

  }

}
