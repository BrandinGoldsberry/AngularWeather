import { WeatherIconColorPipe } from './weather-icon-color.pipe';

describe('WeatherIconColorPipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherIconColorPipe();
    expect(pipe).toBeTruthy();
  });
});
