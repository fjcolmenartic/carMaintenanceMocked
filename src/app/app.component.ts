import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Car Maintenance';
  // User session on browser
  // To pass data to child navbar and component
  userSession = false;
  userName = '';
  dataSession:any;
  isCheck = '';

  constructor(
    private sessionService: SessionService,
    private storageService: StorageService
    ) {
    }

  ngOnInit() {
    
    // Check if session is stored on browser (started)
    let sessionStarted = this.sessionService.getData('user-session');    
    let sessionStartedT = this.sessionService.getData('user-logged');    

    // If session starte update userSession value
    if(sessionStarted) {
      this.userSession = true;
    } else {
      this.userSession = false;
    }

    this.userSession = this.sessionService.getStatus();

    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
    this.storageService.getUser(userId)
      .subscribe(
      res => {
        this.dataSession = res;
        this.userName = res.name;
        this.isCheck = 'UPDATE_SUCCESS';
      },
      (err: any) => {
        this.isCheck = 'UPDATE_ERROR';
      });

  }

  childUpdateSession(e: any) {
    this.userSession = e;
  }

}
