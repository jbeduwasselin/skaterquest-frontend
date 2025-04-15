import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { FontAwesome } from "@expo/vector-icons";
import { signInRequest, signUpRequest } from "../lib/request";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  // Initialisation des états liés à la connexion
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Initialisation des états liés à l'inscription
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // Fonction pour réinitialiser les états
  const emptyStates = () => {
    setShowSignInModal(false);
    setErrorMessage("");
    setSignInEmail("");
    setSignInPassword("");
    setShowSignUpModal(false);
    setSignUpUsername("");
    setSignUpEmail("");
    setSignUpPassword("");
  };

  // Fonction de connexion
  const handleSignIn = () => {
    signInRequest(signInEmail, signInPassword)
      .then((res) => res.json())
      //.then(console.log)
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInEmail, token: data.token })); // Enregistrement des données de l'utilisateur dans le store Redux
          emptyStates(); // Réinitialisation des états
          navigation.navigate("TabNavigator"); // Redirection vers l'écran d'accueil
        } else {
          setErrorMessage("Erreur !");
        }
      });
  };

  // Fonction d'inscription
  const handleSignUp = () => {
    signUpRequest(signUpUsername, signUpEmail, signUpPassword).then((data) => {
      if (data.result) {
        console.log("ok : ", data);
        dispatch(login({ username: signUpUsername, token: data.token })); // Enregistrement des données de l'utilisateur dans le store Redux
        emptyStates(); // Réinitialisation des états
        navigation.navigate("TabNavigator"); // Redirection vers l'écran d'accueil
      } else {
        console.log("error : ", data);
        setErrorMessage("Erreur !");
      }
    });
  };

  // Fenêtre modale de connexion
  const signInModalContent = (
    <View style={styles.signInContainer}>
      <TouchableOpacity
        onPress={() => {
          emptyStates(); // Réinitialisation des états
        }}
        style={styles.closeButton}
        activeOpacity={0.8}
      >
        <FontAwesome name={"close"} />
      </TouchableOpacity>
      <Text>connexion</Text>
      <TextInput
        styles={styles.inputs}
        placeholder="Ton adresse mail"
        onChangeText={(value) => setSignInEmail(value)}
        value={signInEmail}
      />
      <TextInput
        styles={styles.inputs}
        placeholder="Ton mot de passe"
        onChangeText={(value) => setSignInPassword(value)}
        value={signInPassword}
      />
      <TouchableOpacity
        onPress={() => handleSignIn()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Valider</Text>
      </TouchableOpacity>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );

  // Fenêtre modale d'inscription
  const signUpModalContent = (
    <View style={styles.signUpContainer}>
      <TouchableOpacity
        onPress={() => {
          emptyStates(); // Réinitialisation des états
        }}
        style={styles.closeButton}
        activeOpacity={0.8}
      >
        <FontAwesome name={"close"} />
      </TouchableOpacity>
      <Text>Inscription</Text>
      <TextInput
        styles={styles.inputs}
        placeholder="Ton pseudo"
        onChangeText={(value) => setSignUpUsername(value)}
        value={signUpUsername}
      />
      <TextInput
        styles={styles.inputs}
        placeholder="Ton adresse mail"
        onChangeText={(value) => setSignUpEmail(value)}
        value={signUpEmail}
      />
      <TextInput
        styles={styles.inputs}
        placeholder="Ton mot de passe"
        onChangeText={(value) => setSignUpPassword(value)}
        value={signUpPassword}
      />
      <TouchableOpacity
        onPress={() => handleSignUp()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Valider l'inscription !</Text>
      </TouchableOpacity>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SKATER QUEST</Text>

      {!showSignInModal ? (
        <TouchableOpacity
          onPress={() => {
            setShowSignUpModal(false);
            setShowSignInModal(true);
          }}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Connexion</Text>
        </TouchableOpacity>
      ) : (
        signInModalContent
      )}

      {!showSignUpModal ? (
        <TouchableOpacity
          onPress={() => {
            setShowSignInModal(false);
            setShowSignUpModal(true);
          }}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>
            T'es nouveau ? Crée un compte ici !
          </Text>
        </TouchableOpacity>
      ) : (
        signUpModalContent
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 1,
    paddingTop: 100,
  },
  title: {},
  button: {
    alignItems: "center",
    padding: 8,
    width: "50%",
    marginTop: 100,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  signUpContainer: {
    alignItems: "center",
    padding: 5,
    margin: 10,
    width: "70%",
    height: "50%",
    backgroundColor: "yellow",
  },
  signInContainer: {
    alignItems: "center",
    padding: 5,
    margin: 10,
    width: "70%",
    height: "50%",
    backgroundColor: "green",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
    backgroundColor: "orange",
    borderRadius: "100%",
  },
  inputs: {},
  errorMessage: {
    color: "red",
  },
});
