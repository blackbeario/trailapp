import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from '../pages';
import { TeamAPI } from '../../shared/shared';


@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private teamApi: TeamAPI,
    private loading: LoadingController) {}

  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage, tourney);
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'Dribbling...'
    })
    loader.present().then(() => {
      this.teamApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      })
    })

    this.teamApi.getTournaments().then(data => this.tournaments = data);
  }

}
