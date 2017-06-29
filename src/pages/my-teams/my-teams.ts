import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TournamentsPage, TeamsPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTrails(){
    this.navCtrl.push(TournamentsPage);
  }

  getLocalTrails(){
    this.navCtrl.push(TeamsPage);
  }

}
