import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";
import { getOwnUserInfo } from "../lib/request";
import globalStyle, { DEFAULT_AVATAR } from "../globalStyle";
import { IconButton, IconTextButton } from "../components/Buttons";
import ProgressBar from "../components/ProgressBar";

const screenHeight = Dimensions.get("window").height;

const topOffset =
  screenHeight * 0.01 +
  (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0);

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
      <View style={[styles.mainContainer, { paddingTop: topOffset }]}>
        <View style={styles.headerContainer}>
          <IconButton
            iconName="settings"
            color="white"
            onPress={() => navigation.navigate("AppSettingsScreen")}
            size={30}
          />
          <Text style={globalStyle.screenTitle}>SkaterQuest</Text>
          <IconButton
            iconName="edit"
            color="white"
            onPress={() => navigation.navigate("SettingsScreen")}
            size={30}
          />
        </View>

        <Image
          source={{ uri: userData?.avatar ?? DEFAULT_AVATAR }}
          height={120}
          width={120}
          style={globalStyle.avatar}
        />

        <Text style={globalStyle.skaterTag}>
          {userData?.skaterTag ?? "@" + userData?.username ?? ""}
        </Text>

        <View style={styles.progressContainer}>
          <ProgressBar />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <IconTextButton
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
            <IconTextButton
              iconName="video-collection"
              text="Mes vidéos"
              onPress={() => navigation.navigate("VideoScreen")}
              iconLeft
            />
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  headerContainer: {
    ...globalStyle.flexRow,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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
