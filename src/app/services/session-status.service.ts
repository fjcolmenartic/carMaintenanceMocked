import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';

interface UserSession {
  loggedIn: boolean;
  userId: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStatusService {

  private sessionStart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // TODO return an object with id, name etc

  getSessionStart(): Observable<boolean> {
    return this.sessionStart$.asObservable();
  }

  setSessionStart(value: boolean) {
    this.sessionStart$.next(value);
  }


  // private sessionStatus$: BehaviorSubject<UserSession> = new BehaviorSubject<UserSession>({
  //   "loggedIn": false,
  //   "userId": 0,
  //   "name": ''
  // });

  // getSession(): Observable<UserSession> {
  //   return this.sessionStatus$.asObservable();
  // }

  // setSession(value: UserSession) {
  //   this.sessionStatus$.next(value);
  // }

  // sessionStatus() {
  //   return this.sessionStatus$.value.loggedIn;
  // }

  // removeSession() {
  //   this.sessionStatus$.next({
  //     "loggedIn": false,
  //     "userId": 0,
  //     "name": ''
  //   });
  // }


}
