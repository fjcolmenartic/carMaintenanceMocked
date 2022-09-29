import { Component, OnInit } from '@angular/core';
import { SessionStatusService } from './services/session-status.service';
import { SessionService } from './services/session.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Car Maintenance';
  // Will receive data from an observable on service for User Session Status
  userSession = false;
  userName = '';
  dataSession:any;
  isCheck = '';

  sessionStarted: boolean | null = null;
  userId = 0;

  constructor(
    private sessionService: SessionService,
    private storageService: StorageService,
    private sessionStatusService: SessionStatusService
    ) {
    }

  checkSessionStarted() {
    // Storage service always keeps data on string - need to transform
    let userLogged = this.sessionService.getData('user-logged');

    if (userLogged == 'true') {
      this.sessionStarted = true;
    } else if (userLogged == 'false') {
      this.sessionStarted = false;
    } else {
      this.sessionStarted = null;
    }

    return this.sessionStarted;
    
  }

  getUserId() {

    // Get user data & set user's name on internal var
    this.userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    let userId = this.userId.toString();

    this.storageService.getUser(userId)
      .subscribe(
      res => {
        this.dataSession = res;
        this.isCheck = 'QUERY_SUCCESS';

        this.sessionStatusService.setSessionName(res.name);
        this.sessionStatusService.setSessionId(res.userId);
        this.sessionStatusService.getSessionName().subscribe(uName => this.userName = uName);
        this.sessionStatusService.getSessionId().subscribe(uId => this.userId = uId);
      },
      (err: any) => {
        this.isCheck = 'QUERY_ERROR';
      });

  }

  ngOnInit() {
    
    // Check if session is stored on browser (started)
    let sessionStarted = this.checkSessionStarted();

    // If session started update userSession value
    if(sessionStarted) {
      // Set value in observable for all components      
      this.sessionStatusService.setSessionStart(true);
      // Assign to internal variable
      this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);

      this.getUserId();
    } 

  }




}
