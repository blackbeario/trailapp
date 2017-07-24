import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StandingsPage, TeamDetailPage } from '../pages';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;
  team: any;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log(this.navParams, 'ionViewDidLoad TeamHomePage');
  }

  goHome(){
    this.nav.popToRoot();
  }
}
