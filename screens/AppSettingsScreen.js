import React, { useState /*, useEffect */ } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Icon from "react-native-vector-icons/MaterialIcons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { Button } from "../components/Buttons";
import ModalContent from "../components/ModalContent";
import globalStyle, { COLOR_CANCEL } from "../globalStyle";
import { deleteAccountRequest } from "../lib/request";

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
    const { result } = await deleteAccountRequest(token);
    if (!result) return;
    dispatch(logout());
    navigation.navigate("LoginScreen");
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
    <BackgroundWrapper flexJustify="space-evenly">
      <Icon
        name="settings"
        size={48}
        color="black"
        onPress={() => navigation.goBack()}
      />

      <Button iconName="info" onPress={handleHelpPress} text="Aides" iconLeft />
      <Button
        iconName="privacy-tip"
        onPress={handlePrivacySettingsPress}
        text="Paramètres de confidentialité"
        iconLeft
      />
      <Button
        iconName="directions-walk"
        onPress={handleLogout}
        text="Déconnexion"
        iconLeft
      />
      <Button
        iconName="person-off"
        onPress={handleUnsubscribe}
        text="Désinscription"
        iconLeft
      />

      <ModalContent
        visibleState={isPrivacyModalVisible}
        closeHandler={() => setPrivacyModalVisible(false)}
        containerStyle={globalStyle.modalContainer}
      >
        <Text style={styles.modalTitle}>Paramètres de confidentialité</Text>
        <View style={styles.row}>
          <Text style={styles.modalText}>Notifications marketing</Text>
          <Switch
            value={marketingEnabled}
            onValueChange={setMarketingEnabled}
          />
        </View>

        <View style={styles.row}>
          <Text style={{ ...styles.modalText, textAlign: "left" }}>
            Profil visible
          </Text>
          <Switch
            value={profileVisibility}
            onValueChange={setProfileVisibility}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.modalText}>Partage de données</Text>
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

        <Button text="Fermer" onPress={() => setPrivacyModalVisible(false)} />
      </ModalContent>

      {/* Modal Aides */}
      <ModalContent
        visibleState={isHelpModalVisible}
        closeHandler={() => setHelpModalVisible(false)}
        containerStyle={globalStyle.modalContainer}
      >
        <Text style={styles.modalTitle}>Centre d’aide</Text>
        <Text style={styles.modalText}>
          Si tu veux approfondir tes connaissances en skate, améliorer tes
          tricks, contacte Clovis et David, ils te feront des tricks à la
          Webcam!
        </Text>
        <Button text="Fermer" onPress={() => setHelpModalVisible(false)} />
      </ModalContent>

      {/* Modal de confirmation Déconnexion */}
      <ModalContent
        visibleState={isLogoutConfirmVisible}
        closeHandler={() => setLogoutConfirmVisible(false)}
        containerStyle={globalStyle.modalContainer}
      >
        <Text style={styles.modalTitle}>Confirmation</Text>
        <Text style={styles.modalText}>
          Es-tu sûr de vouloir te déconnecter ?
        </Text>
        <View style={styles.row}>
          <Button
            text="Annuler"
            onPress={() => setLogoutConfirmVisible(false)}
          />

          <Button
            text="Se déconnecter"
            onPress={confirmLogout}
            containerStyle={styles.modalButtonCancel}
          />
        </View>
      </ModalContent>

      {/* Modal de confirmation Désinscription */}
      <ModalContent
        visibleState={isDeleteConfirmVisible}
        closeHandler={() => setDeleteConfirmVisible(false)}
        containerStyle={globalStyle.modalContainer}
      >
        <Text style={styles.modalTitle}>Désinscription</Text>
        <Text style={styles.modalText}>
          Es-tu sûr de vouloir supprimer ton compte ? Cette action est
          irréversible.
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            onPress={() => setDeleteConfirmVisible(false)}
            text="Annuler"
          />

          <Button
            onPress={confirmUnsubscribe}
            text="Se désinscrire"
            containerStyle={styles.modalButtonCancel}
          />
        </View>
      </ModalContent>
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
  modalTitle: {
    ...globalStyle.subSubTitle,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  modalText: {
    color: "white",
    fontWeight: "bold",
    wordBreak: "break-word",
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 20,
  },
  modalButtonCancel: {
    backgroundColor: COLOR_CANCEL,
  },
  row: {
    ...globalStyle.flexRow,
    width: "100%",
    justifyContent: "space-between",
  },
});
