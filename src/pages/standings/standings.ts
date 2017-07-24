import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamAPI } from '../../shared/shared';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  team: any;
  standings: any[];
  allStandings: any[];
  divisionFilter = 'division';

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private teamApi: TeamAPI) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.teamApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    // console.log('standings:', this.standings);
    this.allStandings = tourneyData.standings;
    this.filterDivision();
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    }
    else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }

}
