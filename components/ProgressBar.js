import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar({ progress, label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barBackground}>
        <View
          style={[styles.barFill, { width: `${Math.min(progress * 100, 100)}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
