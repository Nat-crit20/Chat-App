import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const HexColors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [chatColor, setChatColor] = useState(null);
  const myRefs = React.useRef([]);

  const displayColor = () => {
    return HexColors.map((color) => {
      return (
        <TouchableOpacity
          style={[styles.chatColor, { backgroundColor: color }]}
          onPress={() => setChatColor(color)}
          key={color} // Add a unique key to each TouchableOpacity
        ></TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../A5-chatapp-assets/BackgroundImage.png")}
        resizeMode="cover"
      >
        <Text style={styles.title}>Chat App!</Text>
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          <Text style={styles.text}>Choose Background Color</Text>
          <View style={styles.colorContainer}>{displayColor()}</View>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Chat", { name: name, chatColor: chatColor })
            }
          >
            <Text style={styles.button_text}>Start Chatting</Text>
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
    justifyContent: "space-around",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#FFFFFF",
    height: "44%",
    justifyContent: "space-around",
    padding: 8,
  },

  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 25,
    width: "90%",
    opacity: 0.5,
    borderWidth: 2,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },
  colorContainer: {
    margin: 0,
    paddingEnd: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatColor: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#757083",
    alignItems: "center",
  },
  button_text: {
    lineHeight: 50,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
export default Start;
