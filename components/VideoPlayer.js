import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";

export default function VideoPlayer({ source }) {
  const player = useVideoPlayer(source, (player) => {
    player.play();
  });
  return (
    <VideoView
      style={styles.video}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
}
const styles = StyleSheet.create({
  video: {
    flex: 1,
    backgroundColor: "black",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    paddingHorizontal: "5%",
    paddingVertical: "10%",
  },
});
