import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionStart = false;

  setStatus(bool: boolean) {
    this.sessionStart = bool;
  }

  getStatus(): boolean {
    return this.sessionStart;
  }

  // BROWSER SESSION STORAGE SERVICE
  // Save one item
  saveData(key:string,value:string | number | boolean) {
    sessionStorage.setItem(key,JSON.stringify(value));
  }

  // Returns one item
  getData(key:string):string | null {
    return sessionStorage.getItem(key);
  }

  // Removes one item key - value pair
  removeData(key:string):void {
    sessionStorage.removeItem(key);
  }

  // Clears all the data key - value pairs
  clearData() {
    sessionStorage.clear();
  }

}
