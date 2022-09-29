import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
 
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
