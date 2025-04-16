import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import BackgroundWrapper from "../components/background";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import IconButton from "../components/IconButton";

export default function GosVersusScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  // Joueur externe fictif
  const externalUser = {
    name: "Ami Externe",
    avatar: "https://example.com/external-user-avatar.jpg",
    email: "external@example.com",
    age: 28,
  };

  // États pour gérer le jeu
  const [userScore, setUserScore] = useState(0);
  const [externalUserScore, setExternalUserScore] = useState(0);
  const [currentTrick, setCurrentTrick] = useState("");
  const [userLetters, setUserLetters] = useState(""); // Lettres de l'utilisateur
  const [externalUserLetters, setExternalUserLetters] = useState(""); // Lettres de l'adversaire

  // Fonction pour gérer l'ajout de points
  const handleTrickSuccess = (player) => {
    if (player === "user") {
      setUserScore(userScore + 1);
    } else {
      setExternalUserScore(externalUserScore + 1);
    }
  };

  // Fonction pour gérer un trick non validé
  const handleTrickFailure = (player) => {
    const letter = getNextLetter(player); // On récupère la prochaine lettre du mot "SKATE"
    if (player === "user") {
      setUserLetters(userLetters + letter);
    } else {
      setExternalUserLetters(externalUserLetters + letter);
    }

    // Vérification si un joueur a perdu
    if (userLetters.length === 5 || externalUserLetters.length === 5) {
      // Déterminer le gagnant
      const winner = userLetters.length === 5 ? "Ami Externe" : user.name;
      Alert.alert("Game Over", `${winner} wins!`, [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  // Fonction pour obtenir la prochaine lettre du mot "SKATE"
  const getNextLetter = (player) => {
    const word = "SKATE";
    if (player === "user") {
      return word[userLetters.length];
    } else {
      return word[externalUserLetters.length];
    }
  };

  // Fonction pour gérer le changement de trick
  const nextTrick = () => {
    const tricks = ["Ollie", "Kickflip", "Heelflip", "Pop Shuvit", "Impossible"];
    setCurrentTrick(tricks[Math.floor(Math.random() * tricks.length)]);
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Section de l'affrontement */}
        <Animatable.View
          animation="fadeInLeft"
          duration={1000}
          style={styles.profileContainer}
        >
          <View style={styles.profile}>
            <Image
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : require("../assets/LOGO TEMPORAIRE.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.name}>{user.name}</Text>
            {/* Affichage des lettres du joueur avec taille agrandie */}
            <Text style={styles.letters}>{userLetters}</Text>
          </View>

          {/* Icône VERSUS entre les avatars */}
          <Animatable.View
            animation="zoomIn"
            duration={800}
            style={styles.versusIconContainer}
          >
            <FontAwesome5 name="battle-net" size={60} color="#FF650C" />
          </Animatable.View>

          <View style={styles.profile}>
            <Image
              source={
                externalUser.avatar
                  ? { uri: externalUser.avatar }
                  : require("../assets/LOGO TEMPORAIRE.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.name}>{externalUser.name}</Text>
            {/* Affichage des lettres du joueur externe avec taille agrandie */}
            <Text style={styles.letters}>{externalUserLetters}</Text>
          </View>
        </Animatable.View>

        {/* Affichage des scores */}
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          style={styles.scoreContainer}
        >
          <Text style={styles.scoreText}>Score</Text>
          <View style={styles.scoreBoard}>
            <Text style={styles.score}>Skater 01: {userScore}</Text>
            <Text style={styles.score}>Skater 02: {externalUserScore}</Text>
          </View>
        </Animatable.View>

        {/* Affichage du trick en cours */}
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          style={styles.trickContainer}
        >
          <Text style={styles.trickText}>Trick en cours: {currentTrick}</Text>
          <IconButton
            iconName="refresh-cw"
            buttonText="Next Trick"
            onPress={nextTrick}
            style={styles.nextTrickButton}
          />
        </Animatable.View>

        {/* Zone pour ajouter des actions de jeu */}
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={styles.actionsContainer}
        >
          {/* Boutons de validation et non-validation sous chaque joueur */}
          <View style={styles.buttonsContainer}>
            <View style={styles.playerButtons}>
              <IconButton
                iconName="check-circle"
                buttonText="Trick Validé"
                onPress={() => handleTrickSuccess("user")}
                style={[styles.actionButton, styles.smallButton]}
              />
              <IconButton
                iconName="x-circle"
                buttonText="Trick Non Validé"
                onPress={() => handleTrickFailure("user")}
                style={[styles.actionButton, styles.smallButton]}
              />
            </View>

            <View style={styles.playerButtons}>
              <IconButton
                iconName="check-circle"
                buttonText="Trick Validé"
                onPress={() => handleTrickSuccess("externalUser")}
                style={[styles.actionButton, styles.smallButton]}
              />
              <IconButton
                iconName="x-circle"
                buttonText="Trick Non Validé"
                onPress={() => handleTrickFailure("externalUser")}
                style={[styles.actionButton, styles.smallButton]}
              />
            </View>
          </View>
        </Animatable.View>

        {/* Retour à l'écran précédent */}
        <IconButton
          iconName="arrow-left"
          buttonText="Retour accueil"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  profile: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    textTransform: "uppercase",
  },
  letters: {
    color: "#FF650C",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 5,
  },
  versusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  scoreContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    color: "#FF650C",
    fontWeight: "bold",
  },
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  score: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  trickContainer: {
    marginBottom: 20,
  },
  trickText: {
    fontSize: 22,
    color: "#FF650C",
    fontWeight: "bold",
  },
  nextTrickButton: {
    marginTop: 15,
  },
  actionsContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  playerButtons: {
    alignItems: "center",
    flex: 1,
  },
  actionButton: {
    marginBottom: 10,
  },
  smallButton: {
    width: 120,
    height: 40,
  },
  backButton: {
    marginTop: 20,
  },
});
