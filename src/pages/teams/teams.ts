import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { TeamHomePage } from '../pages';
import { TeamAPI } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivisions: any;
  selectedItem: any;
  teams = [];
  queryText: string;
  searchQuery: string = '';
  items: string[];

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
    let loader = this.loading.create({
      content: 'Dribbling...'
    })

    loader.present().then(() => {
      this.teamApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
          _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();
        this.teams = this.allTeamDivisions;
        loader.dismiss();
      })
    })
  }

  updateTeams() {
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams })
      }
    })

    this.teams = filteredTeams;
  }

}
