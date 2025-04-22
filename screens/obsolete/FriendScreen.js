import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import BackgroundWrapper from "../../components/background";
import IconButton from "../../components/IconButton"; // Assure-toi du bon chemin

export default function FriendScreen({ navigation }) {
  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Liste d'amis</Text>

        {/* Champ de recherche */}
        <TextInput
          placeholder="Entre son SkaterTag ou email"
          placeholderTextColor="#ccc"
          style={styles.input}
        />

        {/* Bouton d'ajout avec icône */}
        <IconButton
          iconName="user-plus"
          buttonText="Ajouter"
          iconSize={24}
          style={styles.iconButton}
          onPress={() => alert("Ami ajouté (soon™)")}
        />
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  iconButton: {
    width: "100%", // Prend toute la largeur
    height: 60, // Tu peux ajuster la hauteur ici
  },
});
