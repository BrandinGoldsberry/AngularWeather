import { Component, Input, OnChanges } from '@angular/core';
import { FutureDay } from '../../models/futureDay';

@Component({
  selector: 'weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.sass']
})
export class WeeklyForecastComponent implements OnChanges {
  @Input('days') futureDays!: FutureDay[];

  constructor() { }

  ngOnChanges(): void {
    this.futureDays.shift();
  }

}
