import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  Pressable,
  TouchableOpacity,
  TextInput,
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
import Icon from "react-native-vector-icons/Feather";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SpotScreen({ navigation, route }) {
  const { token } = useSelector((state) => state.user.value);
  const [videoPlaying, setVideoPlaying] = useState(null);
  const [spotData, setSpotData] = useState(route.params.spotData);

  // États liés à la publication d'une nouvelle vidéo
  const [selectedVideoUri, setSelectedVideoUri] = useState(null); // Pour stocker l'URI de la vidéo séléctionnée
  const [trickInputs, setTrickInputs] = useState([""]); // Tricks entrés par l'utilisateurs pour les associer à la vidéo
  const [showTrickModal, setShowTrickModal] = useState(false); // État pour afficher/masquer la fenêtre modale permettant de saisir les tricks de la vidéo

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

    // Envoi de la vidéo
    const { result } = await postVideo(
      token,
      selectedVideoUri,
      trickList,
      spotData._id
    );

    console.log("RESULT :", result); // pour test

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
      <Text style={styles.title}>{spotData.name}</Text>

      <Animated.FlatList
        horizontal
        pagingEnabled
        data={spotData.img}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} height={200} width={400} />;
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("AddPhotoScreen", { spotData })}
      >
        <MaterialIcons name="add-a-photo" size={40} color="orange" />
      </TouchableOpacity>

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
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                padding: 8,
                marginBottom: 8,
              }}
            />
          ))}

          <TouchableOpacity
            onPress={handleAddTrick}
            style={{ marginBottom: 10 }}
          >
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              + Ajouter un autre trick
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmitVideo}
            style={{
              backgroundColor: "orange",
              padding: 12,
              alignItems: "center",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Poster la vidéo
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={uploadVideoFromGallery}
        style={styles.buttonContainer}
        activeOpacity={0.8}
      >
        <MaterialIcons name="video-call" size={50} color="orange" />
      </TouchableOpacity>
    </BackgroundWrapper>
  );
}

function VideoCard({ videoData, onPress }) {
  const { token, uID } = useSelector((state) => state.user.value);
  const [thumbnail, setThumbnails] = useState(null);

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
      VideoThumbnails.getThumbnailAsync(videoData.url).then(setThumbnails);
    })();
  }, []);

  return (
    <Pressable style={styles.videoItem} onPress={onPress}>
      <View style={styles.thumbnailWrapper}>
        {thumbnail && (
          <Image source={{ uri: thumbnail.uri }} height={200} width={400} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text>
          {videoData.author.username} - 🕒 {formatDate(videoData.creationDate)}
        </Text>
        <Text style={styles.infoText}>👍 {videoData.votes.length} votes</Text>
        <Text style={styles.infoText}>📍 {videoData.spot?.name}</Text>
        <Text style={styles.infoText}>{videoData.tricks.join(",")}</Text>
      </View>
      <LikeButton
        isLiked={videoData.votes.some((vote) => vote.uID == uID)}
        onLike={async (like) => {
          like
            ? await upvoteVideo(token, videoData._id)
            : await unvoteVideo(token, videoData._id);
        }}
      />
    </Pressable>
  );
}

function LikeButton({ onLike, isLiked }) {
  const [liked, setLiked] = useState(isLiked);
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  return (
    <TouchableOpacity
      onPress={() => {
        onLike(!liked);
        setLiked(!liked);
      }}
    >
      <Icon name="thumbs-up" size={32} color={liked ? "black" : "gray"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 800,
  },
  videoItem: {
    display: "flex",
    flexDirection: "column",
  },
});
