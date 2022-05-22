import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  weatherData: any;
  weatherDetails: any;
  weatherIcon: any;
  constructor() { }

  ngOnInit(): void {
    this.weatherData = {
      main: {},
      isDay: true
    };
    this.getWeatherData();
    console.log('loaded WeatherData', this.weatherData);

  }
  async getWeatherData() {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Munich&APPID=07db5dc1c44f9e1fbcb6e6462b0f55d5')
      .then(response => response.json())
      .then(data => { this.setWeatherData(data); })



  }

  setWeatherData(data: any) {

    this.weatherData = data;
    this.weatherDetails = this.weatherData['weather'][0];
    this.weatherIcon = 'http://openweathermap.org/img/wn/${this.WeatherDetails.icon}@4x.png';
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);

    console.log('weatherdetails', this.weatherDetails.icon)
  }
}


