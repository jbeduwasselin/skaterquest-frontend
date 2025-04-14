import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackgroundWrapper from "../components/background";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

export default function AppSettingsScreen({ navigation }) {
  const handleHelpPress = () => {
    // Logique pour l'écran Aides
    console.log("Aides Pressed");
  };

  const handlePrivacySettingsPress = () => {
    // Logique pour les paramètres de confidentialité
    console.log("Paramètres de confidentialité Pressed");
  };

  const handleLogout = () => {
    // Logique pour la déconnexion
    console.log("Déconnexion Pressed");
  };

  const handleUnsubscribe = () => {
    // Logique pour la désinscription
    console.log("Désinscription Pressed");
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
      <Icon name="settings" size={48} color="#fff" style={styles.settingsIcon} />

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#FFC1C6", "#FF650C"]} // couleur 1 -> couleur 2
            style={styles.gradientButton}
          >
            <TouchableOpacity style={styles.buttonContent} onPress={handleHelpPress}>
              <Text style={styles.buttonText}>Aides</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#FFC1C6", "#FF650C"]}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={handlePrivacySettingsPress}
            >
              <Text style={styles.buttonText}>Paramètres de confidentialité</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#FFC1C6", "#FF650C"]}
            style={styles.gradientButton}
          >
            <TouchableOpacity style={styles.buttonContent} onPress={handleLogout}>
              <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#FFC1C6", "#FF650C"]}
            style={styles.gradientButton}
          >
            <TouchableOpacity style={styles.buttonContent} onPress={handleUnsubscribe}>
              <Text style={styles.buttonText}>Désinscription</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({

  settingsIcon: {
    marginBottom: 30,
    marginTop: -80, //  Décale l'icône vers le haut
  },
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    gap: 100, // Ajout de gap entre les boutons
    alignItems: "center", // Centrer les boutons horizontalement
  },
  gradientButton: {
    borderRadius: 5,
    width: "80%", // Largeur des boutons ajustée à 80% de l'écran
  },
  buttonContent: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});