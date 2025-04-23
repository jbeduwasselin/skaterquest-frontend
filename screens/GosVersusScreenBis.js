import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import IconButton from "../components/IconButton";
import ConfettiCannon from "react-native-confetti-cannon";
import { Picker } from "@react-native-picker/picker";

export default function GosVersusScreenBis({ route, navigation }) {
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
      if (updated.length === 5) endGame(skater2Final);
    } else {
      const updated = skater2Letters + letter;
      setSkater2Letters(updated);
      if (updated.length === 5) endGame(skater1Final);
    }
  };

  const getNextLetter = (player) => {
    const word = "SKATE";
    return player === "skater1"
      ? word[skater1Letters.length]
      : word[skater2Letters.length];
  };

  const endGame = (winnerName) => {
    setWinner(winnerName);
    setIsGameOver(true);
  };

  const handleCloseModal = () => {
    setIsGameOver(false);
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
        {/* Affichage des joueurs */}
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
            <FontAwesome5 name="battle-net" size={45} color="#FF650C" />
          </View>

          <View style={styles.profile}>
            <Text style={styles.name}>{skater2Final}</Text>
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
              {skater1Final}: {skater1Score}
            </Text>
            <Text style={styles.score}>
              {skater2Final}: {skater2Score}
            </Text>
          </View>
        </Animatable.View>

        {/* Picker encapsulé */}
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
            <Picker.Item label="Ollie" value="Ollie" />
            <Picker.Item label="No Comply" value="No Comply" />
            <Picker.Item label="Revert" value="Revert" />
            <Picker.Item label="Caveman" value="Caveman" />
            <Picker.Item label="Acid Drop" value="Acid Drop" />
            <Picker.Item label="Body Varial" value="Body Varial" />
            <Picker.Item label="Footplant" value="Footplant" />
            <Picker.Item label="Firecracker" value="Firecracker" />
            <Picker.Item label="Pivot" value="Pivot" />
            <Picker.Item label="Boneless" value="Boneless" />
            <Picker.Item label="Shuvit" value="Shuvit" />
            <Picker.Item label="Pop Shuvit" value="Pop Shuvit" />
            <Picker.Item label="Manual" value="Manual" />
            <Picker.Item label="Nose Manual" value="Nose Manual" />
            <Picker.Item label="Kickflip" value="Kickflip" />
            <Picker.Item label="Heelflip" value="Heelflip" />
            <Picker.Item label="Frontside 180" value="Frontside 180" />
            <Picker.Item label="Backside 180" value="Backside 180" />
            <Picker.Item label="Railstand" value="Railstand" />
            <Picker.Item label="Boned Ollie" value="Boned Ollie" />
            <Picker.Item label="Nollie" value="Nollie" />
            <Picker.Item label="Fakie Ollie" value="Fakie Ollie" />
            <Picker.Item label="Switch Ollie" value="Switch Ollie" />
            <Picker.Item label="Wallride" value="Wallride" />
            <Picker.Item label="Wallie" value="Wallie" />
            <Picker.Item label="Powerslide" value="Powerslide" />
            <Picker.Item label="Slappy" value="Slappy" />
            <Picker.Item label="Varial Kickflip" value="Varial Kickflip" />
            <Picker.Item label="360 Flip" value="360 Flip" />
            <Picker.Item label="Hardflip" value="Hardflip" />
            <Picker.Item label="Impossible" value="Impossible" />
            <Picker.Item label="Frontside Flip" value="Frontside Flip" />
            <Picker.Item label="Backside Flip" value="Backside Flip" />
            <Picker.Item label="Bigspin" value="Bigspin" />
            <Picker.Item label="Casper Flip" value="Casper Flip" />
            <Picker.Item label="Darkslide" value="Darkslide" />
            <Picker.Item label="Primo Slide" value="Primo Slide" />
            <Picker.Item label="Tiger Claw" value="Tiger Claw" />
            <Picker.Item label="Underflip" value="Underflip" />
            <Picker.Item label="Hospital Flip" value="Hospital Flip" />
            <Picker.Item label="Double Kickflip" value="Double Kickflip" />
            <Picker.Item label="Triple Kickflip" value="Triple Kickflip" />
            <Picker.Item label="Laser Flip" value="Laser Flip" />
            <Picker.Item label="Gazelle Flip" value="Gazelle Flip" />
            <Picker.Item label="Blunt Slide" value="Blunt Slide" />
          </Picker>
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
                buttonText="Ouille !"
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
                buttonText="Ouille !"
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
              <ConfettiCannon
                count={80}
                origin={{ x: 150, y: 0 }}
                fadeOut={true}
              />
              <Animatable.Image
                animation="bounceIn"
                duration={1500}
                easing="ease-out"
                source={require("../assets/trophy.png")}
                style={styles.modalImage}
              />
              <Text style={styles.modalText}>Game over !</Text>
              <Text style={styles.modalText}>{winner} a gagné !</Text>
              <IconButton
                iconName="check-circle"
                buttonText="Retour au menu"
                onPress={handleCloseModal}
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>
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
