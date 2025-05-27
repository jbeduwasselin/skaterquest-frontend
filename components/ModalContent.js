// Une modale qui s'ouvre par dessus le contenu de l'écran

import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  useAnimatedValue,
} from "react-native";
import { useEffect, useState } from "react";
import { useBackHandler } from "@react-native-community/hooks";

export default function ModalContent({
  visibleState,
  closeHandler,
  children,
  containerStyle,
  fadeInDuration = 500,
  fadeOutDuration = 500,
}) {
  // visibleState = State du composant parent qui détermine la visibilité
  // containerStyle = Style du container interne (écrase le CSS par défaut)
  const [visible, setVisible] = useState(false);

  // Animations
  const fadeAnim = useAnimatedValue(0);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeInDuration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: fadeOutDuration,
      useNativeDriver: true,
    }).start();
  };

  // Hook d'effet qui met à jours l'état lors d'un rerender du parent
  useEffect(() => {
    visibleState ? fadeIn() : fadeOut();
    visibleState
      ? setVisible(visibleState)
      : setTimeout(() => setVisible(visibleState), fadeOutDuration);
  }, [visibleState]);

  // Ferme la modale sur appui du backbutton
  useBackHandler(() => {
    if (visible && closeHandler) {
      closeHandler();
      return true;
    }
    return false;
  });

  // Si la modale n'est pas visible retourne rien
  if (!visible) return;

  // Sinon retourne les enfants dans un double container
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View
        style={{
          ...styles.container,
          ...containerStyle,
          transform: [{ scale: fadeAnim }],
          opacity: fadeAnim,
        }}
      >
        {children}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Overlay en position absolue, prend tout l'écran
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  // Style par défaut du container interne
  container: {
    padding: "1%",
    backgroundColor: "#202020A0",
  },
});
