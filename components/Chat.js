import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

//import firebase
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

//Import offline storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { name, chatColor, userID } = route.params;
  const [messages, setMessage] = useState([]);

  let unsubMessageList;
  useEffect(() => {
    if (isConnected == true) {
      if (unsubMessageList) unsubMessageList();
      unsubMessageList = null;

      navigation.setOptions({ title: name });

      //Get all the messages in a database and update the chat
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessageList = onSnapshot(q, (documentSnapshot) => {
        const newMessages = [];
        documentSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessageList(newMessages);
        setMessage(newMessages);
      });
    } else {
      loadCachedList();
    }

    return () => {
      if (unsubMessageList) unsubMessageList();
    };
  }, [isConnected]);

  //Load if the app is offline from the local storage
  const loadCachedList = async () => {
    const cache = (await AsyncStorage.getItem("messages")) || [];
    setMessage(JSON.parse(cache));
  };

  //Add Messages to local storage
  const cacheMessageList = async (listToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(listToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessage) => {
    addDoc(collection(db, "messages"), newMessage[0]);
  };

  //Input toolbar is display none when there is no connection
  const renderInputToolbar = (props) => {
    if (isConnected == true) return <InputToolbar {...props} />;
    else return null;
  };

  //Take a photo, upload an image, and send location
  const renderCustomActions = (props) => {
    return (
      <CustomActions
        onSend={onSend}
        storage={storage}
        userID={userID}
        {...props}
      />
    );
  };

  //Create a map image
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: chatColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
