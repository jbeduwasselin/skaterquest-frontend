import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
  const { token } = useSelector((state) => state.user.value);
  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, []);

  // Hook d'effet pour vérifier la permission de localisation au montage du screen
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

    // Récupération des spots en BDD
    //getNearestSpot(token, location.longitude, location.latitude); // mis en commentaire car cause problème (longitude === null)
  }, []);


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
    width: "100%",
    height: "80%",
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
