import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GeolocationComponent } from './geolocation';

@NgModule({
  declarations: [
    GeolocationComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    GeolocationComponent
  ]
})
export class GeolocationComponentModule {}
