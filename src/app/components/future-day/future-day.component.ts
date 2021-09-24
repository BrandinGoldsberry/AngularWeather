import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FutureDay } from '../../models/futureDay';
import { UserInputService } from 'src/app/services/user-input.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'future-day',
  templateUrl: './future-day.component.html',
  styleUrls: ['./future-day.component.sass']
})
export class FutureDayComponent implements OnChanges, OnInit {
  @Input('data') data!: FutureDay;
  @Input('index') index: number = 0;

  tempUnit: string = "F";
  dayOfWeek: string = "Sun";
  weekday: string[] = new Array(7);
  unitMeasurementSubscription: Subscription = Subscription.EMPTY;

  constructor(private userInputSub: UserInputService) { 
    this.weekday[0] = "Sun";
    this.weekday[1] = "Mon";
    this.weekday[2] = "Tue";
    this.weekday[3] = "Wed";
    this.weekday[4] = "Thu";
    this.weekday[5] = "Fri";
    this.weekday[6] = "Sat";
  }

  ngOnInit(): void {
    this.unitMeasurementSubscription = this.userInputSub.currentMeasurement.subscribe(message => {
      if(message === "metric") {
        this.tempUnit = "C";
      } else {
        this.tempUnit = "F";
      }
    });
  }


  ngOnChanges(): void {
    var d = new Date();
    d.setDate(d.getDate() + this.index + 1);

    this.dayOfWeek = this.weekday[d.getDay()];
  }

}
