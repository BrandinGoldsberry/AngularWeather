import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureDayComponent } from './future-day.component';

describe('FutureDayComponent', () => {
  let component: FutureDayComponent;
  let fixture: ComponentFixture<FutureDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
