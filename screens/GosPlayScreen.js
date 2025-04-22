import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";

import BackgroundWrapper from "../components/background";
import IconButton from "../components/IconButton";
import * as Animatable from "react-native-animatable";

export default function GosPlayScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [skater1, setSkater1] = useState("");
  const [skater2, setSkater2] = useState("");

  // Fonction pour démarrer le jeu
  const startGame = () => {
    if (skater1 && skater2) {
      setModalVisible(false);
    }
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* MODAL DE CONFIGURATION */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Entrez les SkaterTags !</Text>

              <TextInput
                placeholder="SkaterTag Joueur 1"
                placeholderTextColor="#aaa"
                style={styles.input}
                onChangeText={setSkater1}
                value={skater1}
                maxLength={8}
              />
              <TextInput
                placeholder="SkaterTag Joueur 2"
                placeholderTextColor="#aaa"
                style={styles.input}
                onChangeText={setSkater2}
                value={skater2}
                maxLength={8}
              />

              <TouchableOpacity
                style={styles.validateButton}
                onPress={startGame}
              >
                <Text style={styles.validateText}>Valider</Text>
              </TouchableOpacity>

              {/* Bouton Retour pour fermer la modal */}
              <TouchableOpacity style={styles.backButton} onPress={closeModal}>
                <Text style={styles.backText}>Retour</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* TITRE */}
        <Animatable.View
          animation="fadeInDown"
          duration={1200}
          style={styles.gameTitleContainer}
        >
          <Text style={styles.gameTitle}>GAME OF SKATE</Text>
        </Animatable.View>

        {/* INFOS SKATERS */}
        <View style={styles.profileContainer}>
          <Animatable.View
            animation="fadeInLeft"
            duration={1000}
            style={styles.profile}
          >
            <Text style={styles.name}>{skater1 || "Joueur 1"}</Text>
          </Animatable.View>

          <Animatable.View
            animation="zoomIn"
            duration={800}
            style={styles.versusIconContainer}
          >
            <Text style={styles.versus}>VS</Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInRight"
            duration={1000}
            style={styles.profile}
          >
            <Text style={styles.name}>{skater2 || "Joueur 2"}</Text>
          </Animatable.View>
        </View>

        {/* BOUTONS POUR DÉMARRER LE JEU */}
        <Animatable.View
          animation="zoomIn"
          duration={1200}
          style={styles.buttonContainer}
        >
          {/* Bouton "Tricks aléatoires" */}
          <IconButton
            iconName="shuffle"
            buttonText="Tricks aléatoires"
            onPress={() =>
              navigation.navigate("GosVersusScreen", {
                skater1,
                skater2,
                gameMode: "Random",
              })
            }
            style={styles.gameButton}
          />

          {/* Bouton "Choix des tricks" */}
          <IconButton
            iconName="list"
            buttonText="Choix des tricks"
            onPress={() =>
              navigation.navigate("GosVersusScreenBis", {
                skater1,
                skater2,
                gameMode: "Choix",
              })
            }
            style={styles.gameButton}
          />
        </Animatable.View>

        {/* Nouveau bouton "Joueurs" */}
        <IconButton
          iconName="repeat"
          buttonText="Joueurs"
          onPress={() => setModalVisible(true)}
          style={styles.reconfigButton}
        />
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  gameTitleContainer: {
    marginBottom: 30,
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
  profileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  profile: {
    flex: 1,
    alignItems: "center",
    maxWidth: 150,
  },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 25,
    textTransform: "uppercase",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  versusIconContainer: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  versus: {
    fontSize: 36,
    color: "#FF650C",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 30,
  },
  gameButton: {
    marginBottom: 20,
    width: 250,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  validateButton: {
    backgroundColor: "#FF650C",
    padding: 12,
    borderRadius: 10,
  },
  validateText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  reconfigButton: {
    marginTop: 50,
    backgroundColor: "#444",
  },
  backButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
