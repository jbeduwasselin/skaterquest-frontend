import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Button } from "../components/Buttons";
import ConfettiCannon from "react-native-confetti-cannon";
import { tricksData } from "../data/trickList";
import ModalContent from "../components/ModalContent";
import globalStyle from "../globalStyle";
import { randomOf } from "../lib/utils";

export default function GosVersusScreenRandom({ route, navigation }) {
  const { skater1, skater2 } = route.params;

  const [skater1Score, setSkater1Score] = useState(0);
  const [skater2Score, setSkater2Score] = useState(0);
  const [skater1Letters, setSkater1Letters] = useState("");
  const [skater2Letters, setSkater2Letters] = useState("");
  const [currentTrick, setCurrentTrick] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleTrickSuccess = (player) => {
    if (player === "skater1") {
      setSkater1Score(skater1Score + 1);
    } else {
      setSkater2Score(skater2Score + 1);
    }
  };

  const handleTrickFailure = (player) => {
    const letter = getNextLetter(player);

    if (player === "skater1") {
      if (skater1Letters.length < 5) {
        const letter = getNextLetter("skater1");
        const updated = skater1Letters + letter;
        setSkater1Letters(updated);
        if (updated.length === 5) endGame("skater1");
      }
      return;
    }

    if (player === "skater2") {
      if (skater2Letters.length < 5) {
        const letter = getNextLetter("skater2");
        const updated = skater2Letters + letter;
        setSkater2Letters(updated);
        if (updated.length === 5) endGame("skater2");
      }
      return;
    }
  };

  const getNextLetter = (player) => {
    const word = "SKATE";
    return player === "skater1"
      ? word[skater1Letters.length]
      : word[skater2Letters.length];
  };

  const endGame = (loserKey) => {
    const winnerKey = loserKey === "skater1" ? "skater2" : "skater1";
    const winnerName =
      winnerKey === "skater1" ? skater1 || "Joueur 1" : skater2 || "Joueur 2";

    setWinner(winnerName);
    setIsGameOver(true);
  };

  const nextTrick = () => {
    setCurrentTrick(randomOf(tricksData).name);
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Affichage des joueurs */}
        <Animatable.View
          animation="fadeInLeft"
          duration={1000}
          style={styles.profileContainer}
        >
          <View style={styles.profile}>
            <Text style={styles.name}>{skater1 || "Joueur 1"}</Text>
            <Text style={styles.letters}>{skater1Letters}</Text>
          </View>

          <View style={styles.versusIconContainer}>
            <FontAwesome5 name="flag-checkered" size={45} color="#FF650C" />
          </View>

          <View style={styles.profile}>
            <Text style={styles.name}>{skater2 || "Joueur 2"}</Text>
            <Text style={styles.letters}>{skater2Letters}</Text>
          </View>
        </Animatable.View>

        {/* Score */}
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          style={styles.scoreContainer}
        >
          <Text style={styles.scoreText}>Score</Text>
          <View style={styles.scoreBoard}>
            <Text style={styles.score}>
              {skater1 || "Joueur 1"}: {skater1Score}
            </Text>
            <Text style={styles.score}>
              {skater2 || "Joueur 2"}: {skater2Score}
            </Text>
          </View>
        </Animatable.View>

        {/* Trick actuel */}
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          style={[styles.trickContainer, styles.trickCard]}
        >
          <Text style={styles.trickText}>
            Partie en cours: {currentTrick || "Appuie sur Next Trick"}
          </Text>
          <Button
            iconName="refresh"
            text="Next Trick"
            onPress={nextTrick}
            style={styles.nextTrickButton}
          />
        </Animatable.View>

        {/* Actions */}
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={styles.actionsContainer}
        >
          <View style={styles.buttonsContainer}>
            <View style={styles.playerButtons}>
              <Button
                iconName="check-circle"
                text="Trick Validé"
                onPress={() => handleTrickSuccess("skater1")}
                style={[styles.actionButton, styles.smallButton]}
              />
              <Button
                iconName="unpublished"
                text="Aïe !"
                onPress={() => handleTrickFailure("skater1")}
                style={[styles.actionButton, styles.smallButton]}
              />
            </View>

            <View style={styles.playerButtons}>
              <Button
                iconName="check-circle"
                text="Trick Validé"
                onPress={() => handleTrickSuccess("skater2")}
                style={[styles.actionButton, styles.smallButton]}
              />
              <Button
                iconName="unpublished"
                text="Aïe !"
                onPress={() => handleTrickFailure("skater2")}
                style={[styles.actionButton, styles.smallButton]}
              />
            </View>
          </View>
        </Animatable.View>

        {/* Modale Game Over */}
        <ModalContent
          animationType="fade"
          transparent={true}
          visibleState={isGameOver}
          closeHandler={() => setIsGameOver(false)}
          containerStyle={globalStyle.modalContainer}
        >
          {/* Confettis */}
          <ConfettiCannon count={80} origin={{ x: 150, y: 0 }} fadeOut={true} />

          {/* Trophée animé */}
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            easing="ease-out"
            source={require("../assets/trophy.png")}
            style={styles.modalImage}
          />

          <Text style={globalStyle.screenTitle}>Game over !</Text>
          <Text style={globalStyle.subSubTitle}>
            {winner ? `${winner} a gagné !` : "Fin de partie"}
          </Text>
          <Button
            iconName="settings-backup-restore"
            text="Retour au menu"
            onPress={() => navigation.navigate("GoS")}
            containerStyle={{ marginVertical: 20 }}
          />
        </ModalContent>
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
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  profile: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    color: "#FFF",
    fontSize: 23,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  letters: {
    color: "#FF650C",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 4,
    letterSpacing: 4,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    borderWidth: 1,
    borderColor: "#FF650C",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  versusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  scoreContainer: {
    marginTop: 10,
    marginBottom: 12,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FF650C",
    width: "90%",
    alignItems: "center",
    shadowColor: "#FF650C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  scoreText: {
    fontSize: 28,
    color: "#FF650C",
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  score: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#FF650C",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  trickContainer: {
    marginBottom: 14,
    alignItems: "center",
  },
  trickText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  nextTrickButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  actionsContainer: {
    width: "100%",
    marginTop: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "35%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  playerButtons: {
    alignItems: "center",
    flex: 1,
  },
  actionButton: {
    marginBottom: 15,
  },
  smallButton: {
    width: 160,
    height: 40,
  },
  backButton: {
    marginTop: 12,
  },
  trickCard: {
    backgroundColor: "rgba(172, 100, 6, 0.23)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ff6f00",
    shadowColor: "#ff6f00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
    marginBottom: 20,
    minWidth: 250,
  },
  modalImage: {
    width: 200,
    height: 200,
  },
});
