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
import { ImageBackground } from "react-native";
import { Image } from "react-native";

/*
Blabla Baptiste :

    POUR LE DEV :  j'ai mit l'utilisateur par default en dur dans le useState
    (j'en avait marre de me connecter tout le temps)

    PLUS TARD :  ajouter une méchanique qui checke si un token est déja présent
    (via le store persistant, teste sa validité via extendTokenRequest et le met à jours)
    puis skip le connextion screen si tout se passe bien
                aussi il faudra faire en sorte que le chemin signUp => connection
    fait naviguer vers le tuto screen 
*/

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  // Initialisation des états liés à la connexion
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInEmail, setSignInEmail] = useState("text0@test.test");
  const [signInPassword, setSignInPassword] = useState("test");

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
  const handleSignIn = async () => {
    const { result, data } = await signInRequest(signInEmail, signInPassword); // Requête vers le back gérée par le module signInRequest()
    if (result) {
      console.log("Connection OK : ", data);
      dispatch(login(data)); // Enregistrement des données de l'utilisateur dans le store Redux
      navigation.navigate("TabNavigator"); // Redirection vers l'écran d'accueil
    } else {
      console.log("Connection error : ", data);
      setErrorMessage("Erreur !");
    }
  };

  // Fonction d'inscription
  const handleSignUp = () => {
    signUpRequest(signUpUsername, signUpEmail, signUpPassword).then(
      ({ result, data }) => {
        if (result) {
          console.log("Inscription OK : ", data);
          dispatch(login(data)); // Enregistrement des données de l'utilisateur dans le store Redux
          navigation.navigate("TabNavigator"); // Redirection vers l'écran d'accueil
        } else {
          console.log("Inscription error : ", data);
          setErrorMessage("Erreur !");
        }
      }
    );
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
        <FontAwesome name={"close"} color="black" size={16} />
      </TouchableOpacity>
      <Text style={styles.modalText}>Connexion</Text>

      <TextInput
        style={styles.inputs}
        placeholder="Ton adresse mail"
        placeholderTextColor="white"
        onChangeText={(value) => setSignInEmail(value)}
        value={signInEmail}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Ton mot de passe"
        placeholderTextColor="white"
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
        <FontAwesome name={"close"} color="black" size={16} />
      </TouchableOpacity>
      <Text style={styles.modalText}>Inscription</Text>

      <TextInput
        style={styles.inputs}
        placeholder="Ton pseudo"
        placeholderTextColor="white"
        onChangeText={(value) => setSignUpUsername(value)}
        value={signUpUsername}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Ton adresse mail"
        placeholderTextColor="white"
        onChangeText={(value) => setSignUpEmail(value)}
        value={signUpEmail}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Ton mot de passe"
        placeholderTextColor="white"
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
    <ImageBackground
      source={require("../assets/brique.jpg")} // remplace avec ton image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require("../assets/LOGO TEMPORAIRE.png")}
          style={styles.logo}
        />

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
    </ImageBackground>
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
    padding: 12,
    width: "50%",
    marginTop: 40,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  signUpContainer: {
    alignItems: "center",
    padding: 5,
    margin: 10,
    marginTop: -300,
    width: "60%",
    height: "70%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 2,
  },
  signInContainer: {
    alignItems: "center",
    padding: 5,
    margin: 10,
    marginTop: -300,
    width: "60%",
    height: "70%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 2,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
    /*backgroundColor: "orange",*/
    /*borderRadius: "100%",*/
  },
  inputs: {
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    color: "white",
    placeholderTextColor: "white",
  },
  errorMessage: {
    color: "red",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "rgba(114, 111, 111, 0.4)",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  modalText: {
    color: "white",
  },
});
