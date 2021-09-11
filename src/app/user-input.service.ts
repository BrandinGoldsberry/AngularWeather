import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  public currentCity: Observable<string>;
  public currentMeasurement: Observable<string>;
  
  private citySource: BehaviorSubject<string>;
  private measurementUnits: BehaviorSubject<string>;
  constructor() { 
    let city: string | undefined = this.getCookie("city") || "New York";
    
    this.citySource = new BehaviorSubject(city);
    this.currentCity = this.citySource.asObservable();

    let units: string | undefined = this.getCookie("units") || "Imperial";
    this.measurementUnits = new BehaviorSubject(units);
    this.currentMeasurement = this.measurementUnits.asObservable();
  }

  changeCity(message: string) {
    this.setCookie("city", message, 365);
    this.citySource.next(message)
  }
  changeUnits(message: string) {
    this.setCookie("units", message, 365);
    this.measurementUnits.next(message);
  }

  //Taken from w3schools
  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(cname: string): string | undefined {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  }
}
