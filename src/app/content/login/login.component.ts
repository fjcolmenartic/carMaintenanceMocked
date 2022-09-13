import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SessionStatusService, UserSession } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userSession = false;

  showEmoji: boolean = false;
  title = 'Acceso';
  subtitle = 'Estamos creando este ejercicio para comenzar a aprender sobre pruebas unitarias en Componentes'; 
  contentEmoji = '';
  dataSession: any;
  form: FormGroup = new FormGroup({}); 
  isCheck: any;
  checkHuman: Array<any> = [];
  items: Array<any> =  [];
  isNaN: Function = Number.isNaN;

  data$: Observable<UserSession>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Login http
    private sessionService: SessionService,
    private router: Router,
    private sessionStatus: SessionStatusService,
    private dataService: DataService // Mathmatics
    ) { 
      this.data$ = sessionStatus.sessionStatusObservable;
    }

  ngOnInit(): void {
    // console.log("%c ************ ngOnInit", "color:lightblue");
      // Check if session is stored on browser (started)
    
      let sessionLoggedIn = this.sessionService.getData('user-session');
      console.log('sessionstarted login', sessionLoggedIn);

    // If session starte update userSession value
    if(sessionLoggedIn) {
      this.userSession = true;
      this.router.navigateByUrl('/car');
    } else {
      this.userSession = false;
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
    console.log('ON SEND LOGIN ------')

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
          console.log('auth service login res', this.dataSession)
          console.log('auth service login res', this.dataSession.user)
          console.log('auth service login res', this.dataSession.user.id)
          console.log('setting user details sesion')
          this.sessionService.saveData('user-session', 'logged-in');
          this.sessionService.saveData('user-id', this.dataSession.user.id);
          console.log('login emit//////////////////')
          this.sessionStatus.sessionStatusObservableData = { userSessionService: true };
          this.router.navigateByUrl('/car');
        },
        (err: any) => {
          this.isCheck = 'ERROR_USER';
        });
  }


}
