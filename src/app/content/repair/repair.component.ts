import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  title = 'Listado de reparaciones';
  repairList: any;
  dataSession: any;
  isCheck: any;
  userSession = false;

  constructor(
    private sessionService: SessionService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the user id from storage
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
    // Get the user data
    this.storageService.getAllRepairs(userId)
    .subscribe(
      res => {
        this.dataSession = res;
        this.repairList = res;
        console.warn(res)
        this.isCheck = 'SUCCESS';

      },
      (err: any) => {
        this.isCheck = 'ERROR_USER';
      });

  }

  onEdit(id:number) {

  }

  onDelete(id:number) {
    
  }

}
