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
import BackgroundWrapper from "../components/background";
import { useSelector } from "react-redux";
import { getSpotInfo, unvoteVideo, upvoteVideo } from "../lib/request";
import IconButton from "../components/IconButton";
import { useBackHandler } from "@react-native-community/hooks";
import * as VideoThumbnails from "expo-video-thumbnails";
import VideoPlayer from "../components/VideoPlayer";
import Icon from "react-native-vector-icons/Feather";

export default function SpotScreen({ navigation, route }) {
  const { token } = useSelector((state) => state.user.value);
  const [videoPlaying, setVideoPlaying] = useState(null);
  const [spotData, setSpotData] = useState(route.params.spotData);

  const [thumbnails, setThumbnails] = useState([]);
  async function loadThumbnails(videos) {
    const uris = await Promise.all(
      videos.map(async ({ url }) => {
        try {
          const uri = await VideoThumbnails.getThumbnailAsync(url);
          return uri;
        } catch (error) {
          console.log("error", error);
        }
      })
    );
    setThumbnails(uris);
  }

  useEffect(() => {
    getSpotInfo(token, spotData._id).then(({ result, data, reason }) => {
      console.log(result, reason, data);
      result && setSpotData(data);
      result && loadThumbnails(data.videos);
    });
  }, []);

  useBackHandler(() => {
    if (videoPlaying) {
      setVideoPlaying(null);
      return true;
    }
    return false;
  });
  if (videoPlaying) {
    return (
      <VideoPlayer
        source={videoPlaying}
        onClose={() => setVideoPlaying(null)}
      />
    );
  }
  console.log(spotData);
  return (
    <BackgroundWrapper>
      <Text style={styles.title}>{spotData.name}</Text>
      <IconButton iconName="plus" />
      <Animated.FlatList
        horizontal
        pagingEnabled
        data={spotData.img}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} height={200} width={400} />;
        }}
      />

      <Animated.FlatList
        horizontal
        pagingEnabled
        data={thumbnails}
        renderItem={({ item, index }) => {
          return (
            <VideoCard
              videoData={spotData.videos[index]}
              thumbnail={item.uri}
              onPress={() => {
                setVideoPlaying(spotData.videos[index].url);
              }}
            />
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddPhotoScreen")}
      ></TouchableOpacity>
    </BackgroundWrapper>
  );
}

function VideoCard({ videoData, thumbnail, onPress }) {
  const { token, uID } = useSelector((state) => state.user.value);
  function formatDate(creationDate) {
    const date = new Date(creationDate);
    return ` ${new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date)} ${date.getUTCDate()}/${date.getUTCMonth()}/${date.getFullYear()}`;
  }
  return (
    <Pressable style={styles.videoItem} onPress={onPress}>
      <View style={styles.thumbnailWrapper}>
        <Image source={{ uri: thumbnail }} height={200} width={400} />
      </View>
      <View style={styles.infoContainer}>
        <Text>
          {videoData.author.username} - 🕒 {formatDate(videoData.creationDate)}
        </Text>
        <Text style={styles.infoText}>👍 {videoData.voteCount} votes</Text>
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
