import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Imagenes } from '../../app/enviroment';

import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';

import { ViewChild } from '@angular/core';

import { IonSlides } from '@ionic/angular';

import { timer } from 'rxjs';
 


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
  public accX:any;
  public accY:any;
  public accZ:any;

  public tap: number;

  public subscription: any;
  public activar: boolean = true;

  @ViewChild('slideWithNav') slideWithNav: IonSlides;





  listaImagenes: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1
  };

  ref = firebase.database().ref('imagenes/');

  constructor(
    private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion
    
  ) {
    this.ref.on('value', resp => {
      this.listaImagenes = Imagenes(resp);
    });
  }

  ngOnInit() {

    this.Accelerometer();

  }

  Accelerometer(){
    this.activar=false;
    var flag = true;
    // var flagIzq =  true;
    // var flagDer = true;

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
       console.log(acceleration),
   
    //  (error: any) => console.log(error)
 
    );
    
    
    
      // Watch device acceleration
    this.subscription = this.deviceMotion.watchAcceleration({frequency:200}).subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        this.accX=acceleration.x;
        this.accY=acceleration.y;
        this.accZ=acceleration.z;
        let tap;
        
        
        
       
        
        if(this.accY > 8){
          
          console.log("Esta vertical");
        
          timer(3000).subscribe(() => {
            if(this.accY > 3){
              
              this.slideWithNav.slideTo(0);
              
            
            }
        
          });
        }
        
        //izquierda 
        if(this.accX > 3){
            
            console.log("Esta a la izquierda");
            this.slideWithNav.slidePrev(500).then(() => {
              //this.checkIfNavDisabled(object, slideView);
            });
            // timer(500).subscribe(() => {
            //   if(this.accX > 3){
            //     flagIzq = false;
            //     //Comienza a Reproducir
            //     console.log("Comienza a Reproducir");
            //     let audioIzq = new Audio();
            //     audioIzq.src = '../../assets/larga.mp3';          
            //     audioIzq.load();            
            //     audioIzq.play();
            //   }
            // }); 
          
         }
         
        //derecha 
        if(this.accX < -3 ){
          
          console.log("Esta orientado hacia la derecha");
           this.slideWithNav.slideNext(500).then(() => {
            //this.checkIfNavDisabled(object, slideView);
          });

          
        } 
        

      
      }); 
  
  }

  Frenar(){
      this.subscription.unsubscribe();
      this.activar = true;
    }

  //Move to Next slide
  // slideNext(object, slideView) {
  //   slideView.slideNext(500).then(() => {
  //     //this.checkIfNavDisabled(object, slideView);
  //   });
  // }
 
  // //Move to previous slide
  // slidePrev(object, slideView) {
  //   slideView.slidePrev(500).then(() => {
  //     //this.checkIfNavDisabled(object, slideView);
  //   });;
  // }





}
