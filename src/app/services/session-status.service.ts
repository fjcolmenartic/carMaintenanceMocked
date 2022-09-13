import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserSession {
  userSessionService: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStatusService {

  private _sessionStatusObservable: BehaviorSubject<UserSession> = 
  new BehaviorSubject<UserSession>({ userSessionService: false });

  get sessionStatusObservable() {
    return this._sessionStatusObservable.asObservable();
  }

  set sessionStatusObservableData(data: UserSession) {
    this._sessionStatusObservable.next(data);
  }

}
