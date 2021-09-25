import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contextColor'
})
export class ContextColorPipe implements PipeTransform {

  transform(value: string): string {
    let reg = /\d\d/gm;
    let regRes = reg.exec(value);
    
    let dayReg = /[dn]/gm;
    let dayRes = dayReg.exec(value);
    
    if(regRes !== null && dayRes !== null) {
      if(dayRes[0] === "n") {
        return "#150c40";
      } else {
        switch (regRes[0]) {
          case "01":
          case "02":
            return "#87ceeb";
          case "09":
          case "10":
          case "11":
            return "#419fdf";
          case "13":
            return "#dfe4e7";
          case "50":
            return "#7f8486";
          default:
            return "#c2c2c2";
        }
      }
    } else {
      return "#000";
    }
  }
}
