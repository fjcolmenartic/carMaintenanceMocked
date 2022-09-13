import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User {
  email: string;
  password: string;
}

/**
 * Authentication service 
 *
 * This service works with json-auth as module of json-server to 
 * mock a database, in json format, on your localhost
 * inside the project folder. 
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // json-server-auth
  // login endpoings: /login  /signin
  // Must register (check sign-in service) first cause password are encripted otherwise won't work
  public login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<User>(`${environment.api}/login`, body);

  }

}
