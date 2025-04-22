import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { addPictureToSpot } from "../lib/request";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AddPhotoScreen({ navigation, route }) {
  const isFocused = useIsFocused(); // La méthode useIsFocused() permet de ne pas afficher la caméra si l'écran n'est pas focus
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null); // Référence du composant CameraView afin de pouvoir prendre une photo

  const [photosSpot, setPhotosSpot] = useState([]); // État pour enregistrer les photos du spot prises par l'utilisateur

  const { token } = useSelector((state) => state.user.value);
  const { spotData } = route.params;

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
    console.log("New taken photo :", photo);
    photo && setPhotosSpot([...photosSpot, photo]); // Ajout de la photo dans l'état photoSpot
  };

  // Fonction pour sauver en BDD les photos prises
  const savePhotos = async () => {
    console.log("Number of photos :", photosSpot.length);
    if (photosSpot.length > 0) {
      for (const takenPhoto of photosSpot) {
        const { result, error } = await addPictureToSpot(
          token,
          takenPhoto.uri,
          spotData._id
        );
        console.log("photo URI :", takenPhoto.uri);
        console.log("result :", result, "error :", error);
      }
    }
    photosSpot.length > 0 && navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Text style={styles.title}>Prends des photos du spot !</Text>

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

          <ScrollView
            horizontal // Car vertical par défaut
            style={styles.previewScroll}
            contentContainerStyle={styles.previewContainer}
            showsHorizontalScrollIndicator={false} // Pour masquer la barre de scroll
          >
            {photosSpot.map((photo, index) => (
              // Fonctionnalité pour supprimer une photo en la touchant longtemps
              <TouchableOpacity
                key={index}
                onLongPress={() => {
                  Alert.alert(
                    "Supprimer cette photo ?",
                    "Cette action est irréversible.",
                    [
                      { text: "Annuler", style: "cancel" },
                      {
                        text: "Supprimer",
                        style: "destructive",
                        onPress: () => {
                          setPhotosSpot((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        },
                      },
                    ]
                  );
                }}
              >
                <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {photosSpot.length > 0 && (
            <Text style={styles.deleteHint}>
              Fais un appui long sur une photo pour la supprimer
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              savePhotos();
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.validateButton}>VALIDER CES PHOTOS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const { width } = Dimensions.get("window"); // Pour un affichage responsive de la caméra

const styles = StyleSheet.create({
  title: {
    color: "orange",
    fontSize: 24,
    padding: 10,
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
  validateButton: {
    backgroundColor: "orange",
    padding: 10,
  },
  previewScroll: {
    marginTop: 16,
    marginBottom: 16,
    maxHeight: 90,
  },
  previewContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  deleteHint: {
    textAlign: "center",
    fontSize: 14,
    color: "black",
    marginBottom: 10,
  },
});
