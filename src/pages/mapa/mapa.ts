import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,Marker,Environment} from '@ionic-native/google-maps';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map: GoogleMap;


  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    // Environment.setEnv({
    //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC5ncuUeQKfxy59cHZDd065pIAvh60JZFI',
    //   'API_KEY_FOR_BROWSER_DEBUG': '(AIzaSyC5ncuUeQKfxy59cHZDd065pIAvh60JZFI'
    // });

    Environment.setBackgroundColor("#F5735A");
    let element: HTMLElement = document.getElementById('map_canvas');

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
          title: 'Zabala Paz',
          lat: -34.661308,
          lng: -58.520045
         },
         zoom: 15
       }      
    };
    this.map = GoogleMaps.create(element, mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Zabala Paz',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: -34.661308,
        lng: -58.520045
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.map.setCameraZoom(20);
    });
  }

}
