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
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

export default function SettingsScreen({ navigation }) {
  // État local pour gérer l'image de profil
  const [profileImage, setProfileImage] = useState(null);

  // Fonction qui permet de sélectionner une image depuis la galerie
  const pickImageFromLibrary = async () => {
    try {
      // Lance la bibliothèque d'images avec des options
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true, // Permet de modifier l'image après sélection
        aspect: [1, 1], // Garde l'image sous forme carrée
        quality: 1, // Qualité maximale de l'image
      });

      // Si l'utilisateur a choisi une image (et n'a pas annulé)
      if (!result.canceled) {
        setProfileImage(result.uri); // Mise à jour de l'image de profil avec l'URI de l'image choisie
      }
    } catch (error) {
      // Gestion des erreurs si une exception se produit
      console.error("Erreur lors de la sélection de l'image:", error);
    }
  };

  // Fonction qui affiche une alerte pour permettre à l'utilisateur de choisir entre la galerie ou annuler
  const handleImagePress = () => {
    Alert.alert("Changer la photo de profil", "Choisis une option :", [
      { text: "Galerie", onPress: pickImageFromLibrary }, // Ouvre la galerie pour choisir une photo
      { text: "Annuler", style: "cancel" }, // Annule l'opération
    ]);
  };



  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Bouton pour changer la photo de profil en appuyant dessus */}
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={
              profileImage
                ? { uri: profileImage } // Si l'image de profil est définie, l'afficher
                : require("../assets/Thomas surf.jpg") // Image par défaut si aucune photo n'est choisie
            }
            style={styles.profileImage} // Applique le style de l'image de profil
          />
        </TouchableOpacity>

        {/* Titre de l'écran */}
        <Text style={styles.title}>Settings bro !</Text>

        <View style={styles.buttonContainer}>
          {/* Liste de boutons avec des gradients */}
          {["Changer SkaterTag", "Autres options qu'on oublie", "Equipes"].map((text, index) => (
            <LinearGradient key={index} colors={["#FFC1C6", "#FF650C"]} style={styles.gradientButton}>
              <TouchableOpacity style={styles.buttonContent} onPress={() => console.log(text)}>
                <Text style={styles.buttonText}>{text}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Prend toute la hauteur disponible
    alignItems: "center", // Centre les éléments horizontalement
    padding: 20, // Ajoute du padding autour du contenu
    paddingTop: 60, // Décale le contenu du haut de l'écran
  },
  title: {
    fontSize: 24, // Taille du texte du titre
    fontWeight: "bold", // Met le titre en gras
    color: "#fff", // Couleur du texte
    marginTop: 10, // Ajoute un espace au-dessus du titre
  },
  profileImage: {
    width: 250, // Largeur de l'image (aggrandie)
    height: 250, // Hauteur de l'image (aggrandie)
    borderRadius: 125, // Rendre l'image circulaire (moitié de la largeur/hauteur)
    marginBottom: 20, // Espace en dessous de l'image
    borderWidth: 2, // Épaisseur du bord
    borderColor: "#fff", // Couleur du bord
  },
  buttonContainer: {
    width: "100%", // Les boutons occupent toute la largeur
    marginTop: 20, // Espace au-dessus des boutons
    gap: 100, // Espacement entre les boutons
    alignItems: "center", // Centre les boutons horizontalement
  },
  gradientButton: {
    borderRadius: 5, // Arrondir les coins des boutons
    width: "80%", // Largeur des boutons
  },
  buttonContent: {
    padding: 15, // Espace interne du bouton
    borderRadius: 5, // Arrondi des coins du bouton
    alignItems: "center", // Centre le texte à l'intérieur du bouton
  },
  buttonText: {
    color: "white", // Couleur du texte des boutons
    fontSize: 18, // Taille du texte
    fontWeight: "bold", // Texte en gras
  },
});