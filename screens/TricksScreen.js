import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Button,
  Modal,
} from "react-native";
import BackgroundWrapper from "../components/background";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from "../components/ProgressBar";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Facile":
      return "#4CAF50";
    case "Moyen":
      return "#FF9800";
    case "Difficile":
      return "#F44336";
    default:
      return "#aaa";
  }
};

const difficultyLevels = ["Facile", "Moyen", "Difficile"];
const categories = ["Flat", "Grind", "Stairs", "Wall"];


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
      "L'ollie avec une rotation horizontale de la planche via le pied avant.",
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
  const [selectedDifficulties, setSelectedDifficulties] = useState({
    Facile: true,
    Moyen: true,
    Difficile: true,
  });
  const [selectedCategories, setSelectedCategories] = useState({
    Flat: true,
    Grind: true,
    Stairs: true,
    Wall: true,
  });

  const [showOnlyValidated, setShowOnlyValidated] = useState(false);
  const [showSkillTree, setShowSkillTree] = useState(false);
  const [validationPercentage, setValidationPercentage] = useState(0);


  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedExpandedTricks = await AsyncStorage.getItem(
          "expandedTricks"
        );
        const storedValidatedTricks = await AsyncStorage.getItem(
          "validatedTricks"
        );
        const storedDifficulties = await AsyncStorage.getItem(
          "selectedDifficulties"
        );
        const storedCategories = await AsyncStorage.getItem(
          "selectedCategories"
        );

        if (storedExpandedTricks)
          setExpandedTricks(JSON.parse(storedExpandedTricks));
        if (storedValidatedTricks)
          setValidatedTricks(JSON.parse(storedValidatedTricks));
        if (storedDifficulties)
          setSelectedDifficulties(JSON.parse(storedDifficulties));
        if (storedCategories)
          setSelectedCategories(JSON.parse(storedCategories));
      } catch (error) {
        console.error("Erreur de chargement des données", error);
      }
    };

    loadData();
  }, []);

  // Sauvegarder les données à chaque modification
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          "expandedTricks",
          JSON.stringify(expandedTricks)
        );
        await AsyncStorage.setItem(
          "validatedTricks",
          JSON.stringify(validatedTricks)
        );
        await AsyncStorage.setItem(
          "selectedDifficulties",
          JSON.stringify(selectedDifficulties)
        );
        await AsyncStorage.setItem(
          "selectedCategories",
          JSON.stringify(selectedCategories)
        );
      } catch (error) {
        console.error("Erreur de sauvegarde des données", error);
      }
    };

    saveData();
  }, [
    expandedTricks,
    validatedTricks,
    selectedDifficulties,
    selectedCategories,
  ]);

  const toggleExpand = (index) => {
    setExpandedTricks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleValidation = (index) => {
    setValidatedTricks((prev) => {
      const newValidatedTricks = { ...prev };
      newValidatedTricks[index] = !newValidatedTricks[index];
  
      // Calculer la nouvelle barre de progression
      const totalValidated = filteredTricks.reduce((count, _, idx) => {
        return newValidatedTricks[idx] ? count + 1 : count;
      }, 0);
      const totalDisplayed = filteredTricks.length;
      const newValidationPercentage = totalDisplayed === 0 ? 0 : totalValidated / totalDisplayed;
  
      // Mettre à jour la barre de progression
      setValidationPercentage(newValidationPercentage);
      return newValidatedTricks;
    });
  };
  
  
  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties((prev) => ({
      ...prev,
      [difficulty]: !prev[difficulty],
    }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredTricks = tricksData.filter(
    (trick) =>
      selectedDifficulties[trick.difficulty] &&
      selectedCategories[trick.category]
  );

  const totalDisplayed = filteredTricks.length;
  const totalValidated = filteredTricks.reduce((count, _, index) => {
    return validatedTricks[index] ? count + 1 : count;
  }, 0);



  // Fonction pour choisir un trick aléatoire en fonction du niveau et de la progression
  const getRandomTrick = () => {
    const availableTricks = filteredTricks.filter(
      (trick, index) =>
        validatedTricks[index] || (selectedDifficulties[trick.difficulty] && !validatedTricks[index])
    );
    

    // Vérification si un trick est disponible en fonction des critères
    if (availableTricks.length === 0) {
      alert("Aucun trick disponible selon ton niveau et ta progression !");
      return;
    }

    const randomTrick =
      availableTricks[Math.floor(Math.random() * availableTricks.length)];
    alert(
      `Trick aléatoire : ${randomTrick.name}\nDescription : ${randomTrick.description}`
    );
  };

  // Fonction pour afficher l'arbre de compétences
  // Fonction pour afficher l'arbre de compétences, uniquement avec les tricks validés
  const renderSkillTree = () => {
    const validatedTricksList = filteredTricks.filter(
      (trick, index) => validatedTricks[index]
    );
  
    if (validatedTricksList.length === 0) {
      return (
        <Text style={styles.noTricksText}>
          Aucune compétence validée pour l'instant.
        </Text>
      );
    
  
    // Rendu de l'arbre de compétences
  };
  

    return (
      <ScrollView style={styles.skillTreeContainer}>
        <Text style={styles.skillTreeTitle}>Arbre de compétences</Text>
        <View style={styles.treeWrapper}>
          {/* Afficher les tricks validés sous forme d'arbre */}
          {validatedTricksList.map((trick, index) => (
            <View
              key={index}
              style={[
                styles.skillNode,
                { backgroundColor: getDifficultyColor(trick.difficulty) },
              ]}
            >
              <Text style={styles.skillNodeTitle}>{trick.name}</Text>
              <Text style={styles.skillNodeDescription}>
                {trick.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Livre des tricks</Text>

        {/* Ici ta progress bar : */}
        <ProgressBar
          progress={validationPercentage}
          label={`Validé : ${totalValidated} / ${totalDisplayed} (${Math.round(
            validationPercentage * 100
          )}%)`}
        />

        {/* Boutons "Donne-moi un trick" et "Voir l’arbre de compétences" */}
        <View style={styles.randomButtonContainer}>
          <Button title="Donne-moi un trick" onPress={getRandomTrick} />
          <Button
            title="Voir l’arbre de compétences"
            onPress={() => setShowSkillTree(true)}
            style={{ marginTop: 10 }}
          />
        </View>

        {/* Filtres par difficulté */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filtrer par difficulté</Text>
          {difficultyLevels.map((level) => (
            <View key={level} style={styles.filterRow}>
              <Text style={styles.filterLabel}>{level}</Text>
              <Switch
                value={selectedDifficulties[level]}
                onValueChange={() => toggleDifficulty(level)}
                trackColor={{ true: getDifficultyColor(level) }}
              />
            </View>
          ))}

          {categories.map((cat) => (
            <View key={cat} style={styles.filterRow}>
              <Text style={styles.filterLabel}>{cat}</Text>
              <Switch
                value={selectedCategories[cat]}
                onValueChange={() => toggleCategory(cat)}
              />
            </View>
          ))}
        </View>

        {/* Liste des tricks filtrée */}
        {filteredTricks.map((trick, index) => (
          <View key={index} style={styles.trickCard}>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
              <View style={styles.trickHeader}>
                <Text style={styles.trickName}>{trick.name}</Text>
                <View style={styles.difficultyCategoryContainer}>
                  <MaterialCommunityIcons
                    name="skateboard"
                    size={20}
                    color={getDifficultyColor(trick.difficulty)}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.category}>{trick.category}</Text>
                </View>
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

      {/* Modal de l'arbre de compétences */}
      <Modal
        visible={showSkillTree}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSkillTree(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderSkillTree()}
            <Button title="Fermer" onPress={() => setShowSkillTree(false)} />
          </View>
        </View>
      </Modal>
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
  filterContainer: {
    marginBottom: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
  },
  filterTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterLabel: {
    color: "#fff",
    fontSize: 15,
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
  difficultyCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    fontSize: 14,
    color: "#fff",
    fontStyle: "italic",
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
  progressContainer: {
    marginBottom: 8,
  },
  progressText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 10,
    backgroundColor: "#4CAF50",
  },
  randomButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  skillTreeContainer: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 15,
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    maxHeight: 400, // Limite la hauteur pour qu'il devienne défilable
    overflow: "scroll",
  },
  skillTreeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  treeWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },
  skillNode: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 15,
    margin: 10,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 0.9 }],
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    position: "relative",
  },
  skillNodeHovered: {
    transform: [{ scale: 1.1 }],
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.4)",
  },
  skillNodeTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  skillNodeDescription: {
    color: "#ddd",
    fontSize: 12,
    textAlign: "center",
  },
  skillNodeIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  lineConnector: {
    position: "absolute",
    top: "50%",
    left: "100%",
    width: 10,
    height: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    transform: [{ translateX: 15 }],
  },
  noTricksText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});
