import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'carMaintenance';
  // User session on browser
  // To pass data to child navbar and component
  userSession = false;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    
    // Check if session is stored on browser (started)
    let sessionStarted = this.sessionService.getData('user-session');
    console.log('sessionstarted', sessionStarted)

    // If session starte update userSession value
    if(sessionStarted) {
      this.userSession = true;
    } else {
      this.userSession = false;
    }
  }

}
