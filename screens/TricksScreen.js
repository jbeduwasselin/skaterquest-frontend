import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { categories, difficultyLevels, tricksData } from "../data/trickList";
import { useState, useEffect } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleTrick } from "../reducers/tricks";
import ProgressBar from "../components/ProgressBar";
import ConfettiCannon from "react-native-confetti-cannon";
import IconButton from "../components/IconButton";
import globalStyle from "../globalStyle";

const initialSettings = Object.freeze({
  excludedDificulty: [],
  excludedCategory: [],
  onlyValidated: false,
});

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Facile":
      return "#4CAF50";
    case "Moyen":
      return "#FF9800";
    default:
      return "#F44336";
  }
};

export default function TricksScreen() {
  const [settings, setSettings] = useState(initialSettings);
  const [showModal, setShowModal] = useState(false);

  const filteredTricks = tricksData.filter((trick) => {
    return (
      !settings.excludedCategory.includes(trick.category) &&
      !settings.excludedDificulty.includes(trick.difficulty)
    );
  });

  const validatedTricks = useSelector((state) => {
    return filteredTricks.filter((trick) => {
      return state.tricks.value.includes(trick.name);
    });
  });

  const percentage = (validatedTricks.length / filteredTricks.length) * 100;

  useEffect(() => {
    if (percentage === 100 && filteredTricks.length > 0) {
      setShowModal(true);
    }
  }, [percentage]);

  function toggleFilterDifficulty(value) {
    let newFilter;
    settings.excludedDificulty.includes(value)
      ? (newFilter = settings.excludedDificulty.filter((dif) => dif != value))
      : (newFilter = [...settings.excludedDificulty, value]);
    setSettings({ ...settings, excludedDificulty: newFilter });
  }

  function toggleFilterCategory(value) {
    let newFilter;
    settings.excludedCategory.includes(value)
      ? (newFilter = settings.excludedCategory.filter((dif) => dif != value))
      : (newFilter = [...settings.excludedCategory, value]);
    setSettings({ ...settings, excludedCategory: newFilter });
  }

  return (
    <BackgroundWrapper>
      <Text style={styles.screenTitle}>Livre de Tricks</Text>

      <ProgressBar
        label={`Tricks Validés: ${Math.round(percentage)}%`}
        progress={percentage / 100}
      />
      <View style={globalStyle.flexRow}>
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Catégories</Text>
          <View style={styles.settingsContainer}>
            {categories.map((category, id) => (
              <FilterButton
                key={id}
                text={category}
                color="gray"
                onPress={() => toggleFilterCategory(category)}
              />
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Difficulté</Text>
          <View style={styles.settingsContainer}>
            {difficultyLevels.map((difficulty, id) => (
              <FilterButton
                key={id}
                text={difficulty}
                color={getDifficultyColor(difficulty)}
                onPress={() => toggleFilterDifficulty(difficulty)}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Validé</Text>
        <FilterButton
          text="Validé"
          color="blue"
          onPress={() =>
            setSettings({ ...settings, onlyValidated: !settings.onlyValidated })
          }
        />
      </View>

      <FlatList
        data={filteredTricks}
        contentContainerStyle={styles.tricksList}
        renderItem={({ item }) => (
          <TricksCard {...item} hideUnvalidated={settings.onlyValidated} />
        )}
      />

      {/* MODAL 100% */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              fadeOut
              autoStart
            />
            <Image
              source={require("../assets/Trasher.png")}
              style={styles.skateGif}
              resizeMode="contain"
            />
            <Text style={styles.modalTitle}>🔥 100% Complété ! 🔥</Text>
            <Text style={styles.modalText}>
              T'as validé tous les tricks, champion 🍺🏋️‍♂️
            </Text>
            <IconButton
              iconName="book-open"
              buttonText="Retour au livre"
              onPress={() => setShowModal(false)}
              style={{ width: 200 }}
            />
          </View>
        </View>
      </Modal>
    </BackgroundWrapper>
  );
}

function FilterButton({ text, color, onPress }) {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        ...styles.filterButton,
        backgroundColor: color,
        opacity: active ? 0.2 : 1,
      }}
      onPress={() => {
        onPress(!active);
        setActive(!active);
      }}
    >
      <Text style={styles.filterButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

function TricksCard({ name, difficulty, description, hideUnvalidated }) {
  const [expanded, setExpanded] = useState(false);
  const validated = useSelector((state) => state.tricks.value.includes(name));
  const dispatch = useDispatch();

  return (
    <View
      style={{
        ...styles.tricksContainer,
        display: hideUnvalidated && !validated ? "none" : "flex",
      }}
    >
      <TouchableOpacity
        style={styles.tricksHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.tricksName}>{name}</Text>
        <View style={styles.subContainer}>
          <MaterialCommunityIcons
            name="skateboard"
            size={40}
            color={getDifficultyColor(difficulty)}
            style={styles.difficultyIcon}
          />
          <Switch
            value={validated}
            onValueChange={() => {
              dispatch(toggleTrick(name));
            }}
          />
        </View>
      </TouchableOpacity>
      {expanded && <Text style={styles.tricksDescription}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    ...globalStyle.screenTitle,
  },
  filterSection: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    marginHorizontal: "5%",
  },
  filterSectionTitle: {
    ...globalStyle.subSubTitle,
    marginBottom: 5,
  },
  settingsContainer: {
    ...globalStyle.flexRow,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
    margin: 3,
  },
  filterButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  tricksList: {
    minWidth: "95%",
    maxWidth: "95%",
  },
  tricksContainer: {
    marginHorizontal: "5%",
    marginVertical: "2%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
  },
  tricksHeader: {
    ...globalStyle.flexRow,
    justifyContent: "space-between",
  },
  tricksName: {
    ...globalStyle.subTitle,
  },
  subContainer: { ...globalStyle.flexRow },
  tricksDescription: {
    maxWidth: "80%",
    padding: "2%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    ...globalStyle.screenTitle,
    fontSize: 22,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  skateGif: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});
