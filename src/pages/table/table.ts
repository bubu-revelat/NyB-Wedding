import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {

  mesa="";
  mensaje="";

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePage');
    if(localStorage.getItem("mesaId")!="" && localStorage.getItem("mesaId")!=null)
    {
      this.mensaje="Tu mesa es";
      this.mesa="'" +localStorage.getItem("mesaId") + "'";
    }
    else
    {
      this.mensaje="Al momento no tienes mesa asignada";
    }
  }
}
