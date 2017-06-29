import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamDetailPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  selectedItem: any;

  teams = [
    { id: 1, name: '18 Elite' },
    { id: 2, name: '12 Elite' },
    { id: 3, name: 'Chicken Fuckers'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamDetailPage, team);
  }

}
