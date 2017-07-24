import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'geolocation',
  templateUrl: 'geolocation.html'
})
export class GeolocationComponent {

  location: { lat: number, lng: number };

  constructor(private loader: LoadingController) {}

  getLocation() {
    let loader = this.loader.create({
      content: 'Dribbling...'
    })
    loader.present().then(() => {
      Geolocation.getCurrentPosition().then((resp) => {
        this.location = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
        // Dismiss loader when coords are located.
        loader.dismiss();
      })

    })
  }

}
