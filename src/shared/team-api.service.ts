import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';

@Injectable()
export class TeamAPI {

  private baseUrl = 'https://team-schedule-app.firebaseio.com';
  currentTourney: any = {};

  constructor(private http: Http) {}

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));
    })
  }

  getTournamentData(tourneyId) {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
    .map((response: Response) => {
      this.currentTourney = response.json();
      return this.currentTourney;
    })
  }

}
