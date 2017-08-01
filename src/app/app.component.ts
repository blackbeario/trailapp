import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WeatherPage, MyTeamsPage, TeamHomePage, TournamentsPage, GeolocationComponent, CameraPage } from '../pages/pages';
import { TeamAPI, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any;// = MyTeamsPage;

  constructor(
    public events: Events,
    public loadingController: LoadingController,
    public platform: Platform,
    public teamApi: TeamAPI,
    public userSettings: UserSettings,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.userSettings.initStorage().then(() => {
        this.rootPage = MyTeamsPage;
        this.refreshFavorites();
        this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      });

    });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs);
    //this.favoriteTeams = this.userSettings.getAllFavorites();
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goLocation() {
    this.nav.push(GeolocationComponent);
  }

  goTakePicture() {
    this.nav.push(CameraPage);
  }

  checkWeather() {
    this.nav.push(WeatherPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.teamApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }
}
