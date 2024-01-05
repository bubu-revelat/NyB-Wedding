import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


/**
 * Generated class for the ComidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comida',
  templateUrl: 'comida.html',
})
export class ComidaPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer:EmailComposer,public alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComidaPage');
  }


  writeEmail(message){
        console.log("Entro a donde esta habilitado!");

        //Si tenemos permiso podemos enviar el email
        let email = {
          to: 'nosotros103@hotmail.com',
          cc: 'frontera_noelia@hotmail.com.ar',
          subject: 'Aviso Menu invitado',
          body: message,
          isHtml: true,
          app:"gmail"
        };
        // Mandamos el mail
        console.log("Enviando mail");
        this.emailComposer.open(email);
      };


  sendEmail(){
    {
      const prompt = this.alert.create({
        title: 'Mensaje',
        message: "Tenga el favor de detallarnos como debe ser atendido!",
        inputs: [
          {
            name: 'Codigo',
            placeholder: 'Escriba el mensaje'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Enviar',
            handler: data => {
              let datos=data.Codigo + "<br><br>" + " Nombre: " + localStorage.getItem("userName") +"<br>" + " Email: " + localStorage.getItem("userEmail")
              console.log(datos); 
              this.writeEmail(datos);
            }
          }
        ]
      });
      prompt.present();
    }
  };


}
