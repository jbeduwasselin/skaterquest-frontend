import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function SpotScreen({ navigation }) {
  return (
    <View>
      <Text style={styles.bidontext}>(°_°') va falloir remplir tout ça !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bidontext: {
    margin: 120,
    color: "red",
    fontSize: 20,
  }
});
