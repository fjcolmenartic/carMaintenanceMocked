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

  constructor(
    private sessionService: SessionService,
    private storageService: StorageService,
    private sessionStatusService: SessionStatusService
    ) {
    }

  ngOnInit() {
    
    // Check if session is stored on browser (started)
    let sessionStarted = this.sessionService.getData('user-session');    

    // If session started update userSession value
    if(sessionStarted) {
      // Set value in observable for all components      
      this.sessionStatusService.setSessionStart(true);
      // Assign to internal variable
      this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);
    } 

    // Get user data & set user's name on internal var
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
    this.storageService.getUser(userId)
      .subscribe(
      res => {
        this.dataSession = res;
        this.userName = res.name;
        this.isCheck = 'QUERY_SUCCESS';
      },
      (err: any) => {
        this.isCheck = 'QUERY_ERROR';
      });

  }

}
