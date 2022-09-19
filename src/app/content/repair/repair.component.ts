import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { SessionService } from 'src/app/services/session.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  title = 'Listado de reparaciones';
  repairList: any = [];
  dataSession: any;
  isCheck: any;
  userSession = false;

  constructor(
    private sessionService: SessionService,
    private storageService: StorageService,
    private sessionStatusService: SessionStatusService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Get the Observable of session status
    this.sessionStatusService.getSessionStart().subscribe(res => this.userSession = res);

    // Deny access if no session
    if (!this.userSession) {
      this.router.navigateByUrl('/login');
    }
    
    // Get the user id from storage
    let userId = JSON.parse(this.sessionService.getData('user-id') || ' {}');
    userId = userId.toString();
    // Get the user data
    this.storageService.getAllRepairs(userId)
    .subscribe(
      res => {
        this.dataSession = res;
        this.repairList = res;
        this.isCheck = 'SUCCESS';

      },
      (err: any) => {
        this.isCheck = 'ERROR_USER';
      });

  }

  reloadRepairList(id: number) {
    
    this.storageService.getAllRepairs(id)
      .subscribe(
        res => {
          this.dataSession = res;
          this.repairList = res;
          this.isCheck = 'SUCCESS';
        },
        error => {
          console.error('ERROR_ON_DELETE', error)
        }
      );
  }

  onDelete(id:number) {
    console.warn('ON DELETE REPAIRS', id)
    this.storageService.removeRepair(id)
      .subscribe({
        next: repair => {
          console.info(repair)
          this.reloadRepairList(id);
        },
        error: error => {
          console.error('ERROR querying on deleting repair')
        }
      })
  }

}
