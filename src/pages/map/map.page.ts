import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { TeamAPI } from '../../shared/shared';
declare var window: any;

@Component({
  templateUrl: 'map.page.html'
})
export class MapPage {

  map: any = {};

  constructor(
    public navParams: NavParams,
    public teamApi: TeamAPI) {
  }

  ionViewDidLoad(){
    let games = this.navParams.data;
    let tourneyData = this.teamApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };

  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }

}
