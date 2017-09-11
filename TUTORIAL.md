# Tutorial
Ionic-ThreeJS-Device-Motion Template

Last Update: 02. September 2017

## How to create this template?

1. Open the folder where the project should be created and run the command below. 
If you are in folder 'c:\projects\' the folder 'c:\projects\ionic-threejs-device-motion' will be created with all necessary files of the ionic project.
  ```bash
  $ ionic start ionic-threejs-device-motion blank
  ```
2. Open the folder, which you created the step before and run the command below.
If everything was installed successfully a web browser will be open and show you the Ionic blank page of the project.
  ```bash
  $ ionic serve
  ```
3. Install the NPM-Packages 'three' and '@ionic-native/device-motion':
  ```bash
  $ npm install @ionic-native/device-motion@3.12.1
  $ npm install three@0.87.1
  ```
4. Add the Apache Cordova plugin 'cordova-plugin-device-motion' to the '/config.xml':
  ```bash
  $ ionic cordova plugin add cordova-plugin-device-motion@1.2.5
  ```
5. Create the '/src/components/' folder:
  ```bash
  /src/components/
  ```
6. Create the '/src/components/scenegraph' in the 'components' folder:
  ```bash
  /src/components/scenegraph/
  ```
7. Add the file '/src/components/scenegraph/scenegraph.component.ts' to the folder:
  ```bash
  import { Component, Input, ElementRef } from '@angular/core';
  import * as THREE from 'three';
  
  @Component({
    selector: 'scenegraph',
    template: '<div style="width:100%; height:100%"></div>'
  })
  export class SceneGraphComponent {
  
    @Input()
    geometry: string;
  
    renderer: THREE.Renderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    mesh: THREE.Mesh;
    animating: boolean;
  
    constructor(
      private sceneGraphElement: ElementRef
    ) {}
  
    ngAfterViewInit() {
      this.scene = new THREE.Scene();
  
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.z = 1000;
  
      let geometry;
      switch(this.geometry) {
        case 'box': geometry = new THREE.BoxGeometry(500, 500, 500); break;
        case 'cylinder': geometry = new THREE.CylinderGeometry(200, 200, 600); break;
        default:
        case 'sphere': geometry = new THREE.SphereGeometry(400);
      }
  
      let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
  
      this.renderer = new THREE.WebGLRenderer();
      this.sceneGraphElement.nativeElement.childNodes[0].appendChild(this.renderer.domElement);
    }
  
    startAnimation() {
      let width = this.sceneGraphElement.nativeElement.childNodes[0].clientWidth;
      let height = this.sceneGraphElement.nativeElement.childNodes[0].clientHeight;
      this.renderer.setSize(width, height);
      this.animating = true;
      this.render();
    }
  
    stopAnimation() {
      this.animating = false;
    }
  
    render() {
      this.mesh.rotation.x += 0.05;
      this.mesh.rotation.y += 0.05;
      this.renderer.render(this.scene, this.camera);
      
      if (this.animating) {
        requestAnimationFrame(() => { this.render() });
      }
    }
  
    rotateCameraZUp() {
      console.log('rotateCameraZUp()');
      this.camera.rotateZ(-0.10);
    }
    
    rotateCameraZDown() {
      console.log('rotateCameraZDown()');
      this.camera.rotateZ(0.10);
    }
    
    rotateCameraUp() {
      console.log('rotateCameraUp()');
      this.camera.rotateX(-0.10);
    }
    
    rotateCameraDown() {
      console.log('rotateCameraDown()');
      this.camera.rotateX(0.10);
    }
    
    rotateCameraLeft() {
      console.log('rotateCameraLeft()');
      this.camera.rotateY(0.10);
    }
    
    rotateCameraRight() {
      console.log('rotateCameraRight()');
      this.camera.rotateY(-0.10);
    }
    
    moveCameraMinus() {
      console.log('moveCameraMinus()');
      this.camera.translateZ(-0.30);
    }
    
    moveCameraPlus() {
      console.log('moveCameraPlus()');
      this.camera.translateZ(0.30);
    }
  }
  ```  
8. Add the component 'SceneGraphComponent' to the '/src/app/app.module.ts':
  ```bash
  import { SceneGraphComponent } from '../components/scenegraph/scenegraph.component';
  declarations: [ ...  SceneGraphComponent, ... ],
  ```
9. Add the provider 'DeviceMotion' to the '/src/app/app.module.ts':
  ```bash
  import { DeviceMotion } from '@ionic-native/device-motion';
  providers: [ ... DeviceMotion ... ]
  ```
10. Add the following code to the page '/src/pages/home/home.ts'
  ```bash
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
  ```
11. Add the following code to the page '/src/pages/home/home.html'
  ```bash
  <ion-content padding>
    <scenegraph geometry="box" #scenegraph></scenegraph>
    <button ion-button block (click)="rotateCameraUp()">Up</button>
    <button ion-button block (click)="rotateCameraDown()">Down</button>
    <button ion-button block (click)="rotateCameraLeft()">Left</button>
    <button ion-button block (click)="rotateCameraRight()">Right</button>
    <button ion-button block (click)="rotateCameraZUp()">ZUp</button>
    <button ion-button block (click)="rotateCameraZDown()">ZDown</button>
    <button ion-button block (click)="moveCameraMinus()">MoveMinus</button>
    <button ion-button block (click)="moveCameraPlus()">MovePlus</button>
  </ion-content>
  ```
12. Build the project:
  ```bash
  npm run build
  ```
13. Build the platform:
  ```bash
  cordova platform add android --nofetch
  ```
14. Build the app:
  ```bash
  cordova build android
  ```
15. Deploy the app to the device:
  ```bash
  cordova run android --device
  ```
