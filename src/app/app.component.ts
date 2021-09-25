//Injectables/Dependencies
import { Component, HostBinding, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInputService } from './services/user-input.service';
import { WeatherDataService } from './services/weather-data.service';

//Models
import { City } from './models/city';
import { Weather } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'AngularLearning';
  
  cityName: string = "";
  tempUnit: string = "F";
  unitSystem: string = "imperial";
  cityData = <City>{};
  weatherData = <Weather>{};

  temp: Number = 0;

  curIcon: string = "01d";

  cityNameSubscription: Subscription = Subscription.EMPTY;
  unitMeasurementSubscription: Subscription = Subscription.EMPTY;

  constructor(private userInputSub: UserInputService, private cityDataSub: WeatherDataService) {
    
  }

  ngOnInit() {
    this.cityNameSubscription = this.userInputSub.currentCity.subscribe(message => { 
      this.cityName = message;      
      this.weatherData = <Weather>{};
      this.cityData = <City>{};
      this.getCityInfo();
    });
    this.unitMeasurementSubscription = this.userInputSub.currentMeasurement.subscribe(message => {
      if(message === "metric") {
        this.tempUnit = "C";
      } else {
        this.tempUnit = "F";
      }
      this.unitSystem = message;
      this.getCityInfo();
    });
  }

  getCityInfo() {
    this.cityDataSub.getCityInfo(this.cityName, this.unitSystem).subscribe(cData => {

      this.cityData = cData;
      this.getWeatherInfo();
    });
  } 

  getWeatherInfo() {
    this.cityDataSub.getCityWeatherFull(this.cityData.coord.lon, this.cityData.coord.lat, this.unitSystem).subscribe(wData => {
      this.weatherData = wData;
      this.temp = Math.round(wData.current.temp - 273.15);
      this.curIcon = this.weatherData.current.weather[0].icon
    });
  }

  ngOnDestroy() {
    this.cityNameSubscription.unsubscribe();
    this.unitMeasurementSubscription.unsubscribe();
  }
}
