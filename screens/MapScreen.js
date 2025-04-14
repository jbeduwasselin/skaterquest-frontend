import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackgroundWrapper from "../components/background"; // Composant d'arrière-plan personnalisé
import MapView, { Marker } from "react-native-maps"; // Importation du composant carte et du marqueur
import * as Location from "expo-location"; // Importation de la librairie Expo pour la géolocalisation
import { LinearGradient } from "expo-linear-gradient"; // Importation du composant LinearGradient pour dégradé de couleurs

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null); // État pour stocker les coordonnées géographiques de l'utilisateur
  const [errorMsg, setErrorMsg] = useState(null); // État pour stocker les messages d'erreur, si la permission ou la géolocalisation échouent

  // useEffect pour obtenir la géolocalisation lorsque le composant est monté
  useEffect(() => {
    // Fonction pour obtenir la position actuelle de l'utilisateur
    const getLocation = async () => {
      // Demande la permission de localisation à l'utilisateur
      let { status } = await Location.requestForegroundPermissionsAsync();
      // Si la permission est refusée, afficher un message d'erreur
      if (status !== "granted") {
        setErrorMsg("Permission de localisation refusée");
        return;
      }

      // Si la permission est accordée, obtenir la position actuelle
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords); // Mettre à jour l'état avec les coordonnées de l'utilisateur
    };

    getLocation(); // Appeler la fonction pour récupérer la géolocalisation
  }, []); // [] signifie que useEffect ne sera exécuté qu'une seule fois lors du montage du composant

  // Message à afficher selon l'état de la géolocalisation
  let text = "Chargement de la carte...";
  if (errorMsg) {
    text = errorMsg; // Si une erreur survient, afficher le message d'erreur
  } else if (location) {
    text = "Position obtenue!"; // Si la localisation est disponible, afficher que la position a été obtenue
  }

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Ride sur les meilleurs spots !</Text>

        {/* Affichage de la carte si la localisation est disponible */}
        {location ? (
          <MapView
            style={styles.map} // Style de la carte
            initialRegion={{
              latitude: location.latitude, // Latitude de la position de l'utilisateur
              longitude: location.longitude, // Longitude de la position de l'utilisateur
              latitudeDelta: 0.0922, // Zoom de la carte (delta en latitude)
              longitudeDelta: 0.0421, // Zoom de la carte (delta en longitude)
            }}
            showsUserLocation={true} // Affiche la position actuelle de l'utilisateur
            showsMyLocationButton={true} // Affiche un bouton pour recentrer la carte sur la localisation de l'utilisateur
          >
            {/* Marqueur sur la carte à la position de l'utilisateur */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Vous êtes ici" // Titre du marqueur
            />
          </MapView>
        ) : (
          <Text>{text}</Text> // Afficher un message en attendant la localisation
        )}

        {/* Conteneur pour le bouton d'ajout de spot */}
        <View style={styles.buttonContainer}>
          {/* Bouton avec dégradé de couleurs */}
          <LinearGradient
            colors={["#FFC1C6", "#FF650C"]} // Dégradé de couleurs du bouton
            style={styles.gradientButton} // Application du style du bouton dégradé
          >
            <TouchableOpacity
              style={styles.buttonContent} // Style du bouton à l'intérieur du dégradé
              onPress={() => navigation.navigate("AddSpotScreen")} // Action à réaliser lorsqu'on appuie sur le bouton : rediriger vers "AddSpotScreen"
            >
              <Text style={styles.buttonText}>Ajouter un spot</Text> {/* Texte du bouton */}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

// Styles pour les différents éléments de la page
const styles = StyleSheet.create({
  container: {
    flex: 1, // Utilise tout l'espace disponible
    justifyContent: "center", // Centre les éléments verticalement
    alignItems: "center", // Centre les éléments horizontalement
    padding: 20, // Ajoute de l'espace autour du contenu
  },
  title: {
    fontSize: 24, // Taille du texte du titre
    fontWeight: "bold", // Gras pour le titre
    marginBottom: 12, // Espace sous le titre
    color: "#fff", // Couleur du texte en blanc
  },
  map: {
    width: "100%", // La carte prend toute la largeur de l'écran
    height: 500, // La carte a une hauteur de 500 unités
    marginBottom: 20, // Espace sous la carte
  },
  buttonContainer: {
    width: "100%", // Conteneur du bouton prend toute la largeur de l'écran
    justifyContent: "center", // Centre le contenu du conteneur
    alignItems: "center", // Centre horizontalement les éléments dans le conteneur
    marginTop: 20, // Ajoute de l'espace au-dessus du bouton
  },
  gradientButton: {
    borderRadius: 5, // Coins arrondis pour le bouton
    width: "80%", // Le bouton occupe 80% de la largeur de l'écran
  },
  buttonContent: {
    padding: 15, // Espacement intérieur du bouton
    borderRadius: 5, // Coins arrondis du bouton
    alignItems: "center", // Centre le texte à l'intérieur du bouton
  },
  buttonText: {
    color: "white", // Texte du bouton en blanc
    fontSize: 18, // Taille du texte
    fontWeight: "bold", // Texte en gras
  },
});
