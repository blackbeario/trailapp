import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { TeamAPI } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  selectedItem: any;
  teams = [];
  tournaments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private teamApi: TeamAPI,
    private loading: LoadingController
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    this.teamApi.getTournamentData(selectedTourney.id).subscribe(data => {
      this.teams = data.teams;
    })

    let loader = this.loading.create({
      content: 'Dribbling...'
    })

    loader.present().then(() => {
      this.teamApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      })
    })
  }

}
