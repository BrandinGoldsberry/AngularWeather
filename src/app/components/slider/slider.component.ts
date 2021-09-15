import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SliderEvent } from './sliderEvent';
import { SlideState } from './slideState';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass']
})
export class SliderComponent {
  @Input() defaultState: SlideState = SlideState.Left;
  @Input() leftDisplay: string | undefined;
  @Input() rightDisplay: string | undefined;

  @Output() sliderToggle = new EventEmitter<SliderEvent>();
  
  state: SlideState = SlideState.Left;

  constructor() {
  }

  toggleSlide() {
    console.log("Slide toggled");
    
    this.state = this.state === SlideState.Left ? SlideState.Right : SlideState.Left;
    let newEvent: SliderEvent = {
      state: this.state
    }
    this.sliderToggle.emit(newEvent);
  }
}
