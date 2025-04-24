import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useSelector } from "react-redux";
import {
  getSpotInfo,
  unvoteVideo,
  upvoteVideo,
  postVideo,
} from "../lib/request";
import { useBackHandler } from "@react-native-community/hooks";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as ImagePicker from "expo-image-picker";
import VideoPlayer from "../components/VideoPlayer";
import { useIsFocused } from "@react-navigation/native";
import { Button, StateButton } from "../components/Buttons";
import globalStyle from "../globalStyle";

// Variables pour gérer l'affichage
const { width } = Dimensions.get("window"); // Pour l'affichage responsive
const ITEM_SIZE = width * 0.5; // Largeur des images dans le carrousel
const SIDE_EMPTY_SPACE = (width - ITEM_SIZE) / 2; // Espacement entre les images du carrousel pour entre‑voir les images voisines à celle du milieu

export default function SpotScreen({ navigation, route }) {
  const { token } = useSelector((state) => state.user.value);
  const [videoPlaying, setVideoPlaying] = useState(null);
  const [spotData, setSpotData] = useState(route.params.spotData);

  // États liés à la publication d'une nouvelle vidéo
  const [selectedVideoUri, setSelectedVideoUri] = useState(null); // Pour stocker l'URI de la vidéo séléctionnée
  const [trickInputs, setTrickInputs] = useState([""]); // Tricks entrés par l'utilisateurs pour les associer à la vidéo
  const [showTrickModal, setShowTrickModal] = useState(false); // État pour afficher/masquer la fenêtre modale permettant de saisir les tricks de la vidéo
  const [uploading, setUploading] = useState(false); // Indicateur de progression du chargement de la vidéo (utile pour envoyer un feedback à l'utilisateur quand la vidéo met du temps à charger)

  // Déclaration d'1 scrollX par gallerie à afficher. scrollX crée une valeur animée qui suit la position du scroll (X car horizontal)
  const scrollXPhotos = useRef(new Animated.Value(0)).current; // Pour le carrousel des photos
  const scrollXVideos = useRef(new Animated.Value(0)).current; // Pour le carrousel des vidéos

  // Hook qui détermine si l'écran est actif
  const isFocused = useIsFocused();
  useEffect(() => {
    /*
    isFocused nous dis si l'écran est celui actuellement chargé par l'utilisateur.
    Ici on fetch au montage du composant et au changement d'écran mais seulement
    si on est sur celui ci isFocused = true.
    */
    isFocused &&
      getSpotInfo(token, spotData._id).then(({ result, data }) => {
        result && setSpotData(data);
      });
  }, [isFocused]);

  // Enregistrement de la vidéo et des tricks associés
  const handleSubmitVideo = async () => {
    // On met le(s) trick(s) saisi(s) (en supprimant les espaces inutiles) dans le tableau trickList
    const trickList = trickInputs.filter((trick) => trick.trim().length > 0);

    // Vérification qu'au moins 1 trick ait été saisi
    if (trickList.length === 0) {
      alert("Ajoute au moins un trick stp !");
      return;
    }

    // Chargement de la vidéo
    setUploading(true); // Permet d'afficher l'ActivityIndicator dans le JSX pour rendre le chargement visuel
    try {
      const { result } = await postVideo(
        token,
        selectedVideoUri,
        trickList,
        spotData._id
      );
    } finally {
      setUploading(false); // Disparition de l'ActivityIndicator quand la vidéo est chargée
    }

    if (result) {
      // Mise à jour du spot et des états
      const { data: updatedSpot } = await getSpotInfo(token, spotData._id);
      setSpotData(updatedSpot);
      setShowTrickModal(false);
      setTrickInputs([""]);
      setSelectedVideoUri(null);
    } else {
      alert("Erreur lors de l'envoi de la vidéo");
    }
  };

  // Fonction pour ajouter un champ de trick
  const handleAddTrick = () => {
    setTrickInputs([...trickInputs, ""]);
  };

  // Fonction pour que la touche retour ferme le lecteur vidéo
  useBackHandler(() => {
    if (videoPlaying) {
      setVideoPlaying(null);
      return true;
    }
    return false;
  });

  // Lecteur vidéo
  if (videoPlaying) {
    return (
      <VideoPlayer
        source={videoPlaying}
        onClose={() => setVideoPlaying(null)}
      />
    );
  }

  // Fonction pour charger une vidéo depuis la galerie du téléphone
  const uploadVideoFromGallery = async () => {
    // Demande de permission d'accès à la galerie (fonction requestMediaLibraryPermissionsAsync() de ImagePicker)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission requise pour accéder à la galerie");
      return; // Interruption de la fonction si l'utilisateur n'autorise pas l'appli à accéder à sa galerie
    }

    // Ouverture de la galerie  (fonction launchImageLibraryAsync() de ImagePicker)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    // Interruption si l'utilisateur annule
    if (result.canceled) return;

    const videoUri = result.assets[0].uri;
    console.log("Vidéo sélectionnée :", videoUri);
    setSelectedVideoUri(videoUri);
    setShowTrickModal(true); // Ouverture de la fenêtre modale pour saisir les tricks liés à la vidéo
  };

  return (
    <BackgroundWrapper>
        <Text style={globalStyle.screenTitle}>{spotData.name}</Text>
        <Text style={{...globalStyle.subSubTitle}}>Spot de type {spotData.category}</Text>

      <Animated.FlatList // FlatList sert pour l'affichage des images en défilement et Animated pour la dynamisation
        data={spotData.img} // Mettre ici les images (photos ou vidéos) voulues
        keyExtractor={(uri, i) => "img" + i} // Pour identifier quelle image est au centre ou non et gérer son affichage en fonction
        horizontal // Scroll horizontal (par défaut FlatList est en scroll vertical)
        showsHorizontalScrollIndicator={false} // Cache la barre de scroll horizontale
        snapToInterval={ITEM_SIZE} // Fluidifie le défilement en snappant automatiquement chaque image quand on scrolle
        decelerationRate="fast" // Rend le scroll plus "snappy" (rapide) à s’arrêter
        pagingEnabled={false} // Désactive le défilement "page par page" (qui est plus adapté quand les images prennent toute la largeur de l'écran)
        // contentContainerStyle={{ paddingHorizontal: SIDE_EMPTY_SPACE }} // Gère l'espacement entre les images
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollXPhotos } } }], // Lie le scroll horizontal à scrollX pour pouvoir animer en fonction de la position
          { useNativeDriver: true } // Rend l’animation exécutable directement par le moteur natif du téléphone (donc + fluide, + rapide et ne bloque pas le reste de l’UI)
        )}
        scrollEventThrottle={16} // Fluidifie le sroll (gère la fréquence de déclenchement du onScroll ci-dessus, + la valeur est basse + le scroll est fluide mais réduit les perfs)
        // Fonction renderItem() pour afficher les éléments (items) de la FlatList
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const scale = scrollXPhotos.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8], // Règle la taille respective de l'image de gauche, du milieu et de droite
            extrapolate: "clamp",
          });
          const opacity = scrollXPhotos.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6], // Règle l'opacité respective de l'image de gauche, du milieu et de droite
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              style={[styles.carouselItem, { transform: [{ scale }], opacity }]}
            >
              <Image
                source={{ uri: item }}
                height={200}
                width={400}
                  style={styles.photo}
                resizeMode="cover" // Remplit proprement l'espace vertical
              />
            </Animated.View>
          );
        }}
      />
      <Button
        onPress={() => navigation.navigate("AddPhotoScreen", { spotData })}
        iconName="add-a-photo"
        text="Ajouter une photo"
      />

      <Animated.FlatList
        horizontal
        pagingEnabled
        data={spotData.videos}
        renderItem={({ item }) => {
          return (
            <VideoCard
              videoData={item}
              onPress={() => {
                setVideoPlaying(item.url);
              }}
            />
          );
        }}
      />

      {showTrickModal && (
        <View
          style={{ padding: 16, backgroundColor: "#fff", marginVertical: 20 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Quels tricks sont présents dans la vidéo ?
          </Text>
          {trickInputs.map((trick, index) => (
            <TextInput
              key={index}
              placeholder={`Trick ${index + 1}`}
              value={trick}
              onChangeText={(text) => {
                const updated = [...trickInputs];
                updated[index] = text;
                setTrickInputs(updated);
              }}
              style={globalStyle.textInput}
            />
          ))}

          <Button onPress={handleAddTrick} text="Ajouter un autre trick" />
          <Button onPress={handleSubmitVideo} text="Poster la video" />
        </View>
      )}

      {uploading && (
        <View>
          <Text>Chargement de ta vidéo...</Text>
          <ActivityIndicator size="large" color="orange" />
        </View>
      )}
      <Button
        onPress={uploadVideoFromGallery}
        iconName="video-call"
        text="Poster une vidéo"
        size={30}
      />
    </BackgroundWrapper>
  );
}

function VideoCard({ videoData, onPress }) {
  const { token, uID } = useSelector((state) => state.user.value);
  const [thumbnail, setThumbnail] = useState(null);

  // Formate la date
  function formatDate(creationDate) {
    const date = new Date(creationDate);
    return ` ${new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(
      date
    )} ${date.getUTCDate()}/${date.getUTCMonth()}/${date.getFullYear()}`;
  }

  // Au montage crée le thumbnail pour la vidéo
  useEffect(() => {
    (async function getThumbnail() {
      VideoThumbnails.getThumbnailAsync(videoData.url).then(setThumbnail);
    })();
  }, []);

  return (
    <Pressable style={styles.videoItem} onPress={onPress}>
      <View style={styles.thumbnailWrapper}>
        {thumbnail && (
          <Image source={{ uri: thumbnail.uri }} height={200} width={400} />
        )}
      </View>
      <View style={globalStyle.flexRow}>
        <Text>
          {videoData.author.username} - 🕒 {formatDate(videoData.creationDate)}
        </Text>
        <Text style={styles.infoText}>👍 {videoData.votes.length} votes</Text>
        <Text style={styles.infoText}>📍 {videoData.spot?.name}</Text>
        <Text style={styles.infoText}>{videoData.tricks.join(",")}</Text>
      </View>
      <StateButton
        value={videoData.votes.some((vote) => vote.uID == uID)}
        iconName="thumb-up"
        activeColor="blue"
        containerStyle={{ backgroundColor: "transparent" }}
        onPress={async (like) => {
          like
            ? await upvoteVideo(token, videoData._id)
            : await unvoteVideo(token, videoData._id);
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 4,
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    width: "85%",
    fontWeight: "bold",
    marginVertical: 10,
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "orange",
  },
  subtitle: {
    fontSize: 12,
    color: "orange",
    marginTop: 6,
  },
  carouselItem: {
    // width: ITEM_SIZE,
    // height: ITEM_SIZE * 1.5,
    marginHorizontal: 2,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  photoWrapper: {
    width: "100%",
    aspectRatio: 3 / 4, // portrait
    backgroundColor: "#222", // au cas où l'image charge lentement
  },
  //   photo: {
  //     width: "100%",
  //     height: "100%",
  //     borderRadius: 8,
  //   },
  videoItem: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    marginBottom: 10,
  },
});
