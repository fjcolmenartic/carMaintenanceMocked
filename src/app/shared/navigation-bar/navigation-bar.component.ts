import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  // Value from parent if session started on browser or not
  @Input() userLoggedIn = false;
  // @Output() userLoggedInChange = new EventEmitter();
  
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    // Remove browser session
    this.sessionService.removeData('user-session');
    // Update user Loggedin value on parent (userSession)
    this.userLoggedIn = false;
    // Redirect to login
    this.router.navigateByUrl('/login');
  }

}
