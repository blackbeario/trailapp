import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage } from '../pages';
import { TeamAPI, UserSettings } from '../../shared/shared';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {
  favorites = [];

  constructor(
    public nav: NavController,
    public loadingController: LoadingController ,
    public teamApi: TeamAPI,
    public userSettings: UserSettings) {}

    favoriteTapped($event, favorite) {
      let loader = this.loadingController.create({
        content: 'Dribbling...',
        // dismissOnPageChange: true
      });

      loader.present().then(() => {
        this.teamApi.getTournamentData(favorite.tournamentId).subscribe(data => {
          this.nav.push(TeamHomePage, favorite.team);
        })
          loader.dismiss();
        })
    }

    goToTrails(){
      this.nav.push(TournamentsPage);
    }

    ionViewWillEnter() {
      this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
    }

}
