import React, { useEffect, useState /*, useRef*/ } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateSpot } from "../reducers/spot";
import { createSpot } from "../lib/request";

export default function AddSpotScreen({ navigation }) {
  const dispatch = useDispatch();

  // Récupération des infos depuis le store
  const spotLat = useSelector((state) => state.spot.value.latitude);
  const spotLon = useSelector((state) => state.spot.value.longitude);
  const { token } = useSelector((state) => state.user.value);

  const [spotName, setSpotName] = useState(""); // État pour enregistrer le nom donné au spot par l'utilisateur
  const [spotCategory, setSpotCategory] = useState(""); // État pour enregistrer la catégorie du spot choisie par l'utilisateur

  // Fonction pour enregistrer le spot
  const saveSpot = async () => {
    // On vérifie que les infos sont complètes
    if (!spotName || !spotCategory) {
      // faudrait afficher un message d'erreur ou entourer en rouge le champ manquant
      return; // On interrompt la fonction s'il n'y a pas de nom et/ou de catégorie pour enregistrer le spot
    }

    // On crée le spot en BDD
    const spotResponse = await createSpot(
      token,
      spotName,
      spotLat,
      spotLon,
      spotCategory
    );
    console.log("spotResponse :", spotResponse);

    // On enregistre les infos du spot dans le store // EDIT : utile ??
    dispatch(updateSpot(spotResponse));

    // On redirige l'utilisateur vers l'écran du spot ajouté
    if (spotResponse.result === true) {
      navigation.navigate("SpotScreen", { spotData: spotResponse.data });
    } else {
      spotResponse.fallback &&
        navigation.navigate("SpotScreen", { spotData: spotResponse.fallback });
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Ajout d'un nouveau spot</Text>

        <TextInput
          style={styles.inputContainer}
          placeholder="Nomme ce spot ici !"
          onChangeText={(value) => setSpotName(value)}
          value={spotName}
        />

        <View style={styles.spotChoiceContainer}>
          <Text style={styles.title}>Sélectionne le type de spot :</Text>

          <View style={styles.spotChoiceImagesContainer}>
            <TouchableOpacity
              style={styles.spotChoice}
              onPress={() => setSpotCategory("street")}
            >
              <Image
                source={require("../assets/spotChoiceStreet.png")}
                style={styles.image}
              />
              <Text style={styles.text}>Street</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.spotChoice}
              onPress={() => setSpotCategory("flat")}
            >
              <Image
                source={require("../assets/spotChoiceFlat.png")}
                style={styles.image}
              />
              <Text style={styles.text}>Flat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.spotChoice}
              onPress={() => setSpotCategory("park")}
            >
              <Image
                source={require("../assets/spotChoicePark.png")}
                style={styles.image}
              />
              <Text style={styles.text}>Park</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => {
            saveSpot();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.validateButton}>Je valide ce spot !</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(updateSpot(null)); // On supprime les infos stockées dans l'état spot du store
            navigation.navigate("TabNavigator", {
              screen: "MapScreen",
            }); // Cette structure sert à naviguer en tab navigation sans menu
          }}
          activeOpacity={0.8}
        >
          <MaterialIcons
            style={styles.returnButton}
            name="keyboard-return"
            size={36}
            color="orange"
          />
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "93%",
  },
  mainTitle: {
    color: "orange",
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 75,
  },
  inputContainer: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "orange",
    marginVertical: 4,
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  spotChoiceContainer: {
    alignItems: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 6,
  },
  spotChoiceImagesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: "orange",
    fontSize: 24,
    padding: 10,
  },
  spotChoice: {
    alignItems: "center",
    padding: 5,
    marginLeft: 6,
    marginRight: 6,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  validateButton: {
    color: "orange",
    backgroundColor: "black",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderColor: "orange",
    borderWidth: 2,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
  },
  returnButton: {
    padding: 8,
    marginRight: 10,
  },
});
