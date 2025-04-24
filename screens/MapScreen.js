import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { getNearestSpot } from "../lib/request";
import { useIsFocused } from "@react-navigation/native";
import globalStyle from "../globalStyle";
import { Button } from "../components/Buttons";
import ModalContent from "../components/ModalContent";
import { lightHaversine } from "../lib/utils";

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
        <Text>Si la carte ne charge pas, vérifie que tu as bien activé la localisation !</Text>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper flexJustify="space-evenly">
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

      <Button
        iconName="add-location"
        size={50}
        text="Ajouter un spot."
        onPress={addSpot}
      />

      {/* Modal pour l'affichage des erreur */}
      <ModalContent
        visibleState={errorModal}
        containerStyle={globalStyle.errorModal}
        closeHandler={() => setErrorModal(null)}
      >
        <Text style={globalStyle.errorText}>{errorModal}</Text>
        <Button
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
