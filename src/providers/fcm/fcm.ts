import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Firebase} from '@ionic-native/firebase';
import {Platform} from 'ionic-angular';
import {AngularFirestoreModule, AngularFirestore} from 'angularfire2/firestore'
import { Observable } from 'rxjs-compat';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(public http: HttpClient, public firebaseNative: Firebase, public afs: AngularFirestore,private platform:Platform) {
    
     
  }

  async getToken(){
    let token;

    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken()
    }
    if (this.platform.is('ios')){
      token =await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    if(!this.platform.is('cordova')){

    }
    return this.saveTokenToFirestor(token);
  }

  private saveTokenToFirestor(token){
    if(!token) return;
    const deviceRef = this.afs.collection('devices');

    const docData={
      token,
      userId:'testUser',
    }
    return deviceRef.doc(token).set(docData);
 
  }

  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen()
  }
}
