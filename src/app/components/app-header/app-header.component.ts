import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInputService } from '../../services/user-input.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SliderEvent } from '../slider/sliderEvent';
import { SlideState } from '../slider/slideState';
import { ContextColorPipe } from 'src/app/pipes/context-color.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.sass']
})
export class AppHeaderComponent implements OnInit, OnChanges {
  @HostBinding("style.--context-color") contextColor?: string;
  @Input("curIcon") curIcon: string = "01d";

  faSearch = faSearch;

  city: string = "";
  subscription: Subscription = Subscription.EMPTY;

  constructor(private data: UserInputService, private contextColorPipe: ContextColorPipe, private element: ElementRef) { }

  ngOnInit() {
    this.contextColor = this.contextColorPipe.transform(this.curIcon);
    if(this.curIcon.indexOf("n") > -1) {
      document.documentElement.style.setProperty("--background-color", "#000000");
      document.documentElement.style.setProperty("--font-color", "#ffffff");
    } else {
      document.documentElement.style.setProperty("--background-color", "#fff");
      document.documentElement.style.setProperty("--font-color", "#000");
    }
    this.subscription = this.data.currentCity.subscribe(message => this.city = message);
  }

  ngOnChanges() {
    this.contextColor = this.contextColorPipe.transform(this.curIcon);
    
    if(this.curIcon.indexOf("n") > -1) {
      document.documentElement.style.setProperty("--background-color", "#000000");
      document.documentElement.style.setProperty("--font-color", "#ffffff");
    } else {
      document.documentElement.style.setProperty("--background-color", "#fff");
      document.documentElement.style.setProperty("--font-color", "#000");
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newCity(input: string): void {
    this.data.changeCity(input);
  }

  unitToggleHandler(event: SliderEvent): void {
    this.switchUnits(event.state === SlideState.Left ? "imperial" : "metric");
  }

  switchUnits(input: string): void {
    this.data.changeUnits(input);
  } 
}
