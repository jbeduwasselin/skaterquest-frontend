import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import BackgroundWrapper from "../components/background";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Container pour les icônes et la photo de profil */}
        <View style={styles.headerContainer}>
          {/* Container pour les icônes alignées */}
          <View style={styles.iconsContainer}>
            {/* Icône des paramètres en haut à gauche */}
            <TouchableOpacity
              style={styles.settingsIcon}
              onPress={() => navigation.navigate("AppSettingsScreen")}
            >
              <Icon name="settings" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Icône du crayon en haut à droite */}
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation.navigate("SettingsScreen")}
            >
              <Icon name="edit" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

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
          <View style={styles.alignLeft}>
            <LinearGradient
              colors={["#FFC1C6", "#FF650C"]}
              style={styles.gradientButton}
            >
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => navigation.navigate("TricksScreen")}
              >
                <Text style={styles.buttonText}>Livre de tricks</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.alignRight}>
            <LinearGradient
              colors={["#FFC1C6", "#FF650C"]}
              style={styles.gradientButton}
            >
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => navigation.navigate("VideoScreen")}
              >
                <Text style={styles.buttonText}>Mes vidéos</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.alignLeft}>
            <LinearGradient
              colors={["#FFC1C6", "#FF650C"]}
              style={styles.gradientButton}
            >
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => navigation.navigate("CrewScreen")}
              >
                <Text style={styles.buttonText}>Mon équipe</Text>
              </TouchableOpacity>
            </LinearGradient>
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
    justifyContent: "space-between", // Espacement égal entre les icônes et la photo
    zIndex: 1,
  },
  iconsContainer: {
    flexDirection: "row", // Alignement horizontal des icônes
    width: "100%",
    justifyContent: "space-between", // Espacement égal entre les icônes
  },
  settingsIcon: {
    marginLeft: 20, // Espacement entre l'icône des paramètres et le bord gauche
  },
  editIcon: {
    marginRight: 20, // Espacement entre l'icône du crayon et le bord droit
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
    gap: 100,
    marginTop: 20,
  },
  alignLeft: {
    alignItems: "flex-start",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  gradientButton: {
    borderRadius: 5,
    width: 160,
  },
  buttonContent: {
    paddingVertical: 18,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
