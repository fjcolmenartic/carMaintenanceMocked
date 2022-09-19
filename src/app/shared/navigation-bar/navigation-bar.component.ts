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
    private sessionStatusService: SessionStatusService,
    private router: Router,
  ) {
   }

  ngOnInit(): void {

    this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);

  }

  logout() {
    // Remove browser session
    this.sessionService.clearData();
    // Reset vars
    this.userName = '';
    this.userSession = false;
    // Reset service
    this.sessionStatusService.setSessionStart(false);
    this.router.navigateByUrl('/login');
  }

}
