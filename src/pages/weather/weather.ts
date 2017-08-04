import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { WeatherAPI } from '../../shared/shared';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})

export class WeatherPage {
  public searchForm = this.fb.group({
    state: ["", Validators.required],
    city: ["", Validators.required],
  });

  weather: any = {};
  radar: any = {};
  keys: String[];
  currentLocation: any = {};
  currentWeather: any = {};
  radarVisible: boolean = false;
  message: string = "Show Radar";


  constructor(
    public fb: FormBuilder,
    public nav: NavController,
    public navParams: NavParams,
    private weatherApi: WeatherAPI,
    // private loading: LoadingController
  ) {}

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

  // ionViewDidLoad(){
  //   this.weatherApi.getWeather().then(data => {
  //     this.weather = data;
  //     // let city = this.weather.location.city;
  //     this.keys = Object.keys(this.weather);
  //     console.log("Current", this.weather);
  //   })
  // }

  getConditions(event) {
    let formData = this.searchForm.value;
    // Get the conditions for the requested city.
    this.weatherApi.getWeatherData(formData.state, formData.city).subscribe(data => {
      this.weather = data;
      this.keys = Object.keys(this.weather);
      // console.log(this.weather);
    })

    // Get the radar for the requested city.
    this.weatherApi.getRadar(formData.state, formData.city).subscribe(data => {
      this.radar = data;
      // console.log(this.radar);
    })
  }

  toggleRadar() {
    this.radarVisible ? this.radarVisible = false : this.radarVisible = true;
    this.message = this.radarVisible ?  "Hide Radar" : "Show Radar"
  }

}
