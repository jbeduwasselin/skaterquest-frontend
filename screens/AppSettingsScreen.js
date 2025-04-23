import React, { useState /*, useEffect */ } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import IconButton from "../components/IconButton";
import Icon from "react-native-vector-icons/Feather";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

// import AsyncStorage from "@react-native-async-storage/async-storage"; // Décommente pour activer la sauvegarde

export default function AppSettingsScreen({ navigation }) {
  const dispatch = useDispatch(); // Hook Redux pour dispatcher des actions
  const user = useSelector((state) => state.user.value); // Récupère les infos de l'utilisateur

  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false); // Modal Aides
  const [isLogoutConfirmVisible, setLogoutConfirmVisible] = useState(false); // Modal Déconnexion
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false); // Modal Désinscription

  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleHelpPress = () => {
    setHelpModalVisible(true); // Affiche la modal d'aide
  };

  const handlePrivacySettingsPress = () => {
    setPrivacyModalVisible(true); // Affiche la modal de confidentialité
  };

  const handleLogout = () => {
    setLogoutConfirmVisible(true); // Affiche la confirmation avant déconnexion
  };

  const confirmLogout = () => {
    dispatch(logout()); // Action Redux de déconnexion
    setLogoutConfirmVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // Redirige vers LoginScreen après déconnexion
    });
  };

  const handleUnsubscribe = () => {
    setDeleteConfirmVisible(true); // Affiche la confirmation avant suppression de compte
  };

  const confirmUnsubscribe = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.60:3000/user/delete/${user.uID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        }
      );

      const text = await response.text(); // Récupère la réponse sous forme de texte
      console.log("Réponse brute:", text); // Affiche la réponse brute dans la console

      // Vérifie si la réponse est bien du JSON
      try {
        const data = JSON.parse(text); // Parse la réponse en JSON
        if (data.result) {
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } else {
          alert("Erreur lors de la suppression : " + data.reason);
        }
      } catch (jsonError) {
        console.error("Erreur de parsing JSON", jsonError);
        alert("La réponse du serveur n'est pas valide.");
      }
    } catch (error) {
      console.error("Suppression échouée", error);
      alert("Erreur réseau ou serveur.");
    }
  };

  // Décommenter pour activer la sauvegarde
  /*
  useEffect(() => {
    const loadPrivacySettings = async () => {
      try {
        const settings = await AsyncStorage.getItem("privacySettings");
        if (settings) {
          const parsed = JSON.parse(settings);
          setMarketingEnabled(parsed.marketingEnabled);
          setProfileVisibility(parsed.profileVisibility);
          setDataSharing(parsed.dataSharing);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres", error);
      }
    };
    loadPrivacySettings();
  }, []);
  */

  // Fonction de sauvegarde (commentée pour activer plus tard)
  /*
  const savePrivacySettings = async () => {
    try {
      const settings = {
        marketingEnabled,
        profileVisibility,
        dataSharing,
      };
      await AsyncStorage.setItem(
        "privacySettings",
        JSON.stringify(settings)
      );
      console.log("Paramètres de confidentialité enregistrés");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres", error);
    }
  };
  */

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Icon
          name="settings"
          size={48}
          color="#fff"
          style={styles.settingsIcon}
          onPress={() => console.log("Settings Pressed")}
        />

        <View style={styles.buttonContainer}>
          <IconButton
            iconName="help-circle"
            onPress={handleHelpPress}
            buttonText="Aides"
            style={styles.iconButton}
          />
          <IconButton
            iconName="shield"
            onPress={handlePrivacySettingsPress}
            buttonText="Paramètres de confidentialité"
            style={styles.iconButton}
          />
          <IconButton
            iconName="log-out"
            onPress={handleLogout}
            buttonText="Déconnexion"
            style={styles.iconButton}
          />
          <IconButton
            iconName="user-x"
            onPress={handleUnsubscribe}
            buttonText="Désinscription"
            style={styles.iconButton}
          />
        </View>

        {/* Modal de confidentialité */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPrivacyModalVisible}
          onRequestClose={() => setPrivacyModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Paramètres de confidentialité
              </Text>

              <View style={styles.preferenceRow}>
                <Text style={styles.preferenceLabel}>
                  Notifications marketing
                </Text>
                <Switch
                  value={marketingEnabled}
                  onValueChange={setMarketingEnabled}
                />
              </View>

              <View style={styles.preferenceRow}>
                <Text style={styles.preferenceLabel}>Profil visible</Text>
                <Switch
                  value={profileVisibility}
                  onValueChange={setProfileVisibility}
                />
              </View>

              <View style={styles.preferenceRow}>
                <Text style={styles.preferenceLabel}>Partage de données</Text>
                <Switch value={dataSharing} onValueChange={setDataSharing} />
              </View>

              {/* Bouton enregistrer (activable plus tard) */}
              {/* 
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: "#28a745", marginBottom: 10 }]}
                onPress={savePrivacySettings}
              >
                <Text style={styles.closeButtonText}>Enregistrer</Text>
              </TouchableOpacity>
              */}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setPrivacyModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Aides */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isHelpModalVisible}
          onRequestClose={() => setHelpModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Centre d’aide</Text>

              <Text style={styles.helpText}>
                Si tu veux approfondir tes connaissances en skate, améliorer tes
                tricks, contacte Clovis et David, ils te feront des tricks à la
                Webcam !
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setHelpModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de confirmation Déconnexion */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isLogoutConfirmVisible}
          onRequestClose={() => setLogoutConfirmVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirmation</Text>
              <Text style={{ textAlign: "center", marginBottom: 20 }}>
                Es-tu sûr de vouloir te déconnecter ?
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: "#6c757d" }]}
                  onPress={() => setLogoutConfirmVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: "#dc3545" }]}
                  onPress={confirmLogout}
                >
                  <Text style={styles.closeButtonText}>Se déconnecter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de confirmation Désinscription */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isDeleteConfirmVisible}
          onRequestClose={() => setDeleteConfirmVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Désinscription</Text>
              <Text style={{ textAlign: "center", marginBottom: 20 }}>
                Es-tu sûr de vouloir supprimer ton compte ? Cette action est
                irréversible.
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: "#6c757d" }]}
                  onPress={() => setDeleteConfirmVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: "#dc3545" }]}
                  onPress={confirmUnsubscribe}
                >
                  <Text style={styles.closeButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  buttonContainer: {
    width: "100%",
    gap: 30,
    alignItems: "center",
  },
  settingsIcon: {
    marginBottom: 30,
    marginTop: -80,
  },
  iconButton: {
    width: "80%",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  preferenceLabel: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
  },
});
