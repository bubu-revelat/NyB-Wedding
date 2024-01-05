import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
/**
 * Generated class for the DepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {

  cbu:any;
  datos:any;
  cuenta:any;
  movimiento:any;
  dni:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public copy:Clipboard, public toastCtrl:ToastController) {
    this.datos="Bernardo Bogado"
    this.dni="DNI: 32936505"
    this.cbu="0150501601000344191650";
    this.cuenta="C.A.$  0501/01344191/65"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
  }

  copyClipboard(){
    //Copiamos CBU
    this.copy.clear();
    this.copy.copy(this.cbu);
    setTimeout(function() {
    }, 2000); 
    this.alertToast("💪 ¡COPIADO! ya lo podés pegar donde quieras",5000);

    //Damos Movimiento al avion
    this.movimiento="movePlane";
    
    //Hacemos aparecer los vientos
    let classImg2 = document.getElementsByClassName('img2') as HTMLCollectionOf<HTMLElement>;
    console.log("Elementos encotrados: " + classImg2.length)
    if (classImg2.length != 0) {
      let i=0;
      for(i=0;i<classImg2.length;i++)
      {
        classImg2[i].style.opacity = "1.0";
      }
      
    }
  };


  alertToast(mensaje,tiempo) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
  }

}
