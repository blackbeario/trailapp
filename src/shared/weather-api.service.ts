import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherAPI {

  private baseUrl = 'http://api.wunderground.com/api/0d60309ca21e4589/geolookup/conditions';
  private radarUrl = 'http://api.wunderground.com/api/0d60309ca21e4589/animatedradar';
  currentWeather: any = {};
  currentRadar: any = {};
  radar: any = {};

  constructor(private http: Http) {}

  getWeatherData(state: string, cityName: string) {
    return this.http.get(`${this.baseUrl}/q/` + state + `/` + cityName + `.json`)
      .map(response => response.json())
      .catch(error => {
        console.error(error);
        return Observable.throw(error.json())
      })
  }

  getRadar(state: string, cityName: string) : Observable<any> {
    this.currentRadar = this.http.get(`${this.radarUrl}/q/` + state + `/` + cityName + `.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=25`)
    return this.currentRadar;
  }

  getCurrentRadar(){
    return this.currentRadar;
  }

  // refreshCurrent() {
  //   return this.getWeatherData(this.currentRadar);
  // }

}
