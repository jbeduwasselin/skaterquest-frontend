import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CrewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres de l'appli mon gars !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});