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
import IconButton from "../components/IconButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateSpot } from "../reducers/spot";
import { getOwnUserInfo, getNearestSpot } from "../lib/request";
import { useIsFocused } from "@react-navigation/native";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserData] = useState(null);
  const [visibleSpots, setVisibleSpots] = useState(null);
  const { token } = useSelector((state) => state.user.value);

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
    // Récupération des spots en BDD
    if (location) {
      getNearestSpot(token, location.longitude, location.latitude).then(
        ({ result, data }) => {
          result && setVisibleSpots(data);
        }
      );
    }
  }, [location, isFocused]); // Re-render du composant quand location a eu le temps de "charger"

  let text = "Chargement de la carte...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Position obtenue!";
  }

  const addSpot = () => {
    dispatch(updateSpot(location)); // Enregistrement des coordonnées actuelles dans le store
    navigation.navigate("AddSpotScreen"); // Plutôt passer les infos du spot via ce navigate au lieu de passer par le store
  };

  const marker = visibleSpots?.map((spotData, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          longitude: spotData.location?.coordinates[0],
          latitude: spotData.location?.coordinates[1],
        }}
        title={spotData.name}
        onPress={() => navigation.navigate("SpotScreen", { spotData })}
      />
    );
  });
  console.log(location);
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
            {marker}
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
