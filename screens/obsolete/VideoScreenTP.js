import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import BackgroundWrapper from "../components/background";

// Importation du composant IconButton
import IconButton from "../../components/IconButton";

export default function VideoScreen() {
  const [videos, setVideos] = useState([]);
  const [videoUri, setVideoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [spot, setSpot] = useState("");
  const [date, setDate] = useState("");

  // Fonction pour choisir une vidéo dans la galerie
  const pickVideo = async () => {
    // Demande l'accès à la galerie de médias
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission requise", "L'accès à la galerie est nécessaire.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // Utilisation de MediaTypeOptions.Videos car MediaType ne fonctionne pas encore correctement sur certains appareils
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri); // Récupère l'URI de la vidéo sélectionnée
    }
  };

  // Fonction pour ajouter une vidéo
  const handleAddVideo = async () => {
    if (!videoUri || !title || !spot || !date) {
      Alert.alert("Champs manquants", "Remplis tous les champs.");
      return;
    }

    // Crée un objet vidéo avec les informations nécessaires
    const newVideo = {
      id: Date.now().toString(),
      uri: videoUri,
      title,
      spot,
      date,
    };

    const updatedVideos = [newVideo, ...videos]; // Ajoute la nouvelle vidéo à la liste existante
    setVideos(updatedVideos); // Met à jour la liste des vidéos

    // Réinitialise les champs après ajout de la vidéo
    setVideoUri(null);
    setTitle("");
    setSpot("");
    setDate("");

    // Sauvegarder la vidéo dans un stockage local ou dans une base de données ici
    // Exemple de sauvegarde :
    // await saveVideoToStorage(newVideo);  // À implémenter pour sauvegarder la vidéo dans le stockage local ou sur un serveur

    /*
     * Stockage persistant :
     *
     * 1. **AsyncStorage** (Stockage local simple) :
     *    - C'est un moyen simple et rapide de stocker des données localement sur l'appareil de l'utilisateur.
     *    - Exemple :
     *    import AsyncStorage from '@react-native-async-storage/async-storage';
     *
     *    // Sauvegarder les vidéos dans AsyncStorage :
     *    await AsyncStorage.setItem('videos', JSON.stringify(updatedVideos));
     *
     *    // Récupérer les vidéos depuis AsyncStorage :
     *    const savedVideos = await AsyncStorage.getItem('videos');
     *    if (savedVideos) {
     *      setVideos(JSON.parse(savedVideos));
     *    }
     *
     *    // Si AsyncStorage est vide, initialise les vidéos avec une valeur par défaut :
     *    if (!savedVideos) {
     *      setVideos([]);
     *    }
     *
     * 2. **Backend distant (API)** :
     *    - Sauvegarder les vidéos sur un serveur distant pour les récupérer plus tard ou les partager.
     *    - Exemple avec fetch (envoi des données à un backend) :
     *
     *    await fetch('https://monapi.com/videos', {
     *      method: 'POST',
     *      headers: {
     *        'Content-Type': 'application/json',
     *      },
     *      body: JSON.stringify(newVideo), // Envoie l'objet vidéo au serveur
     *    });
     *
     *    // Exemple de récupération des vidéos depuis un backend :
     *    const response = await fetch('https://monapi.com/videos');
     *    const videosFromAPI = await response.json();
     *    setVideos(videosFromAPI);
     *
     * Ces solutions sont à implémenter en fonction de nos besoins spécifiques. Ne pas oublier de tester et de configurer chaque méthode de sauvegarde.
     */
  };

  // Fonction pour supprimer une vidéo
  const handleDeleteVideo = (id) => {
    const filteredVideos = videos.filter((video) => video.id !== id);
    setVideos(filteredVideos);
    // Optionnellement, sauvegarder les vidéos restantes dans le stockage persistant après suppression
    // await saveVideoToStorage(filteredVideos);
  };

  // Fonction pour afficher chaque vidéo dans la liste
  const renderItem = ({ item }) => (
    <View style={styles.videoItem}>
      <Video
        source={{ uri: item.uri }}
        style={styles.thumbnail}
        useNativeControls
        resizeMode="cover"
        isLooping
      />
      <View style={styles.info}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoText}>📍 {item.spot}</Text>
        <Text style={styles.videoText}>🕒 {item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteVideo(item.id)}
      >
        <Text style={styles.deleteText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Mes vidéos</Text>

        {/* Remplacement du bouton "Choisir une vidéo" par IconButton */}
        <IconButton
          onPress={pickVideo}
          iconName="video"
          buttonText="Choisir une vidéo"
          size={36}
          iconColor="#fff"
          style={styles.iconButton}
        />

        {/* Si une vidéo est sélectionnée, afficher la prévisualisation et les champs */}
        {videoUri && (
          <>
            <Video
              source={{ uri: videoUri }}
              style={styles.preview}
              useNativeControls
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              placeholder="Titre"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Spot"
              placeholderTextColor="#999"
              value={spot}
              onChangeText={setSpot}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (ex: 2025-04-18)"
              placeholderTextColor="#999"
              value={date}
              onChangeText={setDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddVideo}>
              <Text style={styles.buttonText}>Ajouter la vidéo</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Liste des vidéos ajoutées */}
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      </View>
    </BackgroundWrapper>
  );
}

// Styles pour la page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  iconButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  preview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  videoItem: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  thumbnail: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  info: {
    marginTop: 10,
  },
  videoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  videoText: {
    color: "#ccc",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
