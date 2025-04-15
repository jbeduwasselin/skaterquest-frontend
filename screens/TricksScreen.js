import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import BackgroundWrapper from "../components/background";

const tricksData = [
  {
    name: "Ollie",
    difficulty: "Facile",
    category: "Flat",
    description:
      "Saut de base sans utiliser les mains, essentiel pour la plupart des tricks.",
  },
  {
    name: "No Comply",
    difficulty: "Facile",
    category: "Flat",
    description: "Tourner en 180° en posant le pied avant au sol.",
  },
  {
    name: "Revert",
    difficulty: "Facile",
    category: "Flat",
    description: "Faire tourner le corps et les roues sur place.",
  },
  {
    name: "Caveman",
    difficulty: "Facile",
    category: "Flat",
    description:
      "Sauter sur la planche depuis une position debout avec la planche en main.",
  },
  {
    name: "Acid Drop",
    difficulty: "Facile",
    category: "Flat",
    description: "Sauter sans ollie depuis une hauteur.",
  },
  {
    name: "Body Varial",
    difficulty: "Facile",
    category: "Flat",
    description: "Le corps tourne, mais pas la planche.",
  },
  {
    name: "Footplant",
    difficulty: "Facile",
    category: "Flat",
    description: "Poser un pied au sol pendant un trick.",
  },
  {
    name: "Firecracker",
    difficulty: "Facile",
    category: "Stairs",
    description:
      "Descente d'escalier en faisant claquer la planche marche par marche.",
  },
  {
    name: "Pivot",
    difficulty: "Facile",
    category: "Flat",
    description: "Rotation du skateur sur l’arrière de la planche.",
  },
  {
    name: "Boneless",
    difficulty: "Moyen",
    category: "Flat",
    description:
      "Saut en posant le pied avant au sol et en attrapant la planche à la main.",
  },
  {
    name: "Shuvit",
    difficulty: "Moyen",
    category: "Flat",
    description: "Rotation de la planche à 180° sans que le skateur ne tourne.",
  },
  {
    name: "Pop Shuvit",
    difficulty: "Moyen",
    category: "Flat",
    description: "Shuvit avec un pop, la planche quitte le sol.",
  },
  {
    name: "Manual",
    difficulty: "Moyen",
    category: "Flat",
    description: "Rouler sur les roues arrière uniquement.",
  },
  {
    name: "Nose Manual",
    difficulty: "Moyen",
    category: "Flat",
    description: "Rouler sur les roues avant uniquement.",
  },
  {
    name: "Kickflip",
    difficulty: "Moyen",
    category: "Flat",
    description:
      "Ollie avec une rotation horizontale de la planche via le pied avant.",
  },
  {
    name: "Heelflip",
    difficulty: "Moyen",
    category: "Flat",
    description:
      "Semblable au kickflip, mais la planche tourne dans l'autre sens avec le talon.",
  },
  {
    name: "Frontside 180",
    difficulty: "Moyen",
    category: "Flat",
    description: "Le skateur et la planche tournent de 180° vers l'avant.",
  },
  {
    name: "Backside 180",
    difficulty: "Moyen",
    category: "Flat",
    description: "Le skateur et la planche tournent de 180° vers l'arrière.",
  },
  {
    name: "Railstand",
    difficulty: "Moyen",
    category: "Flat",
    description: "Debout sur la tranche de la planche.",
  },
  {
    name: "Boned Ollie",
    difficulty: "Moyen",
    category: "Flat",
    description: "Ollie avec une extension exagérée des jambes.",
  },
  {
    name: "Nollie",
    difficulty: "Moyen",
    category: "Flat",
    description: "Ollie réalisé avec le nose (avant) de la planche.",
  },
  {
    name: "Fakie Ollie",
    difficulty: "Moyen",
    category: "Flat",
    description: "Ollie en roulant en fakie (marche arrière).",
  },
  {
    name: "Switch Ollie",
    difficulty: "Moyen",
    category: "Flat",
    description: "Ollie avec la position inverse de ton stance habituel.",
  },
  {
    name: "Wallride",
    difficulty: "Moyen",
    category: "Wall",
    description: "Rouler brièvement contre un mur avec la planche.",
  },
  {
    name: "Wallie",
    difficulty: "Moyen",
    category: "Wall",
    description: "Saut contre un mur sans ollie.",
  },
  {
    name: "Powerslide",
    difficulty: "Moyen",
    category: "Flat",
    description: "Faire glisser la planche en travers pour s’arrêter.",
  },
  {
    name: "Slappy",
    difficulty: "Moyen",
    category: "Grind",
    description: "Grind sans ollie sur un curb.",
  },
  {
    name: "Varial Kickflip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Kickflip combiné à un shuvit.",
  },
  {
    name: "360 Flip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Rotation complète de la planche (360°) combinée à un flip.",
  },
  {
    name: "Hardflip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Flip vertical combiné à un frontside shuvit.",
  },
  {
    name: "Impossible",
    difficulty: "Difficile",
    category: "Flat",
    description: "La planche fait le tour du pied arrière verticalement.",
  },
  {
    name: "Frontside Flip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Kickflip avec rotation frontside de 180°.",
  },
  {
    name: "Backside Flip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Kickflip avec rotation backside de 180°.",
  },
  {
    name: "Bigspin",
    difficulty: "Difficile",
    category: "Flat",
    description: "Shuvit 360° avec rotation du skateur à 180°.",
  },
  {
    name: "Casper Flip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Flip suivi d'un pivot sous le pied.",
  },
  {
    name: "Darkslide",
    difficulty: "Difficile",
    category: "Grind",
    description: "Glissade sur le grip de la planche, trucks vers le haut.",
  },
  {
    name: "Primo Slide",
    difficulty: "Difficile",
    category: "Grind",
    description: "Glissade sur la tranche de la planche.",
  },
  {
    name: "Tiger Claw",
    difficulty: "Difficile",
    category: "Flat",
    description: "Attraper la planche avec la main pour faire une rotation.",
  },
  {
    name: "Underflip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Flip inversé en tapant sous la planche.",
  },
  {
    name: "Hospital Flip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Variante du casper flip avec rotation spécifique.",
  },
  {
    name: "Double Kickflip",
    difficulty: "Difficile",
    category: "Flat",
    description: "La planche tourne deux fois pendant le flip.",
  },
  {
    name: "Triple Kickflip",
    difficulty: "Difficile",
    category: "Flat",
    description: "Trois rotations de la planche pendant un flip.",
  },
  {
    name: "Laser Flip",
    difficulty: "Difficile",
    category: "Flat",
    description: "360 heelflip avec rotation frontside.",
  },
  {
    name: "Gazelle Flip",
    difficulty: "Difficile",
    category: "Flat",
    description: "540° flip combinant plusieurs mouvements.",
  },
  {
    name: "Blunt Slide",
    difficulty: "Difficile",
    category: "Grind",
    description: "Grind où l’arrière de la planche touche le rebord.",
  },
];

export default function TricksScreen() {
  const [expandedTricks, setExpandedTricks] = useState({});
  const [validatedTricks, setValidatedTricks] = useState({});

  const toggleExpand = (index) => {
    setExpandedTricks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleValidation = (index) => {
    setValidatedTricks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Livre des tricks</Text>
        {tricksData.map((trick, index) => (
          <View key={index} style={styles.trickCard}>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
              <View style={styles.trickHeader}>
                <Text style={styles.trickName}>{trick.name}</Text>
                <Text style={styles.difficulty}>{trick.difficulty}</Text>
                <Text style={styles.category}>{trick.category}</Text>
              </View>
            </TouchableOpacity>

            {expandedTricks[index] && (
              <Text style={styles.description}>{trick.description}</Text>
            )}

            <View style={styles.switchRow}>
              <Text style={styles.validationText}>Validé ?</Text>
              <Switch
                value={validatedTricks[index] || false}
                onValueChange={() => toggleValidation(index)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  trickCard: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  trickHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trickName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  difficulty: {
    fontSize: 14,
    color: "#aaa",
  },
  category: {
    fontSize: 14,
    color: "#fff",
    fontStyle: "italic", // Ajoute un style différent pour la catégorie
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#ddd",
  },
  switchRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  validationText: {
    color: "#fff",
    fontSize: 14,
  },
});
