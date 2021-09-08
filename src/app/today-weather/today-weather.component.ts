import { Component, Input, OnChanges } from '@angular/core';
import { faCloud, faCloudSun, faSun, faCloudRain, faBolt, faSnowflake, faSmog, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.sass']
})
export class TodayWeatherComponent implements OnChanges {
  @Input() currentWeather: any;
  @Input() tempUnit: string = 'F';
  curTemp: string = "";
  curFeel: string = "";
  curIcon: IconDefinition = faCloud;
  curIconClass: string = "cloud";
  curIconColor: any = {color: "gray"};
  highTemp: number = 0;
  lowTemp: number = 0;

  constructor() { 
  }
  
  ngOnChanges(): void {
    console.log(this.currentWeather);
    this.curTemp = Math.round(this.currentWeather.current.temp).toString();
    this.curIcon = this.iconIdToFAIcon(this.currentWeather.current.weather[0].icon);
    this.curFeel = Math.round(this.currentWeather.current.feels_like).toString();
    this.curIconClass = this.iconIdToFAClass(this.currentWeather.current.weather[0].icon);
    this.curIconColor = this.iconIdToFAColor(this.currentWeather.current.weather[0].icon);
  }

  iconIdToFAIcon(id: string): IconDefinition {
    let reg = /\d\d/gm;
    let regRes = reg.exec(id);
    
    if(regRes !== null) {
      switch (regRes[0]) {
        case "01":
          return faSun;
        case "02":
          return faCloudSun;
        case "09":
        case "10":
          return faCloudRain;
        case "11":
          return faBolt;
        case "13":
          return faSnowflake;
        case "50":
          return faSmog;
        default:
          return faCloud;
      }
    } else {
      return faCloud;
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

  iconIdToFAColor(id: string): Object {
    let reg = /\d\d/gm;
    let regRes = reg.exec(id);
    
    if(regRes !== null) {
      switch (regRes[0]) {
        case "01":
          return {color: "orange"};
        case "02":
          return {color: "gray"};
        case "09":
        case "10":
          return {color: "blue"};
        case "11":
          return {color: "blue"};
        case "13":
          return {color: "lightblue"};
        case "50":
          return {color: "darkgray"};
        default:
          return {color: "gray"};
      }
    } else {
      return {color: "gray"};
    }
  }

  getTempExtremes() {
    this.currentWeather.hourly
  }
}
