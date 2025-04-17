import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import BackgroundWrapper from "../components/background";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateSpot } from "../reducers/spot";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

export default function AddSpotScreen({ navigation }) {
  const dispatch = useDispatch();

  const isFocused = useIsFocused(); // La méthode useIsFocused() permet de ne pas afficher la caméra si l'écran n'est pas focus
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null); // Référence du composant CameraView afin de pouvoir prendre une photo

  const user = useSelector((state) => state.user.value); // On récupère depuis le store les infos de l'utilisateur

  const [spotName, setSpotName] = useState(""); // État pour enregistrer le nom donné au spot par l'utilisateur
  const [spotCategory, setSpotCategory] = useState(""); // État pour enregistrer la catégorie du spot choisie par l'utilisateur

  // Hook d'effet pour vérifier la permission de la caméra
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  // Fonction pour prendre une photo
  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    photo && console.log("Taken photo :", photo);
  };

  // Fonction pour enregistrer le spot
  const saveSpot = () => {
    // Lancer la route qui enregistre le spot, en vérifiant que spotCategory n'est pas vide et que la photo a été prise.
    // Envoyer les infos de localisation enregistrées dans le store depuis MapScreen, ainsi que les infos de spotCategory et la photo

    //createSpot(user.token, { spotName, /*lon, lat,*/ spotCategory }); //et le creator ??

    navigation.navigate("SpotScreen");
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

        <View style={styles.cameraContainer}>
          <Text style={styles.title}>Prends une photo du spot !</Text>

          {!hasPermission || !isFocused ? (
            <View>
              <Text>
                Pour prendre une photo de ce spot, tu dois autoriser l'appli à
                accéder à ton appareil !
              </Text>
            </View>
          ) : (
            <CameraView
              style={styles.camera}
              ref={(ref) => (cameraRef.current = ref)}
            ></CameraView>
          )}

          <TouchableOpacity
            onPress={() => {
              takePicture();
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <MaterialIcons
              style={styles.photoButton}
              name="motion-photos-on" // Autre possibilité : "camera-alt"
              size={48}
              color="white"
            />
          </TouchableOpacity>
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

const { width } = Dimensions.get("window"); // Pour un affichage responsive de la caméra

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
  inputContainer:{
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
  cameraContainer: {
    alignItems: "center",
  },
  camera: {
    width: (width - 110) * 1.33, // Format 3:4
    height: width - 110,
    borderRadius: 10,
    overflow: "hidden",
  },
  photoButton: {
    padding: 8,
    marginBottom: 10,
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
