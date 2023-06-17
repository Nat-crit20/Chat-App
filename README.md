# Chat-App

## Overview

The purpose is to learn how to build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

After downloading the code and installing the necessary dependencies.
First you need to create a constants.js file and add your firebaseConfig after you can start the app with expo start or npm run start

## Used Technologies

- React Native
- Google Firebase
- Google Firestore Database
- Expo

### Libraries used

Gifted-chat
React-navigation
Expo-image-picker
Expo-location
React-native-maps
Async-storage

## Getting started

Install nodejs LTS version

### Installation

Clone the repository:

```shell
git clone https://github.com/Nat-crit20/Chat-App.git
```

In the `App.js` file replace the `firebaseConfig` variable with the configuration info from your own Firestore
database:

```js
const firebaseConfig = {
  apiKey: "Your-api-key",
  authDomain: "your-authdomain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};
```

then run the next commands:

```shell
npx expo install
npx expo start
```

## Known Bugs

Currently `Take a photo` does not work on some Android phones
