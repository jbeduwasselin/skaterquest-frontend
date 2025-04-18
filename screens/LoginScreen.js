import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { FontAwesome } from "@expo/vector-icons";
import { signInRequest, signUpRequest } from "../lib/request";
import IconButton from "../components/IconButton"; // ✅ Ajout de l'import

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInEmail, setSignInEmail] = useState("text0@test.test");
  const [signInPassword, setSignInPassword] = useState("test");

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [showTuto1, setShowTuto1] = useState(false);
  const [showTuto2, setShowTuto2] = useState(false);
  const [showTuto3, setShowTuto3] = useState(false);

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

  const handleSignIn = async () => {
    const { result, data } = await signInRequest(signInEmail, signInPassword);
    if (result) {
      console.log("Connection OK : ", data);
      dispatch(login(data));
      navigation.navigate("TabNavigator");
    } else {
      console.log("Connection error : ", data);
      setErrorMessage("Erreur !");
    }
  };

  const handleSignUp = () => {
    signUpRequest(signUpUsername, signUpEmail, signUpPassword).then(
      ({ result, data }) => {
        if (result) {
          console.log("Inscription OK : ", data);
          dispatch(login(data));
          setShowSignUpModal(false);
          setShowTuto1(true);
        } else {
          console.log("Inscription error : ", data);
          setErrorMessage("Erreur !");
        }
      }
    );
  };

  const signInModalContent = (
    <View style={styles.signInContainer}>
      <TouchableOpacity
        onPress={emptyStates}
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
        onChangeText={setSignInEmail}
        value={signInEmail}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Ton mot de passe"
        placeholderTextColor="white"
        onChangeText={setSignInPassword}
        value={signInPassword}
      />
      <TouchableOpacity
        onPress={handleSignIn}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Valider</Text>
      </TouchableOpacity>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );

  const signUpModalContent = (
    <View style={styles.signUpContainer}>
      <TouchableOpacity
        onPress={emptyStates}
        style={styles.closeButton}
        activeOpacity={0.8}
      >
        <FontAwesome name={"close"} color="black" size={16} />
      </TouchableOpacity>
      <Text style={styles.modalText}>Inscription</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Ton SkateurTag"
        placeholderTextColor="white"
        onChangeText={setSignUpUsername}
        value={signUpUsername}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Ton adresse mail"
        placeholderTextColor="white"
        onChangeText={setSignUpEmail}
        value={signUpEmail}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Ton mot de passe"
        placeholderTextColor="white"
        onChangeText={setSignUpPassword}
        value={signUpPassword}
      />
      <TouchableOpacity
        onPress={handleSignUp}
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
      source={require("../assets/brique.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require("../assets/LOGO TEMPORAIRE.png")}
          style={styles.logo}
        />

        {!showSignInModal ? (
          <IconButton
            iconName="log-in"
            buttonText="Connexion"
            onPress={() => {
              setShowSignUpModal(false);
              setShowSignInModal(true);
            }}
            style={{ width: 200,marginTop: 20 }}
          />
        ) : (
          signInModalContent
        )}

        {!showSignUpModal ? (
          <IconButton
            iconName="user-plus"
            buttonText="T'es nouveau ? Créer un compte ici !"
            onPress={() => {
              setShowSignInModal(false);
              setShowSignUpModal(true);
            }}
            style={{ width: 250,marginTop: 20 }}
          />
        ) : (
          signUpModalContent
        )}
      </View>

      {(showTuto1 || showTuto2 || showTuto3) && (
        <View style={styles.overlayBackground}></View>
      )}

      {showTuto1 && (
        <View style={styles.tutoModal}>
          <Text style={styles.tutoTitle}>
            Bienvenue sur l'app SkaterQuest ! 🛹
          </Text>
          <Text style={styles.tutoText}>
            Ici, tu pourras suivre ta progression en skate grâce à un livre de
            tricks, trouver des spots et défier tes potes sur un Game of Skate !
          </Text>

          <View style={styles.tutoButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(true);
              }}
            >
              <Text style={styles.textButton}>Suivant</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "grey" }]}
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(false);
                navigation.navigate("TabNavigator");
              }}
            >
              <Text style={styles.textButton}>Passer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showTuto2 && (
        <View style={styles.tutoModal}>
          <Text style={styles.tutoTitle}>Un Game of Skate c'est quoi ?🤔</Text>
          <Text style={styles.tutoText}>
            Un skateur fait un trick, l'autre doit le reproduire : à chaque
            échec, il gagne une lettre du mot SKATE jusqu'à être éliminé. 🛹🔥
          </Text>

          <View style={styles.tutoButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowTuto2(false);
                setShowTuto3(true);
              }}
            >
              <Text style={styles.textButton}>Suivant</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "grey" }]}
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(false);
                setShowTuto3(false);
                navigation.navigate("TabNavigator");
              }}
            >
              <Text style={styles.textButton}>Passer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showTuto3 && (
        <View style={styles.tutoModal}>
          <Text style={styles.tutoTitle}>T'es prêt à rider ? 🛹😎</Text>
          <Text style={styles.tutoText}>
            Tu trouveras dans ton livre des tricks les tricks que tu maîtrises
            et ceux que tu vas devoir apprendre pour atteindre le 100% !
          </Text>
          <Text style={styles.tutoTitle}>T'es chaud patate ? 🛹💪</Text>
          <View style={styles.tutoButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(false);
                setShowTuto3(false);
                navigation.navigate("TabNavigator");
              }}
            >
              <Text style={styles.textButton}>C'est parti ! 🤙🛹</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  button: {
    alignItems: "center",
    padding: 12,
    width: "50%",
    marginTop: 40,
    backgroundColor: "#FF650C",
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
  overlayBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(51, 49, 49, 0.7)",
    zIndex: 999,
  },
  tutoModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -180 }, { translateY: -150 }],
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    zIndex: 1000,
    width: "90%",
  },
  tutoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  tutoText: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  tutoButtons: {
    flexDirection: "row",
    gap: 10,
  },
});
