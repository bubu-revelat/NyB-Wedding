import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {GooglePlus} from '@ionic-native/google-plus';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore'
import firebase from 'firebase';
import {Firebase} from '@ionic-native/firebase'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {VideoPlayer} from '@ionic-native/video-player';
import { EmailComposer } from '@ionic-native/email-composer';
import { Clipboard } from '@ionic-native/clipboard';
import { GoogleMaps}from '@ionic-native/google-maps';
import { LoadingController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
import {FIREBASE_CONFIG} from '../app/enviroment'


//Paginas cargadas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LandpagePage} from '../pages/landpage/landpage';
import {TablePage} from '../pages/table/table';
import {DepositPage} from '../pages/deposit/deposit';
import { ComidaPage } from '../pages/comida/comida';
import { MapaPage } from '../pages/mapa/mapa'
import { FcmProvider } from '../providers/fcm/fcm';

firebase.initializeApp(FIREBASE_CONFIG);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandpagePage,
    TablePage,
    DepositPage,
    ComidaPage,
    MapaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandpagePage,
    TablePage,
    DepositPage,
    ComidaPage,
    MapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    VideoPlayer,
    EmailComposer,
    Clipboard,
    GoogleMaps,
    LoadingController,
    ScreenOrientation,
    Network,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FcmProvider
  ]
})
export class AppModule {}
