import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
    private loading: LoadingController
  ) {}

  goHome(){
    this.nav.popToRoot();
  }

  getConditions(event) {
    let formData = this.searchForm.value;
    // Get the conditions for the requested city.
    this.weatherApi.getWeatherData(formData.state, formData.city).subscribe(data => {
      this.weather = data;
      this.keys = Object.keys(this.weather);
    })
  }

  toggleRadar() {
    // If we haven't already loaded the radar data, go get it.
    if (!this.radar._body) {
      let loader = this.loading.create({
        content: 'Fetching Data...'
      })
      loader.present().then(() => {
        let formData = this.searchForm.value;
        // Get the radar for the requested city.
        this.weatherApi.getRadar(formData.state, formData.city).subscribe(data => {
          this.radar = data;
        })
        console.log('** fetching data **');
        // The loader appears to be dismissing early, but actually the data is
        // retrieved quickly, but the image hasn't loaded in the browser. Hmmm...
        loader.dismiss();
      })
    }
    this.radarVisible ? this.radarVisible = false : this.radarVisible = true;
    this.message = this.radarVisible ?  "Hide Radar" : "Show Radar";
  }
}
