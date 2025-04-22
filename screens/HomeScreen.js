import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import BackgroundWrapper from "../components/BackgroundWrapper";
import IconButton from "../components/IconButton";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";
import { getOwnUserInfo } from "../lib/request";
import globalStyle from "../globalStyle";

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  //Recup les info utilisateur
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
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate("AppSettingsScreen")}
        >
          <Icon name="settings" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={globalStyle.screenTitle}>SkateQuest</Text>

        {/* Icône du crayon en haut à droite */}
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Image de profil */}
      <Image
        source={
          userData?.avatar
            ? { uri: userData.avatar }
            : require("../assets/Trasher.png")
        }
        style={styles.profileImage}
      />

      <View style={styles.buttonContainer}>
        {/* "Livre de tricks" + image à droite */}
        <View style={styles.row}>
          <IconButton
            iconName="book"
            buttonText="Livre de tricks"
            onPress={() => navigation.navigate("TricksScreen")}
            style={styles.iconButton}
          />
          <Animatable.Image
            animation="bounceInRight"
            duration={1000}
            source={require("../assets/Skater01.png")}
            style={styles.sideImage}
            resizeMode="contain"
          />
        </View>

        {/* Image à gauche + "Mes vidéos" */}
        <View style={styles.row}>
          <Animatable.Image
            animation="bounceInLeft"
            duration={1000}
            source={require("../assets/Skater02.png")}
            style={styles.sideImage}
            resizeMode="contain"
          />
          <IconButton
            iconName="video"
            buttonText="Mes vidéos"
            onPress={() => navigation.navigate("VideoScreen")}
            style={styles.iconButton}
          />
        </View>

        {/* "Mon équipe" + image à droite */}
        <View style={styles.row}>
          <IconButton
            iconName="users"
            buttonText="Mon équipe"
            onPress={() => navigation.navigate("CrewScreen")}
            style={styles.iconButton}
          />
          <Animatable.Image
            animation="bounceInUp"
            duration={1000}
            source={require("../assets/Skater03.png")}
            style={styles.sideImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    ...globalStyle.flexRow,
    width : "100%",
    justifyContent : "space-between",
    alignItems : "flex-start"

  },
  settingsIcon: {
    marginLeft: 20,
  },
  editIcon: {
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 0,
  },
  buttonContainer: {
    width: "100%",
    gap: 30,
    marginTop: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  sideImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  iconButton: {
    width: 160,
  },
});
