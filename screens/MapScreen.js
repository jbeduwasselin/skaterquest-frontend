import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dur la map !</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Voir les tricks"
          onPress={() => navigation.navigate('Tricks')}
        />
        <Button
          title="Explorer les spots"
          onPress={() => navigation.navigate('Spots')}
        />
      </View>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
});