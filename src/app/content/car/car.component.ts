import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnDestroy {

  title = 'Listado de coches';
  carList: any;
  dataSession: any;
  isCheck: any;
  userSession = false;

  constructor(
    private sessionService: SessionService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if session is stored on browser (started)
    // This is the home page on logged in
    let sessionStarted = this.sessionService.getData('user-session');

    // If session starte update userSession value
    if(sessionStarted) {
      this.userSession = true;
    } else {
      this.userSession = false;
      this.router.navigateByUrl('/login');
    }

    // userid
    // sotrag get car

    // Get the user id from storage
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
    // Get the user data
    this.storageService.getCar(userId)
    .subscribe(
      res => {
        this.dataSession = res;
        this.carList = res;
        console.warn(res)
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
        this.storageService.getCar(userId)
        .subscribe(
          res => {
            this.dataSession = res;
            this.carList = res;
            console.warn(res)
            this.isCheck = 'SUCCESS';
    
          },
          (err: any) => {
            this.isCheck = 'ERROR_USER';
          });
  }

  onDelete(id:number) {
    console.info('ON DELETE', id)
    this.storageService.removeCar(id)
      .subscribe({
        next: data => {
          console.log('DELETE SUCCESS')
          this.reloadCarList();
        },
        error: error => {
          console.error('FAIL on delete')
        }
      })
    //this.router
    // mus invoke popup & service for deletion
  }

  ngOnDestroy() {
    // this.mySubscription.unsubscribe();
  }

}
