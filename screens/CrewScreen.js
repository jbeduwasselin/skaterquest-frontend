import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackgroundWrapper from "../components/background";

export default function CrewScreen() {
  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue dans mon équipe !</Text>
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
    color: "#fff",
  },
});
