import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ModalContent from "../components/ModalContent";
import globalStyle, { COLOR_BACK } from "../globalStyle";
import { IconTextButton, TextButton } from "../components/Buttons";

const { width, height } = Dimensions.get("window");

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              style={[globalStyle.textInput, styles.input]}
              onChangeText={setSkater1}
              value={skater1}
              maxLength={8}
            />
            <TextInput
              placeholder="SkaterTag Joueur 2"
              placeholderTextColor="white"
              style={[globalStyle.textInput, styles.input]}
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
              style={[styles.gameButton, { width: width * 0.7 }]}
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
              style={[styles.gameButton, { width: width * 0.7 }]}
            />

            {/* Bouton "Joueurs" */}
            <IconTextButton
              iconName="repeat"
              text="Joueurs"
              onPress={() => setModalVisible(true)}
              style={[styles.reconfigButton, { width: width * 0.6 }]}
            />
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  gameTitleContainer: {
    marginTop: 100,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  gameTitle: {
    fontSize: Math.min(width * 0.1, 60),
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
    paddingHorizontal: 10,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    maxWidth: 160,
  },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22,
    textTransform: "uppercase",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textAlign: "center",
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
    alignItems: "center",
  },
  gameButton: {
    marginBottom: 20,
  },
  reconfigButton: {
    marginTop: 30,
    backgroundColor: "#444",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    borderRadius: 16,
    width: "70%",
    maxWidth: 400,
    alignSelf: "center",
  },
  
  
  modalTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    maxWidth: 400,
    width: "90%",
    alignSelf: "center",
  },
});
