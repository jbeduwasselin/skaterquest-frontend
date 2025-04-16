import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BackgroundWrapper from "../components/background";
import { FontAwesome5 } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";

export default function GosPlayScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);

  // Joueur externe fictif
  const externalUser = {
    name: "Ami Externe",
    avatar: "https://example.com/external-user-avatar.jpg",
    email: "external@example.com",
    age: 28,
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <IconButton
          iconName="play"
          buttonText="Play"
          onPress={() => navigation.navigate("GosVersusScreen")}
          style={styles.playButton}
        />

        {/* Utilisation d'animations pour les profils */}
        <View style={styles.profileContainer}>
          <Animatable.View
            animation="fadeInLeft"
            duration={1000}
            style={styles.profile}
          >
            <Image
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : require("../assets/LOGO TEMPORAIRE.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.name}>
              {user.name ? user.name : "Utilisateur"}
            </Text>
          </Animatable.View>

          {/* Icône VERSUS entre les avatars */}
          <Animatable.View
            animation="zoomIn"
            duration={800}
            style={styles.versusIconContainer}>
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="battle-net" size={60} color="#FF650C" />
            </View>
          </Animatable.View>

          <Animatable.View
            animation="fadeInRight"
            duration={1000}
            style={styles.profile}
          >
            <Image
              source={
                externalUser.avatar
                  ? { uri: externalUser.avatar }
                  : require("../assets/LOGO TEMPORAIRE.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.name}>{externalUser.name}</Text>
          </Animatable.View>
        </View>

        {/* Déplacer GAME OF SKATE sous le bouton Play et ajouter plus d'espace */}
        <Animatable.View
          animation="fadeInDown"
          duration={1200}
          style={styles.gameTitleContainer}
        >
          <Text style={styles.gameTitle}>GAME OF SKATE</Text>
        </Animatable.View>

        {/* Historique du jeu avec animation et plus d'espace entre le titre et l'historique */}
        <Animatable.View
          animation="zoomIn"
          duration={1200}
          style={styles.historyCard}
        >
          <Text style={styles.sectionTitle}>Game History</Text>

          <View style={styles.historyContainer}>
            {/* Affichage des statistiques */}
            <View style={styles.historyRow}>
              <Text style={styles.trickText}>Total Matches: 0</Text>
            </View>
            <View style={styles.historyRow}>
              <Text style={styles.trickText}>Evan Wins: 0</Text>
              <Text style={styles.trickText}>Tyler Wins: 0</Text>
            </View>
          </View>
        </Animatable.View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center", // Centrage vertical
  },
  gameTitleContainer: {
    marginTop: 30,
    marginBottom: 40, // Augmentation de l'espace entre le titre et l'historique
  },
  gameTitle: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FF650C",
    textAlign: "center",
    fontFamily: "sans-serif-condensed",
    textShadowColor: "#FFF",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 3,
    transform: [{ scale: 1.1 }],
  },
  playButton: {
    marginTop: 40,
    marginBottom: 30,
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
  versusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  historyCard: {
    width: "100%",
    backgroundColor: "rgba(172, 100, 6, 0.23)", // Fond transparent
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
    fontFamily: "sans-serif-condensed",
    textShadowColor: "#FF650C",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
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
  iconWrapper: {
    shadowColor: "#FFF",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 6, 
  }
  
  
});
