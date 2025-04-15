import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import BackgroundWrapper from "../components/background";
import * as ImagePicker from "expo-image-picker";
import IconButton from "../components/IconButton"; // ✅ Import de IconButton

export default function SettingsScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);

  const pickImageFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.uri);
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
              profileImage
                ? { uri: profileImage }
                : require("../assets/Thomas surf.jpg")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Settings bro !</Text>

        <View style={styles.buttonContainer}>
          {/* ✅ Remplacé par IconButton */}
          <IconButton
            iconName="edit"
            buttonText="Changer SkaterTag"
            onPress={() => console.log("Changer SkaterTag")}
          />
          <IconButton
            iconName="settings"
            buttonText="Autres options qu'on oublie"
            onPress={() => console.log("Autres options")}
          />
          <IconButton
            iconName="users"
            buttonText="Equipes"
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
