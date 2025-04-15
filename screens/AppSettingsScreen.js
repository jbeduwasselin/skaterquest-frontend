import React from "react";
import { View, StyleSheet } from "react-native";
import BackgroundWrapper from "../components/background";
import IconButton from "../components/IconButton"; // Importer le composant IconButton
import Icon from "react-native-vector-icons/Feather";  // Importer l'icône Feather

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
        {/* Icône des paramètres (en dehors des boutons) */}
        <Icon
          name="settings"
          size={48}
          color="#fff"
          style={styles.settingsIcon}
          onPress={() => console.log("Settings Pressed")} // Action sur l'icône de paramètres
        />

        <View style={styles.buttonContainer}>
          {/* Boutons avec IconButton et texte */}
          <IconButton
            iconName="help-circle"  // Icône pour Aides
            onPress={handleHelpPress}  // Logique au clic
            buttonText="Aides"  // Texte à afficher dans le bouton
            style={styles.iconButton}  // Applique le style personnalisé
          />
          <IconButton
            iconName="shield"  // Icône pour Paramètres de confidentialité
            onPress={handlePrivacySettingsPress}
            buttonText="Paramètres de confidentialité"
            style={styles.iconButton}
          />
          <IconButton
            iconName="log-out"  // Icône pour Déconnexion
            onPress={handleLogout}
            buttonText="Déconnexion"
            style={styles.iconButton}
          />
          <IconButton
            iconName="user-x"  // Icône pour Désinscription
            onPress={handleUnsubscribe}
            buttonText="Désinscription"
            style={styles.iconButton}
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
  buttonContainer: {
    width: "100%",
    gap: 30,  // Espacement entre les boutons
    alignItems: "center",  // Centrer les boutons horizontalement
  },
  settingsIcon: {
    marginBottom: 30,
    marginTop: -80, // Décale l'icône vers le haut
  },
  iconButton: {
    width: "80%",  // Largeur de chaque bouton à 80% de l'écran
    marginBottom: 20,  // Marge entre les boutons
  },
});
