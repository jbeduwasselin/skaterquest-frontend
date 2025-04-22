import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import BackgroundWrapper from "../components/background";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import IconButton from "../components/IconButton";
import ConfettiCannon from "react-native-confetti-cannon";

export default function GosVersusScreen({ route, navigation }) {
  const { skater1, skater2, gameMode } = route.params;

  const [skater1Score, setSkater1Score] = useState(0);
  const [skater2Score, setSkater2Score] = useState(0);
  const [skater1Letters, setSkater1Letters] = useState("");
  const [skater2Letters, setSkater2Letters] = useState("");
  const [currentTrick, setCurrentTrick] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

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
      const updated = skater1Letters + letter;
      setSkater1Letters(updated);
      if (updated.length === 5) endGame(skater2);
    } else {
      const updated = skater2Letters + letter;
      setSkater2Letters(updated);
      if (updated.length === 5) endGame(skater1);
    }
  };

  const getNextLetter = (player) => {
    const word = "SKATE";
    return player === "skater1"
      ? word[skater1Letters.length]
      : word[skater2Letters.length];
  };

  const endGame = (loser) => {
    setIsGameOver(true);
  };

  const nextTrick = () => {
    const tricks = [
      "Ollie",
      "No Comply",
      "Revert",
      "Caveman",
      "Acid Drop",
      "Body Varial",
      "Footplant",
      "Firecracker",
      "Pivot",
      "Boneless",
      "Shuvit",
      "Pop Shuvit",
      "Manual",
      "Nose Manual",
      "Kickflip",
      "Heelflip",
      "Frontside 180",
      "Backside 180",
      "Railstand",
      "Boned Ollie",
      "Nollie",
      "Fakie Ollie",
      "Switch Ollie",
      "Wallride",
      "Wallie",
      "Powerslide",
      "Slappy",
      "Varial Kickflip",
      "360 Flip",
      "Hardflip",
      "Impossible",
      "Frontside Flip",
      "Backside Flip",
      "Bigspin",
      "Casper Flip",
      "Darkslide",
      "Primo Slide",
      "Tiger Claw",
      "Underflip",
      "Hospital Flip",
      "Double Kickflip",
      "Triple Kickflip",
      "Laser Flip",
      "Gazelle Flip",
      "Blunt Slide",
    ];
    setCurrentTrick(tricks[Math.floor(Math.random() * tricks.length)]);
  };

  const handleCloseModal = () => {
    setIsGameOver(false);
    navigation.goBack();
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
            <FontAwesome5 name="battle-net" size={60} color="#FF650C" />
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
            Trick en cours: {currentTrick || "Push sur Next Trick"}
          </Text>
          <IconButton
            iconName="refresh-cw"
            buttonText="Next Trick"
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
              <IconButton
                iconName="check-circle"
                buttonText="Trick Validé"
                onPress={() => handleTrickSuccess("skater1")}
                style={[styles.actionButton, styles.smallButton]}
              />
              <IconButton
                iconName="x-circle"
                buttonText="Aïe !"
                onPress={() => handleTrickFailure("skater1")}
                style={[styles.actionButton, styles.smallButton]}
              />
            </View>

            <View style={styles.playerButtons}>
              <IconButton
                iconName="check-circle"
                buttonText="Trick Validé"
                onPress={() => handleTrickSuccess("skater2")}
                style={[styles.actionButton, styles.smallButton]}
              />
              <IconButton
                iconName="x-circle"
                buttonText="Aïe !"
                onPress={() => handleTrickFailure("skater2")}
                style={[styles.actionButton, styles.smallButton]}
              />
            </View>
          </View>
        </Animatable.View>

        <IconButton
          iconName="arrow-left"
          buttonText="Retour accueil"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />

        {/* Modal Game Over */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isGameOver}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Confettis */}
              <ConfettiCannon
                count={80}
                origin={{ x: 150, y: 0 }}
                fadeOut={true}
              />

              {/* Trophée animé */}
              <Animatable.Image
                animation="bounceIn"
                duration={1500}
                easing="ease-out"
                source={require("../assets/trophy.png")}
                style={styles.modalImage}
              />

              <Text style={styles.modalText}>Game over !</Text>
              <Text style={styles.modalText}>
                {skater1Score > skater2Score
                  ? `${skater1 || "Joueur 1"} a gagné !`
                  : `${skater2 || "Joueur 2"} a gagné !`}
              </Text>
              <IconButton
                iconName="check-circle"
                buttonText="Retour au menu"
                onPress={handleCloseModal}
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  profile: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  name: {
    color: "#FFF",
    fontSize: 25,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    width: 180,
    height: 40,
  },
});
