import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  private citySource = new BehaviorSubject('New York');
  currentCity = this.citySource.asObservable();
  private measurementUnits = new BehaviorSubject('imperial')
  currentMeasurement = this.measurementUnits.asObservable();
  constructor() { }

  changeCity(message: string) {
    this.citySource.next(message)
  }
  changeUnits(message: string) {
    this.measurementUnits.next(message);
  }
}
