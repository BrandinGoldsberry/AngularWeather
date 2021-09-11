import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faCloud, faCloudSun, faSun, faCloudRain, faBolt, faSnowflake, faSmog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Weather } from '../weather';

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
  curIcon: IconDefinition = faCloud;
  curIconClass: string = "cloud";
  curIconColor: any = {color: "gray"};
  curIconScaleFix: string = "";
  curIconTranslateFix: string = "";
  highTemp: number = Math.max();
  lowTemp: number = Math.min();

  constructor() { 
  }
  
  ngOnChanges(): void {
    let icon: string = this.currentWeather.current.weather[0].icon;
    this.curTemp = Math.round(this.currentWeather.current.temp).toString();
    this.curIcon = this.iconIdToFAIcon(icon);
    this.curFeel = Math.round(this.currentWeather.current.feels_like).toString();
    this.curIconClass = this.iconIdToFAClass(icon);
    this.curIconColor = this.iconIdToFAColor(icon);
    this.curIconTranslateFix = this.iconIdToScaleFix(icon) + " " + this.iconIdToTranslateFix(icon);
    this.highTemp = 0;
    this.lowTemp = Math.min();
    this.initTempExtremes();
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

  iconIdToScaleFix(id: string): string {
    let reg = /\d\d/gm;
    let regRes = reg.exec(id);
    
    if(regRes !== null) {
      switch (regRes[0]) {
        case "01":
          return "";
        case "02":
          return "shrink-3";
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
          return "shrink-3";
      }
    } else {
      return "shrink-3";
    }
  }

  iconIdToTranslateFix(id: string): string {
    let reg = /\d\d/gm;
    let regRes = reg.exec(id);
    
    if(regRes !== null) {
      switch (regRes[0]) {
        case "01":
          return "";
        case "02":
          return "left-2";
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
          return "left-2";
      }
    } else {
      return "";
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
          return {color: "#519df5"};
        case "11":
          return {color: "#519df5"};
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

  initTempExtremes() {
    let hours = this.currentWeather.hourly;
    
    for (let index = 0; index < hours.length; index++) {
      const element = hours[index];
      
      this.highTemp = Math.round(element.temp > this.highTemp ? element.temp : this.highTemp);
      this.lowTemp = Math.round(element.temp < this.lowTemp ? element.temp : this.lowTemp);
    }
  }
}
