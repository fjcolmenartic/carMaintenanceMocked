import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStatusService, UserSession } from './services/session-status.service';
import { SessionService } from './services/session.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {

  title = 'carMaintenance';
  // User session on browser
  // To pass data to child navbar and component
  userSession = false;
  userName = '';
  dataSession:any;
  isCheck = '';

  data$: Observable<UserSession>;

  constructor(
    private sessionService: SessionService,
    private sessionStatus: SessionStatusService,
    private storageService: StorageService
    ) {
      this.data$ = sessionStatus.sessionStatusObservable;
    }

  ngOnInit() {
    
    // Check if session is stored on browser (started)
    let sessionStarted = this.sessionService.getData('user-session');
    console.log('sessionstarted app component', sessionStarted)
    

    // If session starte update userSession value
    if(sessionStarted) {
      this.userSession = true;
    } else {
      this.userSession = false;
    }
console.log(this.userSession)

    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
    this.storageService.getUser(userId)
      .subscribe(
      res => {
        this.dataSession = res;
        console.warn(res)
        this.userName = res.name;
        this.isCheck = 'UPDATE_SUCCESS';
      },
      (err: any) => {
        this.isCheck = 'UPDATE_ERROR';
      });


  }

  ngOnChanges() {
    console.log("%c on changes2", "background:white;color:blue")
  }

  childUpdateSession(e: any) {
    this.userSession = e;
    console.log('update from child... user sesson is ', e)
  }

}
