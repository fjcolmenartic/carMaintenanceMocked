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
  // Update process (Insert is caming from sign-in-service)
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

  // Get a particular car by id
  getCar(id:number) {
    return this.http.get<CarModel>(`${environment.api}/cars/${id}`);
  }

  // Get all the cars of an user id
  getAllCars(id:number) {
    return this.http.get<CarModel>(`${environment.api}/cars?userId=${id}`);
  }

  // Get the whole cars on db to check if present while registering a new one
  checkCar(plateNumber: string) {
    return this.http.get<CarModel>(`${environment.api}/cars?plateNumber=${plateNumber}`);
  }

  updateCar( 
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

    return this.http.put<CarModel>(`${environment.api}/cars`, body);
  }

  removeCar(id: number): Observable<any> {
    console.log('on storage service delete')
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
    fixed: boolean,
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
      fixed,
      cost,
      minutes
    };
    return this.http.post<RepairModel>(`${environment.api}/repairs`, body);
  }

  getRepair(id: number) {
    return this.http.get<RepairModel>(`${environment.api}/repairs/${id}`);
  }

  getAllRepairs(id:number) {
    return this.http.get<RepairModel>(`${environment.api}/repairs?userId=${id}`);
  }

  getAllCarRepairs(plateNum: string) {
    return this.http.get<RepairModel[]>(`${environment.api}/repairs?plateNumber=${plateNum}`);
  }

  updateRepair(
    plateNumber: string,
    userId: number,
    faultyPart: string,
    faultyDescription: string,
    dateIn: string,
    fixDescription: string,
    fixedOn: string,
    fixed: boolean,
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
      fixed,
      cost,
      minutes
    };
    return this.http.put<RepairModel>(`${environment.api}/repairs`, body);
  }

  removeRepair(id:number): Observable<any> {
    return this.http.delete(`${environment.api}/repairs/${id}`);
  }

}
