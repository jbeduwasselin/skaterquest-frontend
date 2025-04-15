import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

// Définition des props directement dans la fonction du composant
const IconButton = ({
  iconName, // Nom de l'icône
  onPress, // Fonction appelée au clic
  iconColor = "#fff", // Par défaut, la couleur de l'icône est blanche
  iconSize = 48, // Par défaut, la taille de l'icône est 48px
  buttonText, // Texte à afficher dans le bouton
  style, // Style personnalisé du bouton
}) => {
  return (
    <LinearGradient
      colors={["#FFC1C6", "#FF650C"]} // Dégradé du bouton
      style={[styles.gradientButton, style]} // Applique le style personnalisé
    >
      <TouchableOpacity style={styles.buttonContent} onPress={onPress}>
        <View style={styles.iconContainer}>
          {/* Affichage de l'icône */}
          <Icon name={iconName} size={iconSize} color={iconColor} />
          {/* Affichage du texte si 'buttonText' est passé */}
          {buttonText && <Text style={styles.buttonText}>{buttonText}</Text>}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    borderRadius: 5,
    width: "80%", // Largeur des boutons ajustée à 80% de l'écran
    padding: 15, // Espacement interne
    justifyContent: "center", // Centrer le contenu
    alignItems: "center", // Centrer l'icône
  },
  buttonContent: {
    justifyContent: "center", // Centrer l'icône et le texte dans le bouton
    alignItems: "center", // Centrer l'icône et le texte dans le bouton
    flexDirection: "row", // Placer l'icône et le texte en ligne (horizontalement)
  },
  iconContainer: {
    flexDirection: "row", // Centrer l'icône et le texte horizontalement
    alignItems: "center", // Centrer verticalement l'icône et le texte
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10, // Espacement entre l'icône et le texte
  },
});

export default IconButton;
