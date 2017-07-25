import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  constructor(
    private loader: LoadingController) {
  }

  takePicture() {
    let options: CameraOptions = {
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.PNG,
      mediaType: Camera.MediaType.PICTURE,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false
    }

    let loader = this.loader.create({
      content: 'Dribbling...'
    })
    loader.present().then(() => {
      Camera.getPicture(options).then((imageUri) => {
        this.imgSrc = imageUri;
      })
        // Dismiss loader when coords are located.
        loader.dismiss();
    })
  }

}
