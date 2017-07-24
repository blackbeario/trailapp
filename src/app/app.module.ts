import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { AgmCoreModule } from '@agm/core';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { CameraPage, GeolocationComponent, MapPage, MyTeamsPage, GamePage, TeamDetailPage, TeamsPage, TournamentsPage, TeamHomePage, StandingsPage } from '../pages/pages';
import { TeamAPI, SqlStorage, UserSettings } from '../shared/shared';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage,
    GeolocationComponent,
    CameraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvIzb2oZwFJS70Hbqax8ASIZT21k-1efQ'
    }),
    IonicStorageModule.forRoot({
      name: '_mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage,
    MapPage,
    GeolocationComponent,
    CameraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SqlStorage,
    UserSettings,
    SQLite,
    TeamAPI,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
