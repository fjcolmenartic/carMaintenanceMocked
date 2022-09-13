import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';
  // Value from parent if session started on browser or not
  userSession = false;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if session is stored on browser (started)
    let sessionStarted = this.sessionService.getData('user-session');
    console.log('sessionstarted dashboard', sessionStarted)

    // If session starte update userSession value
    if(sessionStarted) {
      this.userSession = true;
    } else {
      this.userSession = false;
      this.router.navigateByUrl('/login');
    }
  }

}
