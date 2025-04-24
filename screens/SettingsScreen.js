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
  TextInput,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import * as ImagePicker from "expo-image-picker";
import { Button, StateButton } from "../components/Buttons";
import globalStyle, { COLOR_CANCEL, DEFAULT_AVATAR } from "../globalStyle";
import { changeUserAvatar, getOwnUserInfo } from "../lib/request";
import { useIsFocused } from "@react-navigation/native";
import ModalContent from "../components/ModalContent";

export default function SettingsScreen({ navigation }) {
  const [updateWatcher, forceUpdate] = useReducer((p) => p + 1, 0);
  const isFocused = useIsFocused();
  const { token } = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      if (result) {
        console.log("USER DATA REÇUE :", data); // 👈 Log ici
        setUserData(data);
      }
    });
  }, [updateWatcher, isFocused]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newSkaterTag, setNewSkaterTag] = useState("");

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
        const { result } = await changeUserAvatar(token, uri);
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

  const updateSkaterTag = async () => {
    if (!newSkaterTag.trim()) {
      Alert.alert("Erreur", "SkaterTag ne peut pas être vide");
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.60:3000/user/skaterTag`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          newSkaterTag,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Réponse inattendue:", text);
        Alert.alert("Erreur serveur", "Réponse non JSON");
        return;
      }

      const result = await response.json();
      if (result.result) {
        setModalVisible(false);
        forceUpdate();
        Alert.alert("Succès", "Ton SkaterTag a été mis à jour !");
      } else {
        Alert.alert("Erreur", result.reason || "Échec de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur API SkaterTag:", error);
      Alert.alert("Erreur", "Impossible de changer le SkaterTag");
    }
  };

  return (
    <BackgroundWrapper>
      <TouchableOpacity onPress={handleImagePress} activeOpacity={0.6}>
        <Image
          source={{ uri: userData?.avatar ?? DEFAULT_AVATAR }}
          width={200}
          height={200}
          style={globalStyle.avatar}
        />
      </TouchableOpacity>

      <Text style={globalStyle.skaterTag}>
        {userData?.skaterTag ?? "@" + userData?.username ?? ""}
      </Text>

      <Text style={globalStyle.screenTitle}>Reglages</Text>

      <View style={styles.buttonContainer}>
        <Button
          iconName="edit"
          text="Changer SkaterTag"
          iconLeft
          onPress={() => setModalVisible(true)}
        />
        <StateButton
          iconName="dark-mode"
          activeIconName="light-mode"
          text="Mode sombre"
          activeText="Mode clair"
          //   onPress={() => console.log("Autres options")}
        />
        <Button
          iconName="settings"
          text="Option 3"
          onPress={() => console.log("Autres options")}
        />
        <Button
          iconName="settings"
          text="Option 3"
          onPress={() => console.log("Autres options")}
        />
      </View>

      {/* Modal de changement de SkaterTag */}
      <ModalContent
        visibleState={modalVisible}
        closeHandler={() => setModalVisible(false)}
        style={globalStyle.modalContainer}
      >
        <Text style={styles.modalTitle}>Nouveau SkaterTag</Text>
        <TextInput
          style={globalStyle.textInput}
          placeholder="Entre ton nouveau pseudo"
          placeholderTextColor="white"
          value={newSkaterTag}
          onChangeText={setNewSkaterTag}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            text="Annuler"
            containerStyle={{ backgroundColor: COLOR_CANCEL }}
            onPress={() => setModalVisible(false)}
          />
          <Button text="Valider" onPress={updateSkaterTag} />
        </View>
      </ModalContent>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  modalTitle: {
    ...globalStyle.subSubTitle,
    fontSize: 18,
  },
});
