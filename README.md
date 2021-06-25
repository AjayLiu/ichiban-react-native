<p align="center">
  <a href="https://github.com/AjayLiu/ichiban-react-native">
    <img src="public/imgs/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Ichiban React Native</h3>

  <p align="center">
    The <a href="https://github.com/AjayLiu/ichiban">Ichiban</a> anime guessing game but ported from web to React Native for iOS and Android.
    <br />
    <a href="https://play.google.com/store/apps/details?id=com.ichibanreactnative"><strong>Google Play Store Link »</strong></a>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#development">Development</a></li>
        <li><a href="#publishing">Publishing</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="preview.jpg" width="150px"></img>

My first React Native application which basically reused like 80% of the code from the original Ichiban web version.

### Built With
* [React Native](https://reactnative.dev/)

<!-- GETTING STARTED -->
## Getting Started

Here is a guide if you want to clone the project and modify it for yourself:

### Prerequisites

* [npm](https://www.npmjs.com/)
* [git](https://git-scm.com/)

### Installation

1. Clone the repo
     ```sh
     git clone https://github.com/AjayLiu/ichiban-react-native.git
     ```
2. Install package
     ```sh
     npm install
     ```

### Development

To test on Android, use:
  ```
  npm run android
  ```
    
Make sure to have an [AVD](https://developer.android.com/studio/run/managing-avds) installed

### Publishing

https://reactnative.dev/docs/signed-apk-android

NOTE: What I did was a little tricky because I didn't want to expose the keystore credentials in this git repo.

1. Generate a keystore
    ```sh
    keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
    ```
    Remember what you put for the keystore password. 
    This should create a file called my-upload-key.keystore
  
2. Move this keystore to /android/app/

3. (FOR WINDOWS) Go to ~/.gradle/gradle.properties (if the file doesn't exist, create a grade.properties) (also ~ means your User path, so something like C:\Users\Bob) and enter
    ```
    MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
    MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
    MYAPP_UPLOAD_STORE_PASSWORD= [ENTER YOUR PASSWORD HERE]
    MYAPP_UPLOAD_KEY_PASSWORD= [ENTER YOUR PASSWORD HERE]
    ```
4. Double check that you are in the /android/ directory and run
    ```
    ./gradlew bundleRelease
    ```
5. Your .apk and .aab files will be generated in android/app/build/outputs/

6. Choose one of them to upload to Google Play Store! :tada:
   
<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Ajay Liu - contact@ajayliu.com

Project Link: [https://github.com/AjayLiu/ichiban-react-native](https://github.com/AjayLiu/ichiban-react-native)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Jikan API](https://jikan.moe)
