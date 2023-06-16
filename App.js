//import constants
import FIREBASECONFIG from "./contants";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

import { useEffect } from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { Alert } from "react-native";

//import network connectivity checker
import { useNetInfo } from "@react-native-community/netinfo";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjfIKhlG0-GK5k5-f90IxnxBzpoIyqlNg",
  authDomain: "chat-app-3c693.firebaseapp.com",
  projectId: "chat-app-3c693",
  storageBucket: "chat-app-3c693.appspot.com",
  messagingSenderId: "94166338002",
  appId: "1:94166338002:web:574152e046ee83b80b200b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected == false) {
      Alert.alert("Connection Lost");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
