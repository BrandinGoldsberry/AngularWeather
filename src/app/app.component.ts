//Injectables/Dependencies
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInputService } from './user-input.service';
import { WeatherDataService } from './weather-data.service';

//Models
import { City } from './city';
import { Weather } from './weather';

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

  cityNameSubscription: Subscription = Subscription.EMPTY;
  unitMeasurementSubscription: Subscription = Subscription.EMPTY;

  constructor(private userInputSub: UserInputService, private cityDataSub: WeatherDataService) {
    
  }

  ngOnInit() {
    this.cityNameSubscription = this.userInputSub.currentCity.subscribe(message => { 
      this.cityName = message
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
      console.log(wData);
      
      this.weatherData = wData;
      this.temp = Math.round(wData.current.temp - 273.15);
    });
  }

  ngOnDestroy() {
    this.cityNameSubscription.unsubscribe();
  }
}
