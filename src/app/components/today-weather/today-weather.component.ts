import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faCloud, faCloudSun, faSun, faCloudRain, faBolt, faSnowflake, faSmog, faTint, faWind, faArrowDown, faArrowUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Weather } from '../../models/weather';

@Component({
  selector: 'today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.sass']
})
export class TodayWeatherComponent implements OnChanges {
  @Input() currentWeather!: Weather;
  @Input() tempUnit: string = 'F';
  @ViewChild("iconElem") private iconElem!: ElementRef<HTMLElement>;

  curTemp: string = "";
  curFeel: string = "";
  curIcon: string = "03d";
  curIconClass: string = "cloud";
  curIconColor: any = {color: "gray"};
  curIconScaleFix: string = "";
  curIconTranslateFix: string = "";
  highTemp: number = Math.max();
  lowTemp: number = Math.min();
  windSpeed: number = 0;
  windDirection: string = "N";
  humidity: number = 0;
  faWind = faWind;
  faTint = faTint;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  constructor() { 
  }
  
  ngOnChanges(): void {
    let icon: string = this.currentWeather.current.weather[0].icon;
    this.curTemp = Math.round(this.currentWeather.current.temp).toString();
    this.curIcon = icon;
    this.curFeel = Math.round(this.currentWeather.current.feels_like).toString();
    this.curIconClass = this.iconIdToFAClass(icon);
    this.curIconTranslateFix = this.iconIdToScaleFix(icon) + " " + this.iconIdToTranslateFix(icon);
    this.highTemp = 0;
    this.lowTemp = Math.min();
    this.windSpeed = Math.round(this.currentWeather.current.wind_speed);
    this.windDirection = this.degreesToCardinalDirection(this.currentWeather.current.wind_deg);
    this.humidity = this.currentWeather.current.humidity;
    this.initTempExtremes();
  }

  degreesToCardinalDirection(degree: number): string {
    let sector: number = Math.floor(degree / 22.5);
    
    switch (sector) {
      case 15:
      case 16:
      case 0:
        return "N";
      case 1:
      case 2:
        return "NW";
      case 3:
      case 4:
        return "W";
      case 5:
      case 6:
        return "SW";
      case 7:
      case 8:
        return "S";
      case 9:
      case 10:
        return "SE";
      case 11:
      case 12:
        return "E";
      case 13:
      case 14:
        return "NE";
      default:
        return "N";
    }
  }

  iconIdToFAClass(id: string): string {
    let reg = /\d\d/gm;
    let regRes = reg.exec(id);
    
    if(regRes !== null) {
      switch (regRes[0]) {
        case "01":
          return "sun";
        case "02":
          return "cloud-sun";
        case "09":
        case "10":
          return "rain";
        case "11":
          return "bolt";
        case "13":
          return "snow";
        case "50":
          return "smog";
        default:
          return "cloud";
      }
    } else {
      return "cloud";
    }
  }

  iconIdToScaleFix(id: string): string {
    let reg = /\d\d/gm;
    let regRes = reg.exec(id);
    
    if(regRes !== null) {
      switch (regRes[0]) {
        case "01":
          return "grow-3";
        case "02":
          return "";
        case "09":
        case "10":
          return "shrink-3";
        case "11":
          return "";
        case "13":
          return "";
        case "50":
          return "shrink-3";
        default:
          return "shrink-1";
      }
    } else {
      return "shrink-1";
    }
  }

  iconIdToTranslateFix(id: string): string {
    let reg = /\d\d/gm;
    let regRes = reg.exec(id);
    
    if(regRes !== null) {
      switch (regRes[0]) {
        case "01":
          return "right-2";
        case "02":
          return "";
        case "09":
        case "10":
          return "";
        case "11":
          return "right-4 down-1";
        case "13":
          return "right-1";
        case "50":
          return "left-2";
        default:
          return "";
      }
    } else {
      return "";
    }
  }

  initTempExtremes() {
    let hours = this.currentWeather.hourly;
    
    for (let index = 0; index < hours.length; index++) {
      const element = hours[index];
      
      this.highTemp = Math.round(element.temp > this.highTemp ? element.temp : this.highTemp);
      this.lowTemp = Math.round(element.temp < this.lowTemp ? element.temp : this.lowTemp);
    }
  }
}
