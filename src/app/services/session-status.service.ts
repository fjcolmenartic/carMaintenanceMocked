import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStatusService {

  private sessionStart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sessionName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private sessionId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getSessionStart(): Observable<boolean> {
    return this.sessionStart$.asObservable();
  }

  setSessionStart(value: boolean) {
    this.sessionStart$.next(value);
  }

  getSessionName(): Observable<string> {
    return this.sessionName$.asObservable(); 
  }

  setSessionName(value: string) {
    this.sessionName$.next(value);
  }

  getSessionId(): Observable<number> {
    return this.sessionId$.asObservable(); 
  }

  setSessionId(value: number) {
    this.sessionId$.next(value);
  }

}
