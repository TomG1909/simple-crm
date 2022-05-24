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


  }
  async getWeatherData() {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Munich&APPID=07db5dc1c44f9e1fbcb6e6462b0f55d5')
      .then(response => response.json())
      .then(data => { this.setWeatherData(data); })

    /*let data = JSON.parse('{"coord":{"lon":11.5755,"lat":48.1374},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":296.65,"feels_like":296.1,"temp_min":295.51,"temp_max":297.92,"pressure":1012,"humidity":40},"visibility":10000,"wind":{"speed":1.79,"deg":330,"gust":3.58},"clouds":{"all":71},"dt":1653233037,"sys":{"type":2,"id":2002112,"country":"DE","sunrise":1653190003,"sunset":1653245657},"timezone":7200,"id":2867714,"name":"Munich","cod":200}');
    console.log('loaded WeatherData', data);*/


  }

  setWeatherData(data: any) {

    this.weatherData = data;
    this.weatherDetails = this.weatherData['weather'][0];
    this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@2x.png`;
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


