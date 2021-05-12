# firebase-messaging-sw.js
💬 JAVASCRIPT - Firebase service worker with custom icon and "fallback icon", notification click_action and custom data.

Extracted and modified from

https://github.com/firebase/quickstart-js/issues/71

### 🖼️ Icon
You can pass an icon through the Firebase interface, otherwise the default icon will be `YOUR_APP_DOMAIN/icons/firebase-logo.png`

![image](https://user-images.githubusercontent.com/21183964/118019538-7acca980-b32f-11eb-9aa2-a8240e9c6b49.png)

### 🖱️ Click action

`click_action` is an optional parameter that must be entered in the notification panel of firebase cloud messaging as shown below. When clicking on the notification, the user will be redirected to the link informed as the value of the `click_action` parameter, if the parameter is not informed the user will be redirected to the host of the application

![image](https://github.com/BrunoS3D/firebase-messaging-sw.js/blob/main/image.png)
