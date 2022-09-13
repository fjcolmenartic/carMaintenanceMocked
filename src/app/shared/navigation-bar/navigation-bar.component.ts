import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStatusService, UserSession } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, OnChanges {

  // Value from parent if session started on browser or not
  @Input() userSession = false;
  @Input() userName = '';
  @Output() eventData = new EventEmitter<boolean>();

  data$: Observable<UserSession>;

  
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private sessionStatus: SessionStatusService,

  ) {
    this.data$ = sessionStatus.sessionStatusObservable;

   }

  ngOnInit(): void {
    let sessionStarted = this.sessionService.getData('user-session');
    console.log('sessionstarted', sessionStarted)

    // If session starte update userSession value
    if(sessionStarted) {
      this.userSession = true;
    } else {
      this.userSession = false;
      this.router.navigateByUrl('/login');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data$ = this.sessionStatus.sessionStatusObservable;
  }

  logout() {
    // Remove browser session
    // this.sessionService.removeData('user-session');
    this.sessionService.clearData();
    // Update user Loggedin value on parent (userSession)
    this.userSession = false;
    this.eventData.emit(this.userSession);
    // Redirect to login
    this.router.navigateByUrl('/login');
  }

}
