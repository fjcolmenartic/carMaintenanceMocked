import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userSession = false;
  title = 'Acceso';
  dataSession: any;
  form: FormGroup = new FormGroup({}); 
  isCheck: any;
  checkHuman: Array<any> = [];
  items: Array<any> =  [];
  isNaN: Function = Number.isNaN;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Login http
    private sessionService: SessionService,
    private sessionStatusService: SessionStatusService,
    private router: Router,
    private dataService: DataService // Mathmatics
    ) { 
    }

  ngOnInit(): void {
    
    // Subscribe to user Session and assign to internal var
    this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);

    // While session can entry to logged home
    if(this.userSession) {
      this.router.navigateByUrl('/car');
    }

    this.items = [
      'STEP_1',
      'STEP_2'
    ];

    // Form initialization
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      result:['', [Validators.required]],
    });

    this.checkHuman = this.dataService.generateNumbers(); // Return two numbers

  }

  sendLogin(): void {
    this.isCheck = null; // Prev = { user: 1 } - only this param

    const [numberA, numberB] = this.checkHuman; // [1,2]
    const result = this.form.value.result;
    const check = this.dataService.checkOperation(numberA, numberB, result);

    if (!check) {
      this.isCheck = 'ERROR_CHECK';
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.login(email, password)
      .subscribe(
        res => {
          this.dataSession = res;
          this.isCheck = 'SUCCESS';

          // Browser session storage
          this.sessionService.saveData('user-session', 'logged-in');
          this.sessionService.saveData('user-logged', true);
          this.sessionService.saveData('user-id', this.dataSession.user.id);
          this.sessionService.saveData('user-name', this.dataSession.user.name);

          // Set user session to true           
          this.sessionStatusService.setSessionStart(true);

          this.router.navigateByUrl('/car');
        },
        (err: any) => {
          this.isCheck = 'ERROR_USER';
        });

  }


}
