import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {VideoPlayer} from '@ionic-native/video-player'
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import {TablePage} from '../table/table'
import {DepositPage} from '../deposit/deposit'
import {ComidaPage} from '../comida/comida'
import { MapaPage } from '../mapa/mapa';
import { LoadingController } from 'ionic-angular';
import { catchError } from 'rxjs/operators';
import { FcmProvider } from '../../providers/fcm/fcm';
import {tap} from 'rxjs/operators'


/**
 * Generated class for the LandpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landpage',
  templateUrl: 'landpage.html',
})
export class LandpagePage {

  data:Observable<any>;
  urlInstagram="https://api.instagram.com/v1/users/self/media/recent/?access_token=10201121681.d85d79c.89576f80297d461cafa2bb53e3b8d853";
  posts:any;
  titulo:any;
  hashtags:any;
  messageWelcome="Aguarde unos segundos nos estamos poniendo lindos... 💁" ;

  constructor(public fcm: FcmProvider, public alert: AlertController,public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public http: HttpClient, public toastCtrl:ToastController) {
 
  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LandpagePage');
    this.presentLoading(this.messageWelcome);

    // this.fcm.getToken()
    // this.fcm.listenToNotifications().pipe(
    //   tap(msg =>{
    //     this.alertToast(msg.body,5000);
    //   })
    // ).subscribe
  }

  //Bubu
  //userid instagram 6e2b6bc0ecab45cdbf6f4065fcad9f75
  //#access_token=376174397.6e2b6bc.913b094cf69a4f3fbc6f9f69388a91b6

  //NBwedding
  //userid instagram:d85d79c603b144b4ba6b0b57c82e85df
  //#access_token=10201121681.d85d79c.89576f80297d461cafa2bb53e3b8d853

  presentLoading(message) {
    const loader = this.loadingCtrl.create({
      content: message,
      duration: 3000
    });
    loader.present();
    this.getData();
  }



  doRefresh(refresher) {
    console.log('Comienza refresh...', refresher);
    
    setTimeout(() => {
      this.getData();
      console.log('Refresh termino!');
      refresher.complete();
    }, 2000);
  }

  getData(){
    this.data = this.http.get(this.urlInstagram);
    this.data.subscribe(data=>{
        console.log("Datos de instagram: " + JSON.stringify(data.data[0].images.standard_resolution.url) );
        this.posts=data.data;
        console.log("Pidiendo datos...")
        
        //Actualizando datos Mesa
      firebase.database().ref('/invitados/' + localStorage.getItem('invitedID')).once('value').then(function(snapshot) {
        var mesa = (snapshot.val() && snapshot.val().mesa) || '';
        localStorage.setItem('mesaId',mesa);
        console.log("La mesa ahora es: " + mesa);
      }).catch(error=>{
        this.alertToast("🙊 No tenes conexion a internet, pueda que la aplicación no se visualice correctamente", 6000);
          console.log("Error al tomar datos de mesa: " + error);
        });
  },(err) => {
    //Zona de error
    this.alertToast("🙊 No tenes conexion a internet, pueda que la aplicación no se visualice correctamente", 6000);
    console.log("Error al tomar data instagram: " +err)})
}

  

  cutText(texto){
    if(texto.includes("#"))
      {
        this.titulo= texto.substring(0, texto.indexOf('#'));
        this.hashtags= texto.substring(texto.indexOf("#"));
      }
    else{
      this.titulo=texto;
      this.hashtags="";
    }
  }


  table(){
    this.navCtrl.push(TablePage);
  }

  deposit(){
    this.navCtrl.push(DepositPage);
  }

  menu(){
    this.navCtrl.push(ComidaPage);
  }
  maps(){
    this.navCtrl.push(MapaPage);
  }


  logout(){
    let that=this;
    const loader = this.loadingCtrl.create({
      content: "Saliendo! 🏃",
      duration: 3000
           });
      loader.present();
    firebase.auth().signOut()
      .then(function (msg) {
        console.log("Ok logOut");
        that.updateDataOut()
         }).catch(function (msg) {
            console.log("Error: " + msg)
         });
  };

    
  updateDataOut()
  {
    let that=this;
    firebase.database().ref('invitados/' + localStorage.getItem('invitedID')).update({
      enable:false
    },function(error){
      if(error){
        that.alertToast("👽 Hay problemas de conexion, volvé a intentarlo mas tarde.",5000);
      }
      else{
        console.log("LISTO PAPA");
        localStorage.clear();
        that.navCtrl.pop();
      }
    });
 
  }

  alertToast(mensaje,tiempo) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
  }


  consultaSalida(){
    {
      const prompt = this.alert.create({
        title: 'Salir',
        message: "😭 ¿Estás seguro que querés salir de la aplicación?",
        buttons: [
          {
            text: 'NO',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'SI',
            handler: data => {
              this.logout();
            }
          }
        ]
      });
      prompt.present();
    }
  };


}
