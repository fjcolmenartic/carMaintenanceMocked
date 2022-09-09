import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Value from parent if session started on browser or not
  @Input() userLoggedIn = false;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    let userLoggedIn = this.sessionService.getData('user-logged-in')
  }

}
