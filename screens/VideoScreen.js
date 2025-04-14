import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import BackgroundWrapper from "../components/background";
import Icon from "react-native-vector-icons/Feather";

// fausse liste en attendant les vraies vidéos
const fakeVideos = [
  {
    id: "1",
    title: "360 Flip au park",
    thumbnail: require("../assets/Lennie Skate.jpeg"),
    votes: 23,
    date: "2025-04-10",
    spot: "Skatepark Btwin village",
  },
  {
    id: "2",
    title: "Kickflip sur 5 marches",
    thumbnail: require("../assets/Lennie Skate.jpeg"),
    votes: 41,
    date: "2025-08-15",
    spot: "Skatepark Btwin village",
  },
  {
    id: "3",
    title: "Kickflip sur 5 marches",
    thumbnail: require("../assets/Lennie Skate.jpeg"),
    votes: 52,
    date: "2025-02-22",
    spot: "Skatepark Btwin village",
  },
];

export default function VideoScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem}>
      <View style={styles.thumbnailWrapper}>
        <Image source={item.thumbnail} style={styles.thumbnail} />
        <View style={styles.playIconContainer}>
          <Icon name="play-circle" size={36} color="#fff" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.infoText}>👍 {item.votes} votes</Text>
        <Text style={styles.infoText}>📍 {item.spot}</Text>
        <Text style={styles.infoText}>🕒 {item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Mes vidéos</Text>

        <FlatList
          data={fakeVideos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
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
  },
  videoItem: {
    flexDirection: "row",
    backgroundColor: "#2228",
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-start",
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
