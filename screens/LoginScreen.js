import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { signInRequest, signUpRequest } from "../lib/request";
import { IconButton, IconTextButton, TextButton } from "../components/Buttons";
import globalStyle, { COLOR_BACK, COLOR_MAIN } from "../globalStyle";

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
      <IconButton
        onPress={emptyStates}
        iconName="cancel"
        color="white"
        size={30}
        containerStyle={styles.closeButton}
      />
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
      <TextButton
        onPress={handleSignIn}
        style={styles.button}
        activeOpacity={0.8}
        text="Se connecter"
        textStyle={styles.buttonText}
        containerStyle={styles.button}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );

  const signUpModalContent = (
    <View style={styles.signUpContainer}>
      <IconButton
        onPress={emptyStates}
        iconName="cancel"
        color="white"
        size={30}
        containerStyle={styles.closeButton}
      />
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
      <TextButton
        onPress={handleSignUp}
        style={styles.button}
        activeOpacity={0.8}
        text="Valider l'inscription"
        containerStyle={styles.button}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
  return (
    <ImageBackground
      source={require("../assets/Autre fond.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require("../assets/LOGO TEMPORAIRE.png")}
          style={styles.logo}
        />

        {!showSignInModal ? (
          <IconTextButton
            iconName="login"
            text="Connexion"
            size={30}
            onPress={() => {
              setShowSignUpModal(false);
              setShowSignInModal(true);
            }}
            containerStyle={styles.button}
          />
        ) : (
          signInModalContent
        )}

        {!showSignUpModal ? (
          <IconTextButton
            iconName="person-add"
            text="T'es nouveau ? Créer un compte ici !"
            size={30}
            containerStyle={styles.button}
            onPress={() => {
              setShowSignInModal(false);
              setShowSignUpModal(true);
            }}
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
            <NextButton
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(true);
              }}
            />
            <SkipButton
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(false);
                navigation.navigate("TabNavigator");
              }}
            />
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
            <NextButton
              onPress={() => {
                setShowTuto2(false);
                setShowTuto3(true);
              }}
            />
            <SkipButton
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(false);
                setShowTuto3(false);
                navigation.navigate("TabNavigator");
              }}
            />
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
            <TextButton
              onPress={() => {
                setShowTuto1(false);
                setShowTuto2(false);
                setShowTuto3(false);
                navigation.navigate("TabNavigator");
              }}
              containerStyle={styles.button}
              text="C'est parti ! 🤙🛹"
            />
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const NextButton = ({ onPress }) => (
  <TextButton
    text="Suivant"
    containerStyle={styles.button}
    onPress={onPress}
  />
);

const SkipButton = ({ onPress }) => (
  <TextButton
    text="Passer"
    containerStyle={{ ...styles.button, backgroundColor: COLOR_BACK }}
    onPress={onPress}
  />
);

const styles = StyleSheet.create({
  button: {
    minWidth: 200,
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
    backgroundColor : "transparent",
  },
  inputs: {
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    color: "white",
    placeholderTextColor: "white",
    marginBottom : 5,
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
    ...globalStyle.subTitle,
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
