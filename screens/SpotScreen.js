import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Tableau temporaire pour tester
const images = [
  require("../assets/Thomas surf.jpg"),
  require("../assets/Lennie Skate.jpeg"),
  require("../assets/spotChoicePark.png"),
];

// Variable screenWidth pour gérer le responsive (dimensions des photos et vidéos calculées à partir de celles de l'écran)
const { width: screenWidth } = Dimensions.get("window");

// Variables pour gérer les dimensions des photos (en responsive grâce à screenWidth)
const PHOTO_WIDTH = screenWidth * 0.5; // 50% de la largeur de l'écran
const PHOTO_HEIGHT = PHOTO_WIDTH * 0.75; // Format 3:4
const PHOTO_SPACING = 16; // Espacement horizontal entre les photos

// Variables pour gérer les dimensions des vidéos (en responsive grâce à screenWidth)
const VIDEO_WIDTH = screenWidth * 0.7; // 70% de la largeur de l'écran
const VIDEO_HEIGHT = PHOTO_WIDTH * 0.75;
const VIDEO_SPACING = 16;

export default function SpotScreen({ navigation }) {
  // On déclare un scrollX par gallerie à afficher. scrollX crée une valeur animée qui suit la position du scroll (X car horizontal)
  const scrollXPhotos = useRef(new Animated.Value(0)).current; // Pour le carrousel des photos
  const scrollXWeek = useRef(new Animated.Value(0)).current; // Pour le carrousel des vidéos postées cette semaine
  const scrollXAllTime = useRef(new Animated.Value(0)).current; // Pour le carrousel des vidéos postées depuis la création du spot

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
        paddingVertical: 20, // Ajoute un peu d'espace vertical pour éviter que le zoom coupe l'image du milieu
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
        // Effet de zoom dynamique
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.9, 1.1, 0.9], // Scale de 1.1 pour l'image centrale, 0.9 pour les autres
          extrapolate: "clamp",
        });

        return (
          <View style={[style.container]}>
            <Animated.View style={{ transform: [{ scale }] }}>
              <Image
                source={item}
                style={[style.image, { width: itemWidth, height: itemHeight }]}
              />
            </Animated.View>
          </View>
        );
      }}
    />
  );

  // Fonction pour prendre une vidéo
  const takeVideo = () => {
    //...
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Spot de type (...)</Text>
        <Text style={styles.subtitle}>Créé le (...) par (...)</Text>
      </View>

      {renderCarrousel(
        images,
        scrollXPhotos,
        PHOTO_WIDTH,
        PHOTO_HEIGHT,
        PHOTO_SPACING,
        styles.photosCarrousel
      )}

      <Text>Vidéos postées cette semaine</Text>

      {renderCarrousel(
        images,
        scrollXWeek,
        VIDEO_WIDTH,
        VIDEO_HEIGHT,
        VIDEO_SPACING,
        styles.videosCarrousel
      )}

      <Text>Vidéos depuis la création du spot</Text>

      {renderCarrousel(
        images,
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
          size={36}
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    height: "93%",
  },
  titleContainer: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
  },
  photosCarrouselContainer: {},
  photosCarrousel: {
    width: PHOTO_WIDTH,
    marginHorizontal: PHOTO_SPACING / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
    borderRadius: 10,
    resizeMode: "cover",
  },
  weekVideosCarrouselContainer: {},
  allTimeVideosCarrouselContainer: {},
  videosCarrousel: {
    width: VIDEO_WIDTH,
    marginHorizontal: VIDEO_SPACING / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    borderRadius: 10,
    resizeMode: "cover",
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
});
