import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamAPI {

  private baseUrl = 'https://team-schedule-app.firebaseio.com';
  currentTourney: any = {};
  private tourneyData = {};

  constructor(private http: Http) {}

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));
    })
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId];
      console.log('** no http call **')
      return Observable.of(this.currentTourney);
    }
    // If no data yet go get it.
    console.log('** making http call **')
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
    .map((response: Response) => {
      this.tourneyData[tourneyId] = response.json();
      this.currentTourney = this.tourneyData[tourneyId];
      return this.currentTourney;
    })
  }

  getCurrentTourney(){
    return this.currentTourney;
  }

  refreshCurrent() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

}
