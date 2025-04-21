import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { tricksData } from "../data/trickList";

export default function ProgressBar({ label }) {
  const progress = useSelector(
    (state) => state.tricks.value.length / tricksData.length
  );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${Math.min(progress * 100, 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "80%",
  },
  label: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  barBackground: {
    height: 12,
    backgroundColor: "#555",
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
});
