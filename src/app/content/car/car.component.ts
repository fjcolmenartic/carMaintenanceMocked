import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnDestroy {

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
    this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);

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
        this.isCheck = 'ERROR_USER';
      });

  }

  onEdit(id:number) {
    console.info('ON EDIT', id)
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
            this.isCheck = 'ERROR_USER';
          });
  }

  onDelete(id:number) {
    console.info('ON DELETE', id)

    // Get the platenumber of this id car
    this.storageService.getCar(id)
      .subscribe({
        next: car => {
          console.log('data from car', car)


          // Get all repairs for this plate number car
          this.storageService.getAllCarRepairs(car.plateNumber)
            .subscribe({
              next: carRepairs => {

                console.info(carRepairs)
                console.log(car.plateNumber, car.id, car.brand)
                
                // Remove these car repairs
                for(let i = 0; i < carRepairs.length; i++) {
                  console.warn(carRepairs[i].plateNumber, carRepairs[i].id, carRepairs[i].faultyPart)
                  this.storageService.removeRepair(carRepairs[i].id)
                    .subscribe({
                      next: carDeletion => {
                        console.log('REPAIR DELETE SUCCESS', carDeletion)
                      },
                      error: error => {
                        console.error('FAIL on REPAIR delete', error)
                      }
                  });
                }

                this.storageService.removeCar(car.id)
                  .subscribe({
                    next: carRemoved => {
                      console.log('DELETE CAR SUCCESS', carRemoved)
                      this.reloadCarList();
                    },
                    error: error => {
                      console.error('FAIL on CAR delete', error)
                    }
                });
              },
              error: error => {
                console.error('Error while removing all repairs for ' + car.plateNumber)
              }
            });
        },
        error: error => {
          console.error( 'NO DATA FROM THIS CAR')
        }
      });

  }

  ngOnDestroy() {
    // this.mySubscription.unsubscribe();
  }

}
