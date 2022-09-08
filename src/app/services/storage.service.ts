import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*
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

  constructor() { }

  // Save one item
  saveData(key:string,value:string | number | boolean) {
    console.log('On storage Service');
    localStorage.setItem(key,JSON.stringify(value));
  }

  // Returns one item
  getData(key:string):string | null {
    console.log('On get local storage');
    // return JSON.parse(localStorage.getItem(key) ?? '');
    return JSON.parse(localStorage.getItem(key)!);
  }

  // Removes one item key - value pair
  removeData(key:string):void {
    localStorage.removeItem(key);
  }

  // Clears all the data key - value pairs
  clearData() {
    localStorage.clear();
  }

}
