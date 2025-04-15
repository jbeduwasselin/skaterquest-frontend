import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import BackgroundWrapper from "../components/background";
import IconButton from "../components/IconButton"; // Importation de IconButton

export default function HomeScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Container pour les icônes et la photo de profil */}
        <View style={styles.headerContainer}>
          {/* Icône des paramètres en haut à gauche */}
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => navigation.navigate("AppSettingsScreen")}
          >
            <Icon name="settings" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Icône du crayon en haut à droite */}
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Image de profil */}
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../assets/Thomas surf.jpg") // Photo de profil par défaut
          }
          style={styles.profileImage}
        />

        <View style={styles.buttonContainer}>
          {/* Utilisation de IconButton pour les boutons */}
          <View style={styles.alignLeft}>
            <IconButton
              iconName="book"
              buttonText="Livre de tricks"
              onPress={() => navigation.navigate("TricksScreen")}
              style={styles.iconButton}
            />
          </View>

          <View style={styles.alignRight}>
            <IconButton
              iconName="video"
              buttonText="Mes vidéos"
              onPress={() => navigation.navigate("VideoScreen")}
              style={styles.iconButton}
            />
          </View>

          <View style={styles.alignLeft}>
            <IconButton
              iconName="users"
              buttonText="Mon équipe"
              onPress={() => navigation.navigate("CrewScreen")}
              style={styles.iconButton}
            />
          </View>
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
    position: "absolute",
    top: 50,
    left: 20,
    width: "100%", // Pour que le container prenne toute la largeur de l'écran
    flexDirection: "row", // Aligner les éléments en ligne
    alignItems: "center", // Centrer verticalement les éléments
    justifyContent: "flex-start", // Aligné à gauche
    zIndex: 1,
  },
  settingsIcon: {
    marginLeft: 20, // Espacement entre l'icône des paramètres et le bord gauche
  },
  editIcon: {
    position: "absolute", // Positionnement absolu par rapport au parent
    top: 50, // Positionné en haut de l'écran
    right: 20, // Positionné à droite de l'écran
    zIndex: 2, // Ajout d'un zIndex plus élevé pour que l'icône soit au-dessus des autres éléments
  },
  profileImage: {
    width: 120, // Taille de l'image de profil
    height: 120,
    borderRadius: 60, // Circulaire
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: -10, // Augmentez cette valeur pour faire monter la photo
    zIndex: 0,
    marginLeft: -170,
    marginBottom: 80, // S'assurer que l'image est derrière les icônes
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    gap: 30, // Ajout de gap pour espacer les boutons
    marginTop: 20,
  },
  alignLeft: {
    alignItems: "flex-start",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  iconButton: {
    width: 160,
    marginBottom: 20,
  },
});
