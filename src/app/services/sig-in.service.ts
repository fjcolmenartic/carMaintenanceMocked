import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Register {
  name: string;
  email: string;
  password: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  
  constructor(private http: HttpClient) { }

  // json-server-auth
  // register endpoints: /register  /signup  /users

  public register(
    name: string, 
    email: string, 
    password: string, 
    city: string
  ): Observable<any> {
    const body = { name, email, password, city };

    return this.http.post<Register>(`${environment.api}/users`, body);

  }

}







