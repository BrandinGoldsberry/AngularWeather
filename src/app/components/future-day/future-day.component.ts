import { Component, Input, OnChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FutureDay } from '../../models/futureDay';

@Component({
  selector: 'future-day',
  templateUrl: './future-day.component.html',
  styleUrls: ['./future-day.component.sass']
})
export class FutureDayComponent implements OnChanges {
  @Input('data') data!: FutureDay;
  @Input('index') index: number = 0;

  dayOfWeek: string = "Sun";
  weekday: string[] = new Array(7);

  constructor() { 
    this.weekday[0] = "Sun";
    this.weekday[1] = "Mon";
    this.weekday[2] = "Tue";
    this.weekday[3] = "Wed";
    this.weekday[4] = "Thu";
    this.weekday[5] = "Fri";
    this.weekday[6] = "Sat";
  }

  ngOnChanges(): void {
    var d = new Date();
    d.setDate(d.getDate() + this.index + 1);

    this.dayOfWeek = this.weekday[d.getDay()];
  }

}
