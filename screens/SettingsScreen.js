import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../reducers/user";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import * as ImagePicker from "expo-image-picker";
import { IconTextButton } from "../components/Buttons";
import globalStyle, { DEFAULT_AVATAR } from "../globalStyle";
import { changeUserAvatar, getOwnUserInfo } from "../lib/request";
import { useIsFocused } from "@react-navigation/native";

export default function SettingsScreen({ navigation }) {
  //Recup les info utilisateur

  const [updateWatcher, forceUpdate] = useReducer((p) => p + 1, 0);
  const isFocused = useIsFocused();

  const { token } = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, [isFocused, updateWatcher]);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission requise", "Autorise l'accès à la galerie");
      return false;
    }
    return true;
  };

  const pickImageFromLibrary = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
        const uri = pickerResult.assets[0].uri;
        console.log(uri);
        const { result } = await changeUserAvatar(token, uri);
        console.log(result);
        result && forceUpdate();
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
    }
  };

  const handleImagePress = () => {
    Alert.alert("Changer la photo de profil", "Choisis une option :", [
      { text: "Galerie", onPress: pickImageFromLibrary },
      { text: "Annuler", style: "cancel" },
    ]);
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={
              userData?.avatar ? { uri: userData.avatar } : DEFAULT_AVATAR
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={globalStyle.screenTitle}>Reglages</Text>

        <View style={styles.buttonContainer}>
          <IconTextButton
            iconName="edit"
            text="Changer SkaterTag"
            iconLeft
            onPress={() => console.log("Changer SkaterTag")}
          />
          <IconTextButton
            iconName="settings"
            text="Autres options qu'on oublie"
            onPress={() => console.log("Autres options")}
          />
          <IconTextButton
            iconName="emoji-people"
            text="Equipes"
            onPress={() => console.log("Equipes")}
          />
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    gap: 100,
    alignItems: "center",
  },
});
