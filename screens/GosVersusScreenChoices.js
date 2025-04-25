import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import ConfettiCannon from "react-native-confetti-cannon";
import { Picker } from "@react-native-picker/picker";
import { Button } from "../components/Buttons";
import ModalContent from "../components/ModalContent";
import globalStyle from "../globalStyle";
import { tricksData } from "../data/trickList";

export default function GosVersusScreenChoices({ route, navigation }) {
  const { skater1 = "Joueur 1", skater2 = "Joueur 2", gameMode } = route.params;
  const skater1Final = skater1.trim() === "" ? "Joueur 1" : skater1;
  const skater2Final = skater2.trim() === "" ? "Joueur 2" : skater2;

  const [skater1Score, setSkater1Score] = useState(0);
  const [skater2Score, setSkater2Score] = useState(0);
  const [skater1Letters, setSkater1Letters] = useState("");
  const [skater2Letters, setSkater2Letters] = useState("");
  const [selectedTrick, setSelectedTrick] = useState("Ollie");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  // Fonction appelée lorsque le joueur réussit un trick
  const handleTrickSuccess = (player) => {
    if (player === "skater1") {
      setSkater1Score(skater1Score + 1);
    } else {
      setSkater2Score(skater2Score + 1);
    }
  };

  // Fonction appelée lorsque le joueur échoue un trick
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

  // Renvoie la prochaine lettre du mot SKATE à attribuer
  const getNextLetter = (player) => {
    const word = "SKATE";
    return player === "skater1"
      ? word[skater1Letters.length]
      : word[skater2Letters.length];
  };

  // Déclenche la fin du jeu et désigne dynamiquement le gagnant
  const endGame = (loserName) => {
    const winnerName = loserName === "skater1" ? skater2Final : skater1Final;
    setWinner(winnerName);
    setIsGameOver(true);
  };

  const handleCloseModal = () => {
    setIsGameOver(false);
    navigation.goBack();
  };

  return (
    <BackgroundWrapper flexJustify="center">
      {/* Affichage des noms et lettres des joueurs */}
      <Animatable.View
        animation="fadeInLeft"
        duration={1000}
        style={styles.profileContainer}
      >
        <View style={styles.profile}>
          <Text style={styles.name}>{skater1Final}</Text>
          <Text style={styles.letters}>{skater1Letters}</Text>
        </View>

        <View style={styles.versusIconContainer}>
          <FontAwesome5 name="flag-checkered" size={45} color="#FF650C" />
        </View>

        <View style={styles.profile}>
          <Text style={styles.name}>{skater2Final}</Text>
          <Text style={styles.letters}>{skater2Letters}</Text>
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
          <Text style={styles.score}>
            {skater1Final}: {skater1Score}
          </Text>
          <Text style={styles.score}>
            {skater2Final}: {skater2Score}
          </Text>
        </View>
      </Animatable.View>

      {/* Sélection du trick via Picker */}
      <Animatable.View
        animation="zoomIn"
        duration={1000}
        style={[styles.trickContainer, styles.trickCard]}
      >
        <Text style={styles.trickText}>Choisis ton Trick :</Text>
        <Picker
          selectedValue={selectedTrick}
          onValueChange={(itemValue) => setSelectedTrick(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFF"
        >
          {/* Liste très longue de tricks pour plus de choix */}
          {tricksData.map(({ name }) => (
            <Picker.Item key={name} label={name} value={name} />
          ))}
        </Picker>
      </Animatable.View>

      {/* Boutons d'action pour chaque joueur */}
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
              text="Ouille !"
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
              text="Ouille !"
              onPress={() => handleTrickFailure("skater2")}
              style={[styles.actionButton, styles.smallButton]}
            />
          </View>
        </View>
      </Animatable.View>

      {/* Modal de fin de partie */}
      <ModalContent
        visibleState={isGameOver}
        closeHandler={() => setIsGameOver(false)}
        containerStyle={globalStyle.modalContainer}
      >
        <ConfettiCannon count={80} origin={{ x: 150, y: 0 }} fadeOut={true} />
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          easing="ease-out"
          source={require("../assets/trophy.png")}
          style={styles.modalImage}
        />
        <Text style={globalStyle.screenTitle}>Game over !</Text>
        <Text style={globalStyle.subSubTitle}>{winner} a gagné !</Text>
        <Button
          iconName="settings-backup-restore"
          text="Retour au menu"
          onPress={handleCloseModal}
          style={styles.modalButton}
        />
      </ModalContent>
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
  picker: {
    color: "#FFF",
    width: 200,
    height: 60,
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
  modalImage: {
    width: 200,
    height: 200,
  },
});
