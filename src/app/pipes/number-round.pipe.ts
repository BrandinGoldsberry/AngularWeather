import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RoundNumber'
})
export class NumberRoundPipe implements PipeTransform {

  transform(value: number, decimalPlaces: number = 0): number {
    return parseFloat(value.toFixed(decimalPlaces));
  }

}
