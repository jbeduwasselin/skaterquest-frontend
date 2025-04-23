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
  Modal,
  Pressable,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import * as ImagePicker from "expo-image-picker";
import { IconTextButton } from "../components/Buttons";
import globalStyle, { DEFAULT_AVATAR } from "../globalStyle";
import { changeUserAvatar, getOwnUserInfo } from "../lib/request";
import { useIsFocused } from "@react-navigation/native";

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
  }, [isFocused, updateWatcher]);

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
      <View style={styles.container}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={userData?.avatar ? { uri: userData.avatar } : DEFAULT_AVATAR}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* Affichage du SkaterTag ou du nom d'utilisateur */}
        {userData?.skaterTag ? (
          <View style={styles.skaterTagContainer}>
            <Text style={styles.skaterTag}>@{userData.skaterTag}</Text>
          </View>
        ) : (
          <View style={styles.skaterTagContainer}>
            <Text style={styles.skaterTag}>
              @{userData?.username || "Skater anonyme"}
            </Text>
          </View>
        )}

        <Text style={globalStyle.screenTitle}>Reglages</Text>

        <View style={styles.buttonContainer}>
          <IconTextButton
            iconName="edit"
            text="Changer SkaterTag"
            iconLeft
            onPress={() => setModalVisible(true)}
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

      {/* Modal de changement de SkaterTag */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nouveau SkaterTag</Text>
            <TextInput
              style={[styles.input, { marginVertical: 15 }]}
              placeholder="Entre ton nouveau pseudo"
              placeholderTextColor="#aaa"
              value={newSkaterTag}
              onChangeText={setNewSkaterTag}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: "#6c757d" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: "#dc3545" }]}
                onPress={updateSkaterTag}
              >
                <Text style={styles.closeButtonText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },
  skaterTagContainer: {
    backgroundColor: "#2b2b2b",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  skaterTag: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    gap: 40
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

