import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInputService } from '../../services/user-input.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SliderEvent } from '../slider/sliderEvent';
import { SlideState } from '../slider/slideState';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.sass']
})
export class AppHeaderComponent implements OnInit {
  faSearch = faSearch;

  city: string = "";
  subscription: Subscription = Subscription.EMPTY;

  constructor(private data: UserInputService) { }

  ngOnInit() {
    this.subscription = this.data.currentCity.subscribe(message => this.city = message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newCity(input: string): void {
    this.data.changeCity(input);
  }

  unitToggleHandler(event: SliderEvent): void {
    console.log(event);
    
    this.switchUnits(event.state === SlideState.Left ? "imperial" : "metric");
  }

  switchUnits(input: string): void {
    this.data.changeUnits(input);
  } 
}
