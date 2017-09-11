This is a Ionic-ThreeJS-Device-Motion template.

## Pre-installation
Node.js (v6.11.2 LTS)
```bash
https://nodejs.org/
```
NPM (v5.3.0)
```bash
$ sudo npm install -g npm@5.3.0
```

Apache Cordova (v7.0.1)
```bash
$ sudo npm install -g cordova@7.0.1
```
Ionic CLI (v3.9.2)
```bash
$ sudo npm install -g ionic@3.9.2
```

## How to use this template

To use this template, either create a new ionic project using the ionic node.js utility and follow the tutorial below, or copy the files from this repository [Ionic-ThreeJS-Device-Motion](https://github.com/jschax/ionic-threejs-device-motion).

Then, to run it, cd into the project `ionic-threejs-device-motion` and run:

1. Build the project:
  ```bash
  $ npm run build
  ```
2. Build the platform:
  ```bash
  $ cordova platform add android --nofetch
  ```
3. Build the app:
  ```bash
  $ cordova build android
  ```
4. Deploy the app to device:
  ```bash
  $ cordova run android --device
  ```

Substitute android for ios if on a Mac.

## How to create this template?
Open the file [TUTORIAL.md](TUTORIAL.md).

## Thanks to
