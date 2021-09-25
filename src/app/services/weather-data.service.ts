import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { City } from '../models/city';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient) {}

  getCityInfo(cityToGet: string, measurementUnits: string): Observable<City> {
    return this.http.get<City>(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityToGet}&units=${measurementUnits}&appid=${environment.OWAppId}`
    );
  }

  getCityWeatherFull(lon: Number, lat: Number, measurementUnits: string): Observable<Weather> {
    return this.http.get<Weather>(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&units=${measurementUnits}&lon=${lon}&appid=${environment.OWAppId}`
    );
  }
}
