import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ModalContent from "../components/ModalContent";
import globalStyle, { COLOR_BACK } from "../globalStyle";
import { IconTextButton, TextButton } from "../components/Buttons";

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

  return (
    <BackgroundWrapper flexJustify="space-between">
      {/* MODAL DE CONFIGURATION */}
      <ModalContent
        visibleState={modalVisible}
        closeHandler={() => setModalVisible(false)}
        containerStyle={globalStyle.modalContainer}
      >
        <Text style={styles.modalTitle}>Entrez les SkaterTags !</Text>

        <TextInput
          placeholder="SkaterTag Joueur 1"
          placeholderTextColor="white"
          style={globalStyle.textInput}
          onChangeText={setSkater1}
          value={skater1}
          maxLength={8}
        />
        <TextInput
          placeholder="SkaterTag Joueur 2"
          placeholderTextColor="white"
          style={globalStyle.textInput}
          onChangeText={setSkater2}
          value={skater2}
          maxLength={8}
        />
        <View style={globalStyle.flexRow}>
          <TextButton
            text="Retour"
            onPress={() => {
              skater1 && skater2
                ? setModalVisible(false)
                : navigation.navigate("Home");
            }}
            containerStyle={{ backgroundColor: COLOR_BACK }}
          />
          <TextButton text="Valider" onPress={startGame} />
        </View>
      </ModalContent>

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
        <IconTextButton
          iconName="shuffle"
          text="Tricks aléatoires"
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
        <IconTextButton
          iconName="list"
          text="Choix des tricks"
          onPress={() =>
            navigation.navigate("GosVersusScreenBis", {
              skater1,
              skater2,
              gameMode: "Choix",
            })
          }
          style={styles.gameButton}
        />

        {/* Bouton "Joueurs" */}
        <IconTextButton
          iconName="repeat"
          text="Joueurs"
          onPress={() => setModalVisible(true)}
          style={styles.reconfigButton}
        />
      </Animatable.View>
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
    marginBottom: 50,
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
