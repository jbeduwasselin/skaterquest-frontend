import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useSelector } from "react-redux";
import { getSpotInfo, unvoteVideo, upvoteVideo } from "../lib/request";
import { useBackHandler } from "@react-native-community/hooks";
import * as VideoThumbnails from "expo-video-thumbnails";
import VideoPlayer from "../components/VideoPlayer";
import Icon from "react-native-vector-icons/Feather";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SpotScreen({ navigation, route }) {
  const { token } = useSelector((state) => state.user.value);
  const [videoPlaying, setVideoPlaying] = useState(null);
  const [spotData, setSpotData] = useState(route.params.spotData);

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

      <TouchableOpacity
        onPress={() => {
          // uploader une vidéo
        }}
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
