import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { deleteVideo, getOwnUserInfo } from "../lib/request";
import VideoPlayer from "../components/VideoPlayer";
import { useBackHandler } from "@react-native-community/hooks";
import globalStyle, { DEFAULT_THUMBNAIL } from "../globalStyle";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Button } from "../components/Buttons";
import { useConfirmationModal } from "../components/ConfirmModal";
import { formatDate } from "../lib/utils";

/*
Ce screen est un exemple de comment gérer le video player

  const [videoPlaying, setVideoPlaying] = useState(null);

  Un état qui contient l'URL de la vidéo à jouer

    useBackHandler(() => {
    if (videoPlaying) {
      setVideoPlaying(null);
      return true;
    }
    return false;
  });

  Un hook pour faire en sorte que le backbutton ferme la vidéo

   {videoPlaying ? (
          <VideoPlayer
            source={videoPlaying}
            onClose={() => setVideoPlaying(null)}
          />
        ) : ( ..... )

    On vérifie si la videoPlaying est true (contient une url)
    Si oui et on charge le composant videoPlayer
    Si non on charge le screen normal
*/

export default function VideoScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [updateWatcher, forceUpdate] = useReducer((p) => p + 1, 0);
  const [videoPlaying, setVideoPlaying] = useState(null);
  const { token } = useSelector((state) => state.user.value);

  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, [updateWatcher]);

  useBackHandler(() => {
    if (videoPlaying) {
      setVideoPlaying(null);
      return true;
    }
    return false;
  });

  const [setConfim, ConfirmModal] = useConfirmationModal();

  async function deleteUserVideo(videoID) {
    setConfim({
      text: "Supprimer cette vidéo ?",
      handle: async () => {
        const { result } = await deleteVideo(token, videoID);
        result && forceUpdate();
      },
    });
  }

  function VideoCard({ videoData }) {
    const [thumbnail, setThumbnail] = useState({ uri: DEFAULT_THUMBNAIL });

    useEffect(() => {
      (async function getThumbnail() {
        VideoThumbnails.getThumbnailAsync(videoData.url).then(setThumbnail);
      })();
    }, []);

    return (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={() => setVideoPlaying(videoData.url)}
      >
        <View style={styles.thumbnailWrapper}>
          <Image
            source={thumbnail ? { uri: thumbnail.uri } : DEFAULT_THUMBNAIL}
            style={styles.thumbnail}
          />
          <View style={styles.playIconContainer}>
            <Icon name="play-circle" size={36} color="#fff" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>👍 {videoData.votes.length} votes</Text>
          <Text style={styles.infoText}>📍 {videoData.spot?.name}</Text>
          <Text style={styles.infoText}>
            🕒 {formatDate(videoData.creationDate)}
          </Text>
        </View>
        <Button
          iconName="delete"
          size={30}
          onPress={() => deleteUserVideo(videoData._id)}
          containerStyle={{ backgroundColor: "transparent" }}
        />
      </TouchableOpacity>
    );
  }

  if (videoPlaying) {
    return (
      <BackgroundWrapper>
        <VideoPlayer
          source={videoPlaying}
          onClose={() => setVideoPlaying(null)}
        />
      </BackgroundWrapper>
    );
  }
  return (
    <BackgroundWrapper>
      <Text style={[globalStyle.screenTitle, { marginTop: 50 }]}>
        Mes vidéos
      </Text>

      <FlatList
        data={userData?.videos}
        renderItem={({ item }) => item && <VideoCard videoData={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[styles.list, { paddingTop: 20 }]} // 👈 petit espace aussi ici
      />

      <ConfirmModal />
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    gap: 15,
    width: "100%",
  },
  videoCard: {
    display: "flex",
    minWidth: "90%",
    flexDirection: "row",
    backgroundColor: "#2228",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  thumbnailWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 80,
    marginRight: 12,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  playIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -18 }, { translateY: -18 }],
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 36,
    padding: 2,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  videoTitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  infoText: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 2,
  },
});
