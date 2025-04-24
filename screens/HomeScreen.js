import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";
import { getOwnUserInfo } from "../lib/request";
import globalStyle, { DEFAULT_AVATAR } from "../globalStyle";
import { Button } from "../components/Buttons";

// Import seulement le composant
import ProgressBar from "../components/ProgressBar";

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const { token } = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, [isFocused]);

  return (
    <BackgroundWrapper>
      {/* Icône des paramètres en haut à gauche */}
      <View style={styles.headerContainer}>
        <Button
          iconName="settings"
          color="white"
          onPress={() => navigation.navigate("AppSettingsScreen")}
          size={30}
          containerStyle={styles.settingsButton}
        />
        {/* Titre de l'écran */}
        <Text style={globalStyle.screenTitle}>SkaterQuest</Text>

        {/* Icône du crayon en haut à droite */}
        <Button
          iconName="edit"
          color="white"
          onPress={() => navigation.navigate("SettingsScreen")}
          size={30}
          containerStyle={styles.settingsButton}
        />
      </View>

      {/* Image de profil */}
      <Image
        source={{ uri: userData?.avatar ?? DEFAULT_AVATAR }}
        height={120}
        width={120}
        style={globalStyle.avatar}
      />

      {/* Affichage du SkaterTag */}
      <Text style={globalStyle.skaterTag}>
        {userData?.skaterTag ?? "@" + userData?.username ?? ""}
      </Text>
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <ProgressBar />
      </View>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button
            iconName="book"
            text="Livre de tricks"
            onPress={() => navigation.navigate("TricksScreen")}
          />
          <Animatable.Image
            animation="bounceInRight"
            duration={1000}
            source={require("../assets/Skater01.png")}
            style={styles.sideImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.row}>
          <Animatable.Image
            animation="bounceInLeft"
            duration={1000}
            source={require("../assets/Skater02.png")}
            style={styles.sideImage}
            resizeMode="contain"
          />

          <Button
            iconName="video-collection"
            text="Mes vidéos"
            onPress={() => navigation.navigate("VideoScreen")}
            iconLeft
          />
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    ...globalStyle.flexRow,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  progressContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton : {
    backgroundColor : "transparent"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  row: {
    ...globalStyle.flexRow,
    justifyContent: "center",
    gap: 10,
  },
  sideImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
});
