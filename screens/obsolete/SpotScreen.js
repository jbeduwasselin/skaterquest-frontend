import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import BackgroundWrapper from "../components/background";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOwnUserInfo } from "../lib/request";
import { useSelector } from "react-redux";

// Tableau temporaire pour tester
const images = [
  require("../assets/Thomas surf.jpg"),
  require("../assets/Lennie Skate.jpeg"),
  require("../assets/spotChoicePark.png"),
];

// Variable screenWidth pour gérer le responsive (dimensions des photos et vidéos calculées à partir de celles de l'écran)
const { width: screenWidth } = Dimensions.get("window");

// Variables pour gérer les dimensions des photos (en responsive grâce à screenWidth)
const PHOTO_WIDTH = screenWidth * 0.7; // 70% de la largeur de l'écran
const PHOTO_HEIGHT = PHOTO_WIDTH * 0.75; // Format 3:4
const PHOTO_SPACING = 6; // Espacement horizontal entre les photos

// Variables pour gérer les dimensions des vidéos (en responsive grâce à screenWidth)
const VIDEO_WIDTH = screenWidth * 0.5; // 50% de la largeur de l'écran
const VIDEO_HEIGHT = PHOTO_WIDTH * 0.75;
const VIDEO_SPACING = 6;

export default function SpotScreen({ navigation, route }) {
  const { token } = useSelector((state) => state.user);
  const { data } = route.params;
  console.log(data);
  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, []);

  // On déclare un scrollX par gallerie à afficher. scrollX crée une valeur animée qui suit la position du scroll (X car horizontal)
  const scrollXPhotos = useRef(new Animated.Value(0)).current; // Pour le carrousel des photos
  const scrollXWeek = useRef(new Animated.Value(0)).current; // Pour le carrousel des vidéos postées cette semaine
  const scrollXAllTime = useRef(new Animated.Value(0)).current; // Pour le carrousel des vidéos postées depuis la création du spot

  const [videos, setVideos] = React.useState([]); // Pour stocker les vidéos prises

  // Fonction pour rendre une galerie sous forme de carrousel
  const renderCarrousel = (
    data,
    scrollX,
    itemWidth,
    itemHeight,
    spacing,
    style
  ) => (
    <Animated.FlatList // FlatList sert pour l'affichage des images en défilement et Animated pour la dynamisation
      data={data} // Mettre ici les images (photos ou vidéos) voulues
      keyExtractor={(_, index) => index.toString()} // Pour identifier quelle image est au centre ou non et gérer son affichage en fonction
      horizontal // Scroll horizontal (par défaut FlatList est en scroll vertical)
      showsHorizontalScrollIndicator={false} // Cache la barre de scroll horizontale
      contentContainerStyle={{
        paddingHorizontal: (screenWidth - itemWidth) / 2, // Centre les premières/dernières images dans l'écran
        paddingVertical: 10, // Ajoute un peu d'espace vertical pour éviter que le zoom coupe l'image du milieu
      }}
      snapToInterval={itemWidth + spacing} // Fluidifie le défilement en snappant automatiquement chaque image quand on scrolle
      decelerationRate="fast" // Rend le scroll plus "snappy" (rapide) à s’arrêter
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }], // Lie le scroll horizontal à scrollX pour pouvoir animer en fonction de la position
        { useNativeDriver: true } // Rend l’animation exécutable directement par le moteur natif du téléphone (donc + fluide, + rapide et ne bloque pas le reste de l’UI)
      )}
      // Fonction renderItem() pour afficher les éléments (items) de la FlatList
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * (itemWidth + spacing),
          index * (itemWidth + spacing),
          (index + 1) * (itemWidth + spacing),
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1, 0.7],
          extrapolate: "clamp",
        });

        return (
          <View style={[style.container]}>
            <Animated.View style={{ transform: [{ scale }] }}>
              <View>
                {item?.uri ? (
                  <Video
                    source={{ uri: item.uri }}
                    style={[
                      style.image,
                      { width: itemWidth, height: itemHeight },
                    ]}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
                ) : (
                  <Image
                    source={item}
                    style={[
                      style.image,
                      { width: itemWidth, height: itemHeight },
                    ]}
                  />
                )}
                {/* Si l’élément a un _id, c’est qu’il vient du backend → afficher le bouton */}
                {item?._id && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteVideo(item._id, index)}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </Animated.View>
          </View>
        );
      }}
    />
  );

  // Fonction pour prendre une vidéo
  const takeVideo = async () => {
    // 1. Demande de permission pour accéder à la caméra
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    // 2. Si la permission est refusée, on affiche une alerte et on arrête la fonction
    if (!permissionResult.granted) {
      alert("L'autorisation d'accéder à la caméra est requise !");
      return;
    }

    // 3. Lancement de la caméra pour enregistrer une vidéo
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // On précise qu'on veut uniquement des vidéos
      videoMaxDuration: 60, // Durée maximale de la vidéo (en secondes)
      quality:
        Platform.OS === "ios"
          ? ImagePicker.UIImagePickerControllerQualityType.Medium // Qualité moyenne sur iOS
          : 1, // Pleine qualité sur Android
    });

    // 4. Si l'utilisateur n'a pas annulé l'enregistrement
    if (!result.canceled) {
      const videoAsset = result.assets[0]; // On récupère la vidéo

      // 5. Récupération du token, de l'ID utilisateur et de l'ID du spot depuis le stockage local et les paramètres de navigation
      const userId = await AsyncStorage.getItem("userId");
      const spotId = route.params.spotId;

      // 6. Si l'un des éléments est manquant, on affiche une alerte et on arrête la fonction
      if (!token || !userId || !spotId) {
        alert("Token, ID utilisateur ou ID spot manquant !");
        return;
      }

      // 7. Le nom de la figure (trick) réalisée, ici en dur mais pourrait venir d'un input
      const trick = "ollie";

      // 8. Création d'un formulaire pour envoyer la vidéo et les données associées
      const formData = new FormData();
      formData.append("videoFile", {
        uri: videoAsset.uri,
        name: "video.mp4",
        type: "video/mp4",
      });
      formData.append("tricks", trick);
      formData.append("spot", spotId);
      formData.append("userData", JSON.stringify({ _id: userId }));

      try {
        // 9. Envoi de la vidéo et des infos au backend via une requête POST
        const response = await fetch(`http://192.168.1.100:3000/video`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token, // Authentification via token
          },
          body: formData,
        });

        const data = await response.json();

        // 10. Si le backend renvoie un succès, on ajoute la vidéo à la liste locale
        if (data.result) {
          setVideos((prev) => [
            ...prev,
            { uri: data.data.url, _id: data.data._id },
          ]);
        } else {
          // Sinon, on affiche un message d'erreur retourné par le serveur
          alert("Erreur upload: " + data.reason);
        }
      } catch (err) {
        // 11. Gestion des erreurs lors de l'appel réseau
        console.error("Upload error", err);
      }
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>(nomDuSpot)</Text>
          <Text style={styles.text}>
            Spot de type (...) ajouté le (...) par (...)
          </Text>
        </View>

        {renderCarrousel(
          images,
          scrollXPhotos,
          PHOTO_WIDTH,
          PHOTO_HEIGHT,
          PHOTO_SPACING,
          styles.photosCarrousel
        )}

        <Text style={styles.text}>Vidéos postées cette semaine</Text>

        {renderCarrousel(
          videos,
          scrollXWeek,
          VIDEO_WIDTH,
          VIDEO_HEIGHT,
          VIDEO_SPACING,
          styles.videosCarrousel
        )}

        <Text style={styles.text}>Vidéos depuis la création du spot</Text>

        {renderCarrousel(
          videos,
          scrollXAllTime,
          VIDEO_WIDTH,
          VIDEO_HEIGHT,
          VIDEO_SPACING,
          styles.videosCarrousel
        )}

        <TouchableOpacity
          onPress={() => {
            takeVideo();
          }}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            style={styles.takeVideoButton}
            name="video-plus"
            size={42}
            color="orange"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.returnButtonContainer}
          onPress={() => {
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
    marginTop: 30,
    alignItems: "center",
    height: "95%",
  },
  titleContainer: {
    fontWeight: "bold",
    marginVertical: 10,
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "orange",
  },
  text: {
    fontSize: 18,
    color: "orange",
    marginTop: 6,
  },
  photosCarrouselContainer: {},
  photosCarrousel: {
    // width: PHOTO_WIDTH,
    // height: PHOTO_HEIGHT,
    marginHorizontal: PHOTO_SPACING / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    // width: PHOTO_WIDTH,
    // height: PHOTO_HEIGHT,
    borderRadius: 10,
    resizeMode: "cover", // ou "contain" si problème
  },
  weekVideosCarrouselContainer: {},
  allTimeVideosCarrouselContainer: {},
  videosCarrousel: {
    // width: VIDEO_WIDTH,
    // height: VIDEO_HEIGHT,
    marginHorizontal: VIDEO_SPACING / 2,
    alignItems: "center",
    justifyContent: "center",
    // overflow: "visible",
  },
  video: {
    // width: VIDEO_WIDTH,
    // height: VIDEO_HEIGHT,
    borderRadius: 10,
    resizeMode: "contain",
  },
  takeVideoButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  returnButton: {
    padding: 8,
    alignSelf: "flex-end",
    marginRight: 10,
    marginLeft: 280, // Temporairement mais le positionner de manière plus clean plus tard
  },

  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 4,
    zIndex: 10,
  },
});
