import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { getNearestSpot } from "../lib/request";
import { useIsFocused } from "@react-navigation/native";
import globalStyle from "../globalStyle";
import { IconTextButton, TextButton } from "../components/Buttons";
import ModalContent from "../components/ModalContent";

//Cette implementation de la formule d'haversine approxime
//les fonctions atan2 et sin pour des petites distances
function lightHaversine(
  { latitude: lat1, longitude: lon1 },
  { latitude: lat2, longitude: lon2 }
) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = φ2 - φ1;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  // Mean latitude for cosine term
  const φm = (φ1 + φ2) / 2;
  // Taylor series expansion terms
  const x = Δλ * Math.cos(φm);
  const y = Δφ;
  const d = Math.sqrt(x * x + y * y);
  // Third-order correction terms
  const k1 = (3 * x * x * y - y * y * y) / (6 * R * R);
  const k2 = (3 * y * y * x - x * x * x) / (6 * R * R);

  return R * d * (1 + (k1 + k2));
}

export default function MapScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [userLocation, setUserLocation] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);
  const [errorModal, setErrorModal] = useState(null);
  const [visibleSpots, setVisibleSpots] = useState(null);
  const { token } = useSelector((state) => state.user.value);

  // Vérification de la permission de localisation
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorModal("Permission de localisation refusée");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
    setMapLocation(location.coords);
  };
  useEffect(() => {
    getLocation();
  }, []);

  // Hook d'effet pour l'affichage des spots proches (pas à l'initialisation du composant car il faut un petit temps pour récupérer les infos de location)
  useEffect(() => {
    // Récupération des spots en BDD
    if (mapLocation) {
      getNearestSpot(token, mapLocation.longitude, mapLocation.latitude).then(
        ({ result, data }) => {
          result && setVisibleSpots(data);
        }
      );
    }
  }, [mapLocation, isFocused]); // Re-render du composant quand location a eu le temps de "charger"

  const addSpot = () => {
    navigation.navigate("AddSpotScreen", userLocation); // Plutôt passer les infos du spot via ce navigate au lieu de passer par le store
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
  if (!userLocation) {
    return (
      <BackgroundWrapper flexJustify="center">
        <ActivityIndicator color="black" size={50} />
        <Text style={globalStyle.subTitle}>Chargement de la carte...</Text>
        <Text>Veuillez activer la localisation. </Text>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={globalStyle.screenTitle}>
          Ride sur les meilleurs spots !
        </Text>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onLongPress={(event) =>
            navigation.navigate("AddSpotScreen", event.nativeEvent.coordinate)
          }
          onRegionChange={(region) => {
            if (lightHaversine(region, mapLocation) > 1000) {
              setMapLocation(region);
            }
          }}
        >
          {marker}
        </MapView>

        <IconTextButton
          iconName="add-location"
          size={50}
          text="Ajouter un spot."
          onPress={addSpot}
        />
      </View>

      {/* Modal pour l'affichage des erreur */}
      <ModalContent
        visibleState={errorModal}
        containerStyle={globalStyle.errorModal}
        closeHandler={() => setErrorModal(null)}
      >
        <Text style={globalStyle.errorText}>{errorModal}</Text>
        <TextButton
          onPress={() => setErrorModal(null)}
          text="OK"
          containerStyle={globalStyle.errorButton}
        />
      </ModalContent>
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
    marginBottom: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
