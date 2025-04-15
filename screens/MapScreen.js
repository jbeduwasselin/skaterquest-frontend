import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BackgroundWrapper from "../components/background";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import IconButton from "../components/IconButton"; // ✅ Import du bouton personnalisé

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
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

  let text = "Chargement de la carte...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Position obtenue!";
  }

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
          </MapView>
        ) : (
          <Text>{text}</Text>
        )}

        {/* ✅ Bouton remplacé par IconButton */}
        <View style={styles.buttonContainer}>
          <IconButton
            iconName="plus"
            buttonText="Ajouter un spot"
            onPress={() => navigation.navigate("AddSpotScreen")}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  map: {
    width: "100%",
    height: 500,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
