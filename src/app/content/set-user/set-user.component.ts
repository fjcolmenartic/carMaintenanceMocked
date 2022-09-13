import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';
import { PasswordsMatch } from 'src/app/validators/passwords-match';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-set-user',
  templateUrl: './set-user.component.html',
  styleUrls: ['./set-user.component.css']
})
export class SetUserComponent implements OnInit {
  title = "Editar usuario";
  dataSession: any;
  isCheck: any;
  checkHuman: Array<any> =  [];
  updateSuccess = false;
  closeResult = '';
  //PasswordsMatch: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null | undefined;

  userEditForm = new FormGroup({
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
  });

  constructor(
    private dataService: DataService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private PasswordsMatch: PasswordsMatch,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // Get the user id from storage
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
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
      let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
      userId = userId.toString();

      // Update user data
      this.storageService.setUser(name, email, password, city, userId)
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
      console.error('passwords do not match')
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

  onDelete() {
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();

    // Update user data
    this.storageService.removeUser(userId)
      .subscribe(
        res => {
          this.dataSession = res;
          this.updateSuccess = true;
          this.isCheck = 'DELETE_SUCCESS';
          this.sessionService.clearData();
          // Close modal
          this.modalService.dismissAll();

          this.router.navigateByUrl('/login');
        },
        (err: any) => {
          this.isCheck = 'DELETE_ERROR';
        });
  }

}
