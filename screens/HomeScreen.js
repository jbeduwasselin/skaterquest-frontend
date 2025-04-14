import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function FriendScreen({ navigation }) {
  return (
    <View style={styles.container}>

<TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => navigation.navigate('AppSettingsScreen')}
      >
        <Icon name="settings" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Bienvenue les skaters !</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TricksScreen')}
        >
          <Text style={styles.buttonText}>Livre de tricks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VideoScreen')}
        >
          <Text style={styles.buttonText}>Mes vidéos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CrewScreen')}
        >
          <Text style={styles.buttonText}>Mon équipe</Text>
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
  settingsIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
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
