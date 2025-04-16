import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import BackgroundWrapper from "../components/background";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../components/IconButton";

export default function GosPlayScreen({ navigation }) {
  const players = {
    left: { name: "Lennie", avatar: require("../assets/Lennie Skate.jpeg") },
    right: { name: "Thomas", avatar: require("../assets/Thomas surf.jpg") },
  };

  const history = [
    { trick: "Ollie", evan: true, tyler: true },
    { trick: "Heelflip", evan: true, tyler: false },
    { trick: "Pop Shuvit", evan: true, tyler: true },
  ];

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <IconButton
          iconName="play"
          buttonText="Play"
          onPress={() => navigation.navigate("GosVersusScreen")}
          style={styles.playButton}
        />

        <View style={styles.historyCard}>
          <Text style={styles.sectionTitle}>Game History</Text>

          <View style={styles.profileContainer}>
            <View style={styles.profile}>
              <Image source={players.left.avatar} style={styles.avatar} />
              <Text style={styles.name}>{players.left.name}</Text>
            </View>
            <View style={styles.profile}>
              <Image source={players.right.avatar} style={styles.avatar} />
              <Text style={styles.name}>{players.right.name}</Text>
            </View>
          </View>

          <View style={styles.historyContainer}>
            {history.map((item, index) => (
              <View key={index} style={styles.historyRow}>
                <Text style={styles.trickText}>{item.trick}</Text>
                <View style={styles.icon}>
                  <FontAwesome
                    name={item.evan ? "check-circle" : "times-circle"}
                    size={20}
                    color={item.evan ? "#4CAF50" : "#E74C3C"}
                  />
                </View>
                <View style={styles.icon}>
                  <FontAwesome
                    name={item.tyler ? "check-circle" : "times-circle"}
                    size={20}
                    color={item.tyler ? "#4CAF50" : "#E74C3C"}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  playButton: {
    marginTop: 40,
    marginBottom: 30,
  },
  historyCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ff6f00",
    shadowColor: "#ff6f00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    textTransform: "uppercase",
    marginBottom: 16,
    fontFamily: "sans-serif-condensed", // remplace si tu as une police graffiti
    textShadowColor: "#FF650C",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  profile: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textTransform: "uppercase",
  },
  historyContainer: {
    width: "100%",
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
  },
  trickText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 30,
    alignItems: "center",
  },
});