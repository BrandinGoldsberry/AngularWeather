import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { TodayWeatherComponent } from './components/today-weather/today-weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './components/slider/slider.component';
import { FutureDayComponent } from './components/future-day/future-day.component';
import { WeeklyForecastComponent } from './components/weekly-forecast/weekly-forecast.component';
import { WeatherIconPipe } from './pipes/weather-icon.pipe';
import { NumberRoundPipe } from './pipes/number-round.pipe';
import { WeatherIconColorPipe } from './pipes/weather-icon-color.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { ContextColorPipe } from './pipes/context-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    TodayWeatherComponent,
    SliderComponent,
    FutureDayComponent,
    WeeklyForecastComponent,
    WeatherIconPipe,
    NumberRoundPipe,
    WeatherIconColorPipe,
    LoadingComponent,
    ContextColorPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [ContextColorPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
