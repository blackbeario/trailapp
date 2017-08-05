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
  forecastData: any = {};
  keys: String[];
  days: String[];
  currentLocation: any = {};
  currentWeather: any = {};
  radarVisible: boolean = false;
  forecastVisible: boolean = false;
  radarMessage: string = "Show Radar";
  forecastMessage: string = "Show Forecast";

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
      this.days = Object.keys(this.weather.forecast.txt_forecast.forecastday);
      console.log(this.weather);
    })
    // Go ahead and make the other http calls. Kinda sucks to make 3 calls if we
    // don't need them all, but the radar loads much faster this way on toggle.
    // This also resets our radar in case the user chooses a new city.
    this.getRadar();
  }

  toggleForecast() {
    this.forecastVisible ? this.forecastVisible = false : this.forecastVisible = true;
    this.forecastMessage = this.forecastVisible ?  "Hide Forecast" : "Show Forecast";
  }

  getRadar() {
    let formData = this.searchForm.value;
    // Get the radar for the requested city.
    this.weatherApi.getRadarData(formData.state, formData.city).subscribe(data => {
      this.radar = data;
    })
    console.log('** fetching radar **');
  }

  toggleRadar() {
    // If we haven't already loaded the radar data, go get it.
    // In theory, this should always already be present.
    if (!this.radar._body) {
      let loader = this.loading.create({
        content: 'Fetching Radar...'
      })
      loader.present().then(() => {
        this.getRadar();
        loader.dismiss();
      })
    }
    // This actually toggles the radar visibility.
    this.radarVisible ? this.radarVisible = false : this.radarVisible = true;
    // Toggles the toggle button label text.
    this.radarMessage = this.radarVisible ?  "Hide Radar" : "Show Radar";
  }

}
