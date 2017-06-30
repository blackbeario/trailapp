import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StandingsPage, TeamDetailPage } from '../pages';
@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;
  team: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.navParams, 'ionViewDidLoad TeamHomePage');
  }

}
