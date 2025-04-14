import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FriendScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu veux ajouter un ami ?</Text>

      <View style={styles.buttonContainer}>
        {/* Remplacement des Buttons par TouchableOpacity */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tricks')}
        >
          <Text style={styles.buttonText}>Voir les tricks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Spots')}
        >
          <Text style={styles.buttonText}>Explorer les spots</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
