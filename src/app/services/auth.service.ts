import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // json-server-auth
  // login endpoings: /login  /signin
  // Must register first cause password are encripted otherwise won't work

  public login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<User>(`${environment.api}/login`, body);

    // ?name=email
  }

  // getUser/s
}
