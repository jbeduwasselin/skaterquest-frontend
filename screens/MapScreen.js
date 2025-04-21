import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import BackgroundWrapper from "../components/background";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import IconButton from "../components/IconButton"; // ✅ Import du bouton personnalisé
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateSpot } from "../reducers/spot";
import { getOwnUserInfo, getNearestSpot } from "../lib/request";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserData] = useState(null);
  const [visibleSpots, setVisibleSpots] = useState(null);
  const { token } = useSelector((state) => state.user.value);

  let nearSpotsMarkers = [];

  useEffect(() => {
    // Récupération du token
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });

    // Vérification de la permission de localisation
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission de localisation refusée");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };

    getLocation();
  }, []);

  // Hook d'effet pour l'affichage des spots proches (pas à l'initialisation du composant car il faut un petit temps pour récupérer les infos de location)
  useEffect(() => {
    console.log("location :", location);

    // Récupération des spots en BDD
    if (location) {
      getNearestSpot(token, location.longitude, location.latitude).then(
        ({ result, data }) => {
          result && setVisibleSpots(data);
        }
      );
    }

    // Affichage des spots
    if (visibleSpots) {
      nearSpotsMarkers = visibleSpots.map((data, i) => {
        return (
          <Marker
            key={i}
            coordinate={{ latitude: data.latitude, longitude: data.longitude }}
            title={data.name}
          />
        );
      });
    }
  }, [location]); // Re-render du composant quand location a eu le temps de "charger"

  let text = "Chargement de la carte...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Position obtenue!";
  }

  const addSpot = () => {
    console.log("Infos position :", location);
    dispatch(updateSpot(location)); // Enregistrement des coordonnées actuelles dans le store
    navigation.navigate("AddSpotScreen");
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Ride sur les meilleurs spots !</Text>

        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Vous êtes ici"
            />
            <TouchableOpacity
              onPress={() => {
                console.log("Infos position :", location);
                dispatch(updateSpot(/* mettre le spot clické dans l'état */));
                navigation.navigate("SpotScreen");
              }}
              activeOpacity={0.8}
            >
              {nearSpotsMarkers}
            </TouchableOpacity>
          </MapView>
        ) : (
          <Text style={styles.mapText}>{text}</Text>
        )}

        <TouchableOpacity
          onPress={() => {
            addSpot();
          }}
          style={styles.buttonContainer}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add-location" size={50} color="orange" />
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  map: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.6,
    marginBottom: 0,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  mapText: {
    color: "orange",
  },
});
