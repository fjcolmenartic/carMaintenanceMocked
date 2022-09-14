import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

interface UserSession {
  loggedIn: boolean;
  userId: number;
  name: string;
}

// export interface UserSession {
//   userSessionService: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class SessionStatusService {

  // private _sessionStatusObservable: BehaviorSubject<UserSession> = 
  // new BehaviorSubject<UserSession>({ userSessionService: false });

  // get sessionStatusObservable() {
  //   return this._sessionStatusObservable.asObservable();
  // }

  // set sessionStatusObservableData(data: UserSession) {
  //   this._sessionStatusObservable.next(data);
  // }

  user: UserSession = {
    "loggedIn": false,
    "userId": 0,
    "name": ''
  }

  setUserSessionData(userId: number, name:string) {
    this.user['loggedIn'] = true;
    this.user['userId'] = userId;
    this.user['name'] = name;
  }

  getUserSessionData() {
    return this.user;
  }

  removeSession() {
    this.user['loggedIn'] = false;
    this.user['name'] = '';
    this.user['userId'] = 0;
  }

  checkSessionStatus() {
    let loggedIn = this.user['loggedIn'];

    if(loggedIn) {
      console.log('SESSION TRUE')
      return true;
    } else {
      console.log('SESSION FALSE')
      return false;
    }

  }


}
