import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { ListaUsuarios } from '../../app/enviroment'; 
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import {ConexionUsuariosPage} from '../conexion-usuarios/conexion-usuarios.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  

  usuarioSeleccionado: any;

  usuarios : any;

  ref = firebase.database().ref('usuarios/');

  public formGroup: FormGroup;

  imagen = '../../assets/logo.png';

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public navController: NavController,
    private storage: Storage){
    
    this.buildForm();
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({    
      email: ['', [Validators.email, Validators.required]],
      clave: ['', [Validators.required]]
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ConexionUsuariosPage,
      componentProps: { value: 123 }
    });

    modal.onDidDismiss()
      .then((data) => {
        
        this.usuarioSeleccionado = data.data; // Here's your selected user!
        console.log(this.usuarioSeleccionado.clave);
        console.log(this.usuarioSeleccionado.correo);

        // this.formGroup.value.email = this.usuarioSeleccionado.correo;
        // this.formGroup.value.clave = this.usuarioSeleccionado.clave;

        this.formGroup.controls['email'].setValue(this.usuarioSeleccionado.correo);
        this.formGroup.controls['clave'].setValue(this.usuarioSeleccionado.clave);
      });

    return await modal.present();
  }

  async loginToast(validado:boolean) {
    
    if(validado){
      const toast = await this.toastController.create({
        message: 'Bienvenido Usuario',
        showCloseButton: true,
        position: 'top',
        closeButtonText: 'Aceptar',
        duration: 3000
      });
      toast.present();
    }
    else{
      const toast = await this.toastController.create({
        message: 'Clave o Usuario Incorrecto',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Aceptar',
        duration: 3000
      });
      toast.present();
    }  
  }
  
  enviar(){  
    let flagLogin = false;

    this.ref.on('value', resp => {    
      
      this.usuarios = ListaUsuarios(resp);      
      
      for(let usuario of this.usuarios){
        if(usuario.correo == this.formGroup.value.email && usuario.clave == this.formGroup.value.clave){
          flagLogin = true;
          this.loginToast(flagLogin);            
          
          this.storage.set('usuario', usuario);
          
          timer(2500).subscribe(() => this.navController.navigateForward('/menu'));
          

          break;
        }
      }      
      
      if(!flagLogin){
        this.loginToast(flagLogin);   
      }  
    });

  }

  mostrarUsuarios(){
    this.presentModal();

  }



}
