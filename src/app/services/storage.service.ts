import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarModel } from '../models/car-model';
import { RepairModel } from '../models/repair-model';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
/**
 * Local Storage 
 *
 * This service uses the navigator JS object 'local storage'
 * to get some persitance along the different pages until all the
 * data is collected and ready for a more definitive persistance
 * on database, file or whatever.
 * 
 * As a more secure alternative to cookies.
 */

// NOTE localStorage vs sessionStorage ...
// TODO When connected to a BE maybe it's better to check data like
// email against to the Db and use session storage instead of local storage
// to avoid unathorized access by another users in shared computers
// TODO While connecting to BE allowing data check like email MUST 
// save data to the Db on every submit form so this makes this service obsolete
export class StorageService {

  constructor(private http: HttpClient) { }

  // USER STORAGE METHODS ---------------
  // -- doesn't have insert cause is in sign-in service
  // neither get cause is in auth service
  setUser(
    name: string, 
    email: string, 
    password: string, 
    city: string,
    userId: number
  ): Observable<any> {
    const body = { name, email, password, city };

    return this.http.put<UserModel>(`${environment.api}/users/${userId}`, body);
  }

  getUser(userId:string) {
    return this.http.get<UserModel>(`${environment.api}/users/${userId}`);
  }

  removeUser(userId: number): Observable<any> {
    return this.http.delete(`${environment.api}/users/${userId}`);
  }

  // CAR STORAGE METHODS -----------------
  setCar( 
    plateNumber: string,
    brand: string,
    model: string,
    color: string,
    doors: number,
    type: string,
    kilometers: number,
    year: number,
    engine: number,
    userId: number,
    id: number
    ): Observable<any> {
      const body = { 
        plateNumber, 
        brand, 
        model, 
        color, 
        doors, 
        type, 
        kilometers, 
        year, 
        engine, 
        userId, 
        id
      };

      return this.http.post<CarModel>(`${environment.api}/cars`, body);
    }

  getCar(id:string) {
    return this.http.get<CarModel>(`${environment.api}/cars?userId=${id}`);
  }

  // editCar(id: number): Observable<any> {
  //   const body = {};
  //   return this.http.put<UserModel>(`${environment.api}/users/${id}`);
  // }

  removeCar(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/cars/${id}`);
  }

  // REPAIR STORAGE METHODS -----------------
  setRepair(
    plateNumber: string,
    userId: number,
    faultyPart: string,
    faultyDescription: string,
    dateIn: string,
    fixDescription: string,
    fixedOn: string,
    status: string,
    repeat: boolean,
    cost: number,
    minutes: number
  ): Observable<any> {
    const body = { 
      plateNumber, 
      userId,
      faultyPart,
      faultyDescription,
      dateIn,
      fixDescription,
      fixedOn,
      status,
      repeat,
      cost,
      minutes
    };
    return this.http.post<CarModel>(`${environment.api}/cars`, body);
  }

  getRepair(id: string) {
    return this.http.get<RepairModel>(`${environment.api}/repairs?userId=${id}`);

  }

  getAllRepairs(id:string) {
    return this.http.get<RepairModel>(`${environment.api}/repairs?userId=${id}`);
  }

  editRepair() {}

  removeRepair(id:number): Observable<any> {
    return this.http.delete(`${environment.api}/repairs/${id}`);
  }

}
