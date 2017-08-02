import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherAPI {

  private baseUrl = 'http://api.wunderground.com/api/0d60309ca21e4589/geolookup/conditions';
  currentWeather: any = {};
  private weatherData = {};

  constructor(private http: Http) {}

  // getWeather() {
  //   return new Promise(resolve => {
  //     this.http.get(`${this.baseUrl}/q/IA/Cedar_Rapids.json`)
  //     .subscribe(res => resolve(res.json()));
  //   })
  // }

  searchWeatherData(state: string, cityName: string) {
    return this.http.get(`${this.baseUrl}/q/` + state + `/` + cityName + `.json`)
      .map(response => response.json())
      .catch(error => {
        console.error(error);
        return Observable.throw(error.json())
      })
  }

  // getWeatherData(locationId, forceRefresh: boolean = false) : Observable<any> {
  //   if (!forceRefresh && this.weatherData[locationId]) {
  //     this.currentWeather = this.weatherData[locationId];
  //     console.log('** no http call **')
  //     return Observable.of(this.currentWeather);
  //   }
  //   // If no data yet go get it.
  //   console.log('** making http call **')
  //   return this.http.get(`${this.baseUrl}/tournaments-data/${locationId}.json`)
  //   .map((response: Response) => {
  //     this.weatherData[locationId] = response.json();
  //     this.currentWeather = this.weatherData[locationId];
  //     return this.currentWeather;
  //   })
  // }

  // getCurrentTourney(){
  //   return this.currentWeather;
  // }

  // refreshCurrent() {
  //   return this.getWeatherData(this.currentWeather.location.id, true);
  // }

}
