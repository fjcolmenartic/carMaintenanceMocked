import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { PasswordsMatch } from 'src/app/validators/passwords-match';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SessionStatusService } from 'src/app/services/session-status.service';

@Component({
  selector: 'app-set-user',
  templateUrl: './set-user.component.html',
  styleUrls: ['./set-user.component.css']
})
export class SetUserComponent implements OnInit {
  
  userSession = false;
  title = "Perfil de usuario";
  dataSession: any;
  isCheck: any;
  checkHuman: Array<any> =  [];
  updateSuccess = false;
  closeResult = '';
  userId = 0;

  userEditForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(/^[A-Za-z ]+$/ )
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
    private storageService: StorageService,
    private sessionService: SessionService,
    private sessionStatusService: SessionStatusService,
    private PasswordsMatch: PasswordsMatch,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    // Get the Observable of session status
    this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);

    // Deny access if no session
    if (!this.userSession) {
      this.router.navigateByUrl('/login');
    }

    // Get the user id from storage
    this.userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    let userId = this.userId.toString();
    // Get the user data
    this.storageService.getUser(userId)
    .subscribe(
      res => {
        this.dataSession = res;
        this.isCheck = 'SUCCESS';
        // Set user data on the form
        this.userEditForm.controls['name'].setValue(this.dataSession.name);
        this.userEditForm.controls['email'].setValue(this.dataSession.email);
        this.userEditForm.controls['city'].setValue(this.dataSession.city);
      },
      (err: any) => {
        this.isCheck = 'ERROR_USER';
      });

  }

  onSubmit(e:any) {

    // Get password form data
    let password = this.userEditForm.controls['password'].value;
    let confirmPassword = this.userEditForm.controls['confirmPassword'].value;

    // Validate password
    let passwordsMatch = this.PasswordsMatch.validate(
       password, confirmPassword);

    // If password matchs
    if(!!!passwordsMatch) {
      // Get other form data
      let name = this.userEditForm.controls['name'].value;
      let email = this.userEditForm.controls['email'].value;
      let city = this.userEditForm.controls['city'].value;
      this.userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
      let userId = this.userId.toString();

        // Update user data
        this.storageService.setUser(name, email, password, city, this.userId)
        .subscribe(
          res => {
            this.dataSession = res;
            this.updateSuccess = true;
            this.isCheck = 'UPDATE_SUCCESS';
          },
          (err: any) => {
            this.isCheck = 'UPDATE_ERROR';
          });

    } else {
      // TODO retornar un toast ???
      this.isCheck = 'ERROR_PASSWORDS_DO_NOT_MATCH';
    }

   
  }

  // Open modal (delete user popup)
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // TODO Deacouple diff methods, concatenate each call inside of prev + control if error stop deletion on incomplete... 
  // maybe MUST separate get from delete and if everything ok procced
  onDelete() {
    // Get the user id
    this.userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    let userId = this.userId.toString();

    // Get all the user's repairs (dependent of cars)
    this.storageService.getAllRepairs(this.userId)
      .subscribe(
        repairs => {
          // Delete all these repairs
          for(let i = 0; i < repairs.length; i++) {
                        
            this.storageService.removeRepair(repairs[i].id)
              .subscribe(
                repairDeletion => {
                  this.isCheck = 'SUCCESS_REPAIR_DELETION';
                },
                error => {
                  this.isCheck = 'ERROR_REPAIR_DELETION';
              });
          }

          // Get all the user's cars
          this.storageService.getAllCars(this.userId)
            .subscribe(
              cars => {
                for(let i = 0; i < cars.length; i++) {
                  this.storageService.removeCar(cars[i].id)
                    .subscribe(
                      carDeletion => {
                        this.isCheck = 'SUCCESS_CAR_DELETION';
                      },
                      error => {
                        this.isCheck = 'ERORR_CAR_DELETION';
                      }
                    )                    
                }
              },
              error => {
                this.isCheck = 'ERROR_RETRIEVING_ALL_CARS';
              }
            );

            // Delete the user
            this.storageService.removeUser(this.userId)
              .subscribe(
                user => {
                  this.dataSession = user;
                  this.updateSuccess = true;
                  this.isCheck = 'DELETE_SUCCESS';
                  this.sessionService.clearData();
                  // Close modal
                  this.modalService.dismissAll();
                  this.router.navigateByUrl('/login');
                },
                (err: any) => {
                  this.isCheck = 'ERROR_ON_USER_DELETION';
                });
            
        },
        error => {
          this.isCheck = 'ERROR_RETRIEVING_REPAIRS';
        }
      );

  }

}
