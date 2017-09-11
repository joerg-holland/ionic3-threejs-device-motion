import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { SceneGraphComponent } from '../../components/scenegraph/scenegraph.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('scenegraph')
  sceneGraph: SceneGraphComponent;

  subscription: any;

  public lastX: number;
  public lastY: number;
  public lastZ: number;

  constructor(
    public deviceMotion: DeviceMotion,
    public navCtrl: NavController
  ) {
    // Get the device current acceleration
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);

        this.lastX = acceleration.x;
        this.lastY = acceleration.y;
        this.lastZ = acceleration.z;
      },
      (error: any) => {
        console.log(error)
      }
    );

    // Watch device acceleration
    this.subscription = this.deviceMotion.watchAcceleration({frequency: 1000}).subscribe(
      (acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);

        this.lastX = acceleration.x;
        this.lastY = acceleration.y;
        this.lastZ = acceleration.z;

        if(acceleration.x > 3){
          this.rotateCameraLeft();
        }else if(acceleration.x < -3){
          this.rotateCameraRight();
        }

        if(acceleration.y > 3){
          this.rotateCameraDown();
        }else if(acceleration.y < -3){
          this.rotateCameraUp();
        }
      }
    );
  }

  ionViewDidEnter() {
    this.sceneGraph.startAnimation();
  }

  ionViewDidLeave() {
    this.sceneGraph.stopAnimation();
  }

  rotateCameraZUp() {
    this.sceneGraph.rotateCameraZUp();
  }

  rotateCameraZDown() {
    this.sceneGraph.rotateCameraZDown();
  }

  rotateCameraUp() {
    this.sceneGraph.rotateCameraUp();
  }

  rotateCameraDown() {
    this.sceneGraph.rotateCameraDown();
  }

  rotateCameraLeft() {
    this.sceneGraph.rotateCameraLeft();
  }

  rotateCameraRight() {
    this.sceneGraph.rotateCameraRight();
  }

  moveCameraMinus() {
    this.sceneGraph.moveCameraMinus();
  }

  moveCameraPlus() {
    this.sceneGraph.moveCameraPlus();
  }
}
