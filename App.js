import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "./components/Start";
import Chat from "./components/Chat";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
