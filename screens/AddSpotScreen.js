import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useSelector } from "react-redux";
import { createSpot } from "../lib/request";
import globalStyle, { COLOR_PLACEHOLDER } from "../globalStyle";
import { Button, StateImageButton } from "../components/Buttons";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import { useErrorModal } from "../components/ErrorModal";

export default function AddSpotScreen({ navigation, route }) {
  const { token } = useSelector((state) => state.user.value); // Récupération des infos depuis le store
  const { latitude, longitude } = route.params; // Coordonnées du spot passées en paramètre de navigation

  const [spotName, setSpotName] = useState(""); // État pour enregistrer le nom donné au spot par l'utilisateur
  const [spotCategory, setSpotCategory] = useState(null); // État pour enregistrer la catégorie du spot choisie par l'utilisateur
  const [coordinate, setCoordinate] = useState({ latitude, longitude }); // État pour les coordonnées du spot
  const [setErrorModal, ErrorModal] = useErrorModal();
  function toggleSpotCategory(value) {
    spotCategory == value ? setSpotCategory(null) : setSpotCategory(value);
  }
  // Fonction pour enregistrer le spot
  const saveSpot = async () => {
    // On vérifie que les infos sont complètes
    if (!spotName) {
      setErrorModal("Veuillez renseigner le nom du spot.");
      return; // On interrompt la fonction s'il n'y a pas de nom et/ou de catégorie pour enregistrer le spot
    }
    if (!spotCategory) {
      setErrorModal("Veuillez renseigner une categorie pour le spot.");
      return; // On interrompt la fonction s'il n'y a pas de nom et/ou de catégorie pour enregistrer le spot
    }

    // On crée le spot en BDD
    const spotResponse = await createSpot(
      token,
      spotName,
      coordinate.latitude,
      coordinate.longitude,
      spotCategory
    );

    // On redirige l'utilisateur vers l'écran du spot ajouté
    if (spotResponse.result === true) {
      navigation.navigate("SpotScreen", { spotData: spotResponse.data });
    } else if (spotResponse.fallback) {
      setErrorModal(
        "Un autre spot existe déja à proximité, vous allez etre redirigé vers celui-ci."
      );
      setTimeout(() => {
        setErrorModal(null);
        navigation.navigate("SpotScreen", { spotData: spotResponse.fallback });
      }, 2_000);
    }
  };
  return (
    <BackgroundWrapper flexJustify={"center"}>
      <Text style={globalStyle.screenTitle}>Ajout d'un nouveau spot</Text>
      <TextInput
        style={globalStyle.textInput}
        placeholder="Nomme ce spot ici !"
        placeholderTextColor={COLOR_PLACEHOLDER}
        onChangeText={(value) => setSpotName(value)}
        value={spotName}
      />
      <Text style={globalStyle.subTitle}>Sélectionne le type de spot :</Text>
      <View style={styles.spotChoice}>
        <StateImageButton
          source={require("../assets/spotChoiceStreet.png")}
          activeImageStyle={{ tintColor: "blue" }}
          containerStyle={styles.spotCategory}
          imageStyle={styles.image}
          value={spotCategory == "street"}
          onPress={() => toggleSpotCategory("street")}
          text="Street"
        />

        <StateImageButton
          source={require("../assets/spotChoiceFlat.png")}
          activeImageStyle={{ tintColor: "blue" }}
          imageStyle={styles.image}
          value={spotCategory == "flat"}
          onPress={() => toggleSpotCategory("flat")}
          containerStyle={styles.spotCategory}
          text="Flat"
        />
        <StateImageButton
          source={require("../assets/spotChoicePark.png")}
          activeImageStyle={{ tintColor: "blue" }}
          containerStyle={styles.spotCategory}
          imageStyle={styles.image}
          value={spotCategory == "park"}
          onPress={() => toggleSpotCategory("park")}
          text="Park"
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          ...coordinate,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        onLongPress={(event) => setCoordinate(event.nativeEvent.coordinate)}
      >
        <Marker
          {...{ coordinate }}
          draggable
          onDragEnd={(event) => setCoordinate(event.nativeEvent.coordinate)}
        ></Marker>
      </MapView>

      <Text style={globalStyle.subTitle}>
        Coordonnées : {Math.round(coordinate.latitude * 1e4) / 1e4};{" "}
        {Math.round(coordinate.longitude * 1e4) / 1e4}
      </Text>

      <Button text="Valider" onPress={saveSpot} />

      {/* Modal pour l'affichage des erreur */}
      <ErrorModal />
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  spotChoice: {
    ...globalStyle.flexRow,
    justifyContent: "space-evenly",
    width: "95%",
  },
  spotCategory: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  map: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.4,
    margin: 5,
  },
});
