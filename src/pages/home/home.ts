import { Component, ComponentFactoryResolver } from '@angular/core';
import { NavController, ToastController, Item } from 'ionic-angular';
import firebase from 'firebase';
import {GooglePlus} from '@ionic-native/google-plus';
import {LandpagePage} from '../landpage/landpage'
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import {AngularFireModule} from 'angularfire2';
import {snapshotToArray} from '../../app/enviroment'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs-compat';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 fb_login_status:boolean;
 google_login_status:boolean;
 internetStatus: boolean = true;
 invitadosArray=[];
 
  

  constructor(private network: Network,public navCtrl: NavController, public google:GooglePlus, private toastCtrl: ToastController,public platform: Platform) {
    
    const dbRefObject = firebase.database().ref().child('invitados');
    dbRefObject.on('value', snap =>{
      this.invitadosArray=snapshotToArray(snap);
      console.log("Cantidad de registros: " + this.invitadosArray.length);      
    })

    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      console.log("El registro que tenemos es: " + localStorage.getItem("userId"))
      if(localStorage.getItem("userId")!= null && localStorage.getItem("userId")!= "" && localStorage.getItem("userId")!= "null"){
        this.navCtrl.push(LandpagePage);
      }
      else{
        this.logout();
      }
    });
    this.platform.registerBackButtonAction(function(event){
      event.preventDefault();
  }, 101);

  }
  ionViewDidLoad() {
  this.checkNetwork();
  }



  writeUserData(userId,mesa, enable, social, socUid,socDisplayName,socEmail,socPhotoUrl){
    var retorno:boolean= false;
    var that=this;
    firebase.database().ref('invitados/' + userId).update({
      enable:enable,
      social:social
    }, function(error) {
      if (error) {
        console.log("Error guardando data: " + error.toString());
        this.logOut();
      } else {
        console.log("Los datos fueron guardados");
        //Inicio de sesion correcto asignamos variables
          localStorage.setItem("invitedID", userId);
          localStorage.setItem("userId", socUid);
          localStorage.setItem("userName", socDisplayName);
          localStorage.setItem("userEmail", socEmail);
          localStorage.setItem("photo",socPhotoUrl);
          localStorage.setItem("mesaId",mesa)
          localStorage.setItem("social",social);
          console.log("Se logueo correctamente con " + social);
          that.navCtrl.push(LandpagePage);         
      }
    });
  }


  


loginGoogle(localName,localSurname){
  var pos;
  var enable;
  var invitados=this.invitadosArray;
  
  if(localName!="" && localSurname!="" && localName!=" " && localSurname!=" " &&localName!=null && localSurname!=null)
  {
    for(let i=0; i < invitados.length;i++){
      if(invitados[i].nombre!=null && invitados[i].apellido!=null && invitados[i].nombre!="" && invitados[i].apellido!="" )
      {
        if(invitados[i].nombre.toUpperCase()===localName.toUpperCase() && invitados[i].apellido.toUpperCase()===localSurname.toUpperCase())
        {
          //Invitado encontrado
          pos=i;
          enable=true;
        }
     }
    }
    if(enable)
    {
      console.log("Invitado encontrado");
      if(invitados[pos].enable != true && invitados[pos].enable != "true")
      {
        //Damos de alta
        console.log("Login Google apretado");
        console.log("La conexion esta: " +this.isOnline().toString())
        if(this.isOnline()){
        this.google.login({
          'webClientId':'186310144028-dtef00lls9qflo5qegprquof7dgqovub.apps.googleusercontent.com',
          'offline':false
        }).then(res=>{
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(suc=>{
            //se logueo ok escribimos datos en la base
            console.log("Login correctamente, vamos a impactar base");
            this.writeUserData(pos,invitados[pos].mesa,true,"google",res.userId,res.displayName,res.email,res.imageUrl)
          }).catch(error=>{
            this.alertToast("Se encontro un error al iniciar la sesión, inténtelo nuevamente.",6000);
            console.log("Error al inicio de sesion de google: " + error);
          })
        })
       }
      }
      else
      {
        //No puede iniciar sesion ya hay otro con su cuenta
        console.log("Esta deshabilitado");
        if(invitados[pos].social != "" && invitados[pos].social != null && invitados[pos].social !="google")
        { 
          this.alertToast("😝 Debes iniciar sesión con la misma red social ya iniciada, que fue: " + invitados[pos].social,5000);
        }
        else
        {
          this.alertToast("🙏 Sólo puede estar conectado con un dispositivo a la vez.",6000);
        }
      }
    }
    else
    {
      this.alertToast("😰 Verifique que su nombre está bien escrito. Si el problema persiste comuníquese con los organizadores.", 7000);
      //No esta invitado
      console.log("No se encuentra invitado :( ");
    }
  }
  else
    {
      this.alertToast("Debes colocar un nombre y apellido válido 😊",6000);
    }
}



  facebookLogin(localName, localSurname){
    var pos;
    var enable;
    var invitados=this.invitadosArray;
    if(localName!="" && localSurname!="" && localName!=" " && localSurname!=" " &&localName!=null && localSurname!=null)
    {
      
      for(let i=0; i < invitados.length;i++){
        if(invitados[i].nombre!=null && invitados[i].apellido!=null && invitados[i].nombre!="" && invitados[i].apellido!="" ){
          if(invitados[i].nombre.toUpperCase()===localName.toUpperCase() && invitados[i].apellido.toUpperCase()===localSurname.toUpperCase())
          {
            //Invitado encontrado
            pos=i;
            enable=true;
          }
       }
      }
      if(enable)
      {
        console.log("Invitado encontrado");
        console.log("enable: " + invitados[pos].enable);
        if(invitados[pos].enable != true && invitados[pos].enable != "true")
        {
          //Damos de alta
          console.log("Login facebook apretado");
          console.log("La conexion esta: " + this.isOnline())
           if(this.isOnline()){
            firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
            res=>{
                 console.log("Login correctamente, vamos a impacar base");
                 this.writeUserData(pos,invitados[pos].mesa,true,"facebook",res.user.uid,res.user.displayName,res.user.email,res.user.photoURL)
                }
              ).catch(error=>{
              this.alertToast("Se encontro un error al querer iniciar sesion, intentelo mas tarde.", 6000);
                console.log("Error al inicio de facebook: " + error);
              })
            }

          }
        else
        {
          //No puede iniciar sesion ya hay otro con su cuenta
          console.log("Esta deshabilitado");
          if(invitados[pos].social != "" && invitados[pos].social != null && invitados[pos].social!="facebook")
          { 
            this.alertToast("😝 Debes iniciar sesión con la misma red social ya iniciada, que fue: " + invitados[pos].social, 5000);
          }
          else
          {
            this.alertToast("🙏 Sólo puede estar conectado con un dispositivo a la vez.",6000);
          }
        }
      }
      else
      {
        this.alertToast("😰 Verifique que su nombre está bien escrito. Si el problema persiste comuníquese con los organizadores.",7000);
        //No esta invitado
        console.log("No se encuentra invitado :( ");
      }
    }
    else
    {
      this.alertToast("Debes colocar un nombre y apellido válido 😊",6000);
    }
  }


  checkNetwork(){
    console.log("Consultando conexion");
		if (this.network.type === 'none') {
			this.internetStatus = false;
		}

		this.network.onDisconnect().subscribe(() => {
			this.internetStatus = false;
		});

		this.network.onConnect().subscribe(() => {
			this.internetStatus = true;
    });
    
    console.log("La conexion es: " + this.internetStatus.toString());
	}

	isOnline(): boolean {
		return this.internetStatus;
	}
  

  alertToast(mensaje,tiempo) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
  }

  logout(){
    firebase.auth().signOut()
      .then(function (msg) {
        console.log("Ok logOut: " + msg);
        localStorage.clear();
         }).catch(function (msg) {
            console.log("Error: " + msg)
            localStorage.clear();
         });
  };
}