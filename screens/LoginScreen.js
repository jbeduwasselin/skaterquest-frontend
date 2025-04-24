import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { signInRequest, signUpRequest } from "../lib/request";
import { IconButton, IconTextButton, TextButton } from "../components/Buttons";
import globalStyle, { COLOR_BACK } from "../globalStyle";
import ModalContent from "../components/ModalContent";

const { width, height } = Dimensions.get("window");

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
      dispatch(login(data));
      navigation.navigate("TabNavigator");
    } else {
      setErrorMessage("Erreur !");
    }
  };

  const handleSignUp = () => {
    signUpRequest(signUpUsername, signUpEmail, signUpPassword).then(
      ({ result, data }) => {
        if (result) {
          dispatch(login(data));
          setShowSignUpModal(false);
          setShowTuto1(true);
        } else {
          setErrorMessage("Erreur !");
        }
      }
    );
  };

  const signInModalContent = (
    <ModalContent
      visibleState={showSignInModal}
      containerStyle={globalStyle.modalContainer}
      closeHandler={() => setShowSignInModal(false)}
    >
      <IconButton
        onPress={emptyStates}
        iconName="cancel"
        color="white"
        size={30}
        containerStyle={styles.closeButton}
      />
      <Text style={globalStyle.screenTitle}>Connexion</Text>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
          secureTextEntry
          onChangeText={setSignInPassword}
          value={signInPassword}
        />
      </KeyboardAvoidingView>
      <TextButton
        onPress={handleSignIn}
        text="Se connecter"
        textStyle={styles.buttonText}
        containerStyle={styles.button}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </ModalContent>
  );

  const signUpModalContent = (
    <ModalContent
      visibleState={showSignUpModal}
      containerStyle={globalStyle.modalContainer}
      closeHandler={() => setShowSignUpModal(false)}
    >
      <IconButton
        onPress={emptyStates}
        iconName="cancel"
        color="white"
        size={30}
        containerStyle={styles.closeButton}
      />
      <Text style={globalStyle.screenTitle}>Inscription</Text>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
          secureTextEntry
          placeholderTextColor="white"
          onChangeText={setSignUpPassword}
          value={signUpPassword}
        />
      </KeyboardAvoidingView>
      <TextButton
        onPress={handleSignUp}
        text="Valider l'inscription"
        containerStyle={styles.button}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </ModalContent>
  );

  const tuto1 = (
    <ModalContent
      visibleState={showTuto1}
      containerStyle={globalStyle.modalContainer}
    >
      <Text style={globalStyle.screenTitle}>
        Bienvenue sur l'app SkaterQuest ! 🛹
      </Text>
      <Text style={globalStyle.subSubTitle}>
        Ici, tu pourras suivre ta progression en skate grâce à un livre de
        tricks, trouver des spots et défier tes potes sur un Game of Skate !
      </Text>
      <View>
        <NextButton
          onPress={() => {
            setShowTuto1(false);
            setShowTuto2(true);
          }}
        />
        <SkipButton onPress={() => navigation.navigate("TabNavigator")} />
      </View>
    </ModalContent>
  );

  const tuto2 = (
    <ModalContent
      visibleState={showTuto2}
      containerStyle={globalStyle.modalContainer}
    >
      <Text style={globalStyle.screenTitle}>
        Un Game of Skate c'est quoi ?🤔
      </Text>
      <Text style={globalStyle.subSubTitle}>
        Un skateur fait un trick, l'autre doit le reproduire : à chaque échec,
        il gagne une lettre du mot SKATE jusqu'à être éliminé. 🛹🔥
      </Text>
      <View>
        <NextButton
          onPress={() => {
            setShowTuto2(false);
            setShowTuto3(true);
          }}
        />
        <SkipButton onPress={() => navigation.navigate("TabNavigator")} />
      </View>
    </ModalContent>
  );

  const tuto3 = (
    <ModalContent
      visibleState={showTuto3}
      containerStyle={globalStyle.modalContainer}
    >
      <Text style={globalStyle.screenTitle}>T'es prêt à rider ? 🛹😎</Text>
      <Text style={globalStyle.subSubTitle}>
        Tu trouveras dans ton livre des tricks les tricks que tu maîtrises et
        ceux que tu vas devoir apprendre pour atteindre le 100% !
      </Text>
      <Text style={globalStyle.screenTitle}>T'es chaud patate ? 🛹💪</Text>
      <View style={styles.tutoButtons}>
        <TextButton
          onPress={() => navigation.navigate("TabNavigator")}
          containerStyle={styles.button}
          text="C'est parti ! 🤙🛹"
        />
      </View>
    </ModalContent>
  );

  return (
    <ImageBackground
      source={require("../assets/Autre fond.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.overlay}>
            <Image
              source={require("../assets/LOGO TEMPORAIRE.png")}
              style={styles.logo}
            />
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
            <IconTextButton
              iconName="person-add"
              text="T'es nouveau ? Créer un compte ici !"
              size={30}
              onPress={() => {
                setShowSignInModal(false);
                setShowSignUpModal(true);
              }}
              containerStyle={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {signUpModalContent}
      {signInModalContent}
      {tuto1}
      {tuto2}
      {tuto3}
    </ImageBackground>
  );
}

const NextButton = ({ onPress }) => (
  <TextButton text="Suivant" containerStyle={styles.button} onPress={onPress} />
);

const SkipButton = ({ onPress }) => (
  <TextButton
    text="Passer"
    containerStyle={{ ...styles.button, backgroundColor: COLOR_BACK }}
    onPress={onPress}
  />
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputs: {
    ...globalStyle.textInput,
    width: "90%",
    maxWidth: 400,
  },
  button: {
    minWidth: "70%",
    maxWidth: 400,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
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
    paddingTop: height * 0.1,
    paddingHorizontal: 20,
    backgroundColor: "rgba(114, 111, 111, 0.4)",
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 50
  },
  tutoButtons: {
    marginTop: 20,
    alignItems: "center",
  },
});
