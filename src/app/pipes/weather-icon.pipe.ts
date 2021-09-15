import { Pipe, PipeTransform } from '@angular/core';
import { faCloud, faCloudSun, faSun, faCloudRain, faBolt, faSnowflake, faSmog, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

  transform(value: string): IconDefinition {
    let reg = /\d\d/gm;
    let regRes = reg.exec(value);
    
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
}
