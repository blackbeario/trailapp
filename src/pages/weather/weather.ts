import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { WeatherAPI } from '../../shared/shared';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

  weather: any = {};
  keys: String[];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private weatherApi: WeatherAPI,
    private loading: LoadingController) {}

  goHome(){
    this.nav.popToRoot();
  }

  // ionViewDidLoad() {
  //   let loader = this.loading.create({
  //     content: 'Dribbling...'
  //   })
  //   loader.present().then(() => {
  //     this.weatherApi.getWeather().then(data => {
  //       this.weather = data;
  //       let city = this.weather.location.city;
  //       loader.dismiss();
  //       console.log(city);
  //     })
  //   })
  //
  //   this.weatherApi.getWeather().then(data => this.weather = data);
  //   let city = this.weather.location.city;
  // }

  ionViewDidLoad(){
    let weather = this.weatherApi.getWeather().then(data => {
          this.weather = data;
          // let city = this.weather.location.city;
          this.keys = Object.keys(this.weather);
          console.log(this.keys);
          })


    // this.map = {
    //   lat: location.latitude,
    //   lng: location.longitude,
    //   zoom: 12,
    //   markerLabel: games.location
    // };
  }

}
