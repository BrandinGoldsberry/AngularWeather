import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIconColor'
})
export class WeatherIconColorPipe implements PipeTransform {

  transform(value: string): any {
    let reg = /\d\d/gm;
    let regRes = reg.exec(value);
    
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

}
