import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Button from "./components/Button";

const notificationSrc = require("./notification.wav");
const { width } = Dimensions.get("window");
const imageUrl = require("./assets/coffeeCup.jpg");

export default function App() {
  const [sound, setSound] = useState();
  const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./notification.wav")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ScrollView>
      <Image
        source={require("./assets/coffeeCup.jpg")}
        style={{ width, height: width }}
      />
      <View style={styles.favoriteContainer}>
        <Text style={styles.favoriteText}>Coffee Shop</Text>
        <Pressable onPress={playSound} title={"sound"}>
          <MaterialCommunityIcons
            name="music-box-outline"
            size={50}
            color="white"
          />
        </Pressable>
      </View>
      <View style={styles.chosenButton}>
        <Button title={"1"} onPress={vibrate} />
        <Button title={"2"} onPress={vibrate} />
        <Button title={"3"} onPress={vibrate} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  favoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "chocolate",
    alignItems: "center",
  },
  favoriteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  chosenButton: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
