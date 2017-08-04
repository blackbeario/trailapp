import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherAPI {

  private baseUrl = 'http://api.wunderground.com/api/0d60309ca21e4589/geolookup/conditions';
  private radarUrl = 'http://api.wunderground.com/api/0d60309ca21e4589/animatedradar';
  currentWeather: any = {};
  // private weatherData = {};

  constructor(private http: Http) {}

  // getWeather() {
  //   return new Promise(resolve => {
  //     this.http.get(`${this.baseUrl}/q/IA/Cedar_Rapids.json`)
  //     .subscribe(res => resolve(res.json()));
  //   })
  // }

  getWeatherData(state: string, cityName: string) {
    return this.http.get(`${this.baseUrl}/q/` + state + `/` + cityName + `.json`)
      .map(response => response.json())
      .catch(error => {
        console.error(error);
        return Observable.throw(error.json())
      })
  }

  getRadar(state: string, cityName: string) {
    return this.http.get(`${this.radarUrl}/q/` + state + `/` + cityName + `.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=25`)
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
