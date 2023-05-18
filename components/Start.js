import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const HexColors = ["#090C08", " #474056", " #8A95A5", " #B9C6AE"];

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [chatColor, setChatColor] = useState(null);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../A5-chatapp-assets/BackgroundImage.png")}
        resizeMode="cover"
      >
        <Text style={styles.title}>Chat App!</Text>
        <View>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          <Text style={styles.text}>Choose Background Color</Text>
          {HexColors.forEach((color) => {
            return (
              <TouchableOpacity
                style={[styles.chatColor, { backgroundColor: color }]}
                onPress={() => setChatColor(color)}
              ></TouchableOpacity>
            );
          })}

          <TouchableOpacity
            styles={styles.button}
            onPress={() =>
              navigation.navigate("Chat", { name: name, chatColor: chatColor })
            }
          >
            <Text>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },
  chatColor: {
    // height: 20,
    // width: 20,
    // borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    fontColor: "#FFFFFF",
    height: 20,
    width: 20,
    backgroundColor: "#757083",
    position: "absolute",
  },
});
export default Start;
