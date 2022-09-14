import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  // Value from parent if session started on browser or not
  @Input() userSession = false;
  @Input() userName = '';
  @Input() appTitle = '';
  @Output() eventData = new EventEmitter<object>();
  
  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {
   }

  ngOnInit(): void {
    let sessionStarted = this.sessionService.getData('user-session');

    // If session starte update userSession value
    if(sessionStarted) {
      this.userSession = true;
    } else {
      this.userSession = false;
      this.router.navigateByUrl('/login');
    }

  }

  logout() {
    // Remove browser session and redirect
    this.sessionService.removeData('user-session');
    this.router.navigateByUrl('/login');
  }

}
