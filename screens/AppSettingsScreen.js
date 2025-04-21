import React, { useState /*, useEffect */ } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import BackgroundWrapper from "../components/background";
import IconButton from "../components/IconButton";
import Icon from "react-native-vector-icons/Feather";

// import AsyncStorage from "@react-native-async-storage/async-storage"; //Décommente pour activer la sauvegarde

export default function AppSettingsScreen({ navigation }) {
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false); // Modal Aides

  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleHelpPress = () => {
    setHelpModalVisible(true); // Affiche la modal d'aide
  };

  const handlePrivacySettingsPress = () => {
    setPrivacyModalVisible(true);
  };

  const handleLogout = () => {
    console.log("Déconnexion Pressed");
  };

  const handleUnsubscribe = () => {
    console.log("Désinscription Pressed");
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
