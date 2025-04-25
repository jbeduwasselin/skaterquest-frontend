import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { categories, difficultyLevels, tricksData } from "../data/trickList";
import { useState, useEffect, useMemo } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleTrick } from "../reducers/tricks";
import ProgressBar from "../components/ProgressBar";
import ConfettiCannon from "react-native-confetti-cannon";
import globalStyle, { COLOR_SECD } from "../globalStyle";
import { StateButton, Button } from "../components/Buttons";

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

  const tricksValidated = useSelector((state) => state.tricks.value);

  const filteredTricks = useMemo(() => {
    return tricksData.filter((trick) => {
      return (
        !settings.excludedCategory.includes(trick.category) &&
        !settings.excludedDificulty.includes(trick.difficulty)
      );
    });
  }, [settings.excludedCategory, settings.excludedDificulty]);

  const validatedTricks = useMemo(() => {
    return filteredTricks.filter((trick) =>
      tricksValidated.includes(trick.name)
    );
  }, [filteredTricks, tricksValidated]);

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
      <View
        style={{
          ...globalStyle.flexRow,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <View style={styles.filterSection}>
          {difficultyLevels.map((difficulty, id) => (
            <FilterButton
              key={id}
              text={difficulty}
              color={getDifficultyColor(difficulty)}
              onPress={() => toggleFilterDifficulty(difficulty)}
            />
          ))}
          <FilterButton
            text="Validé"
            color="blue"
            reverse={true}
            onPress={() =>
              setSettings({
                ...settings,
                onlyValidated: !settings.onlyValidated,
              })
            }
          />
          {categories.map((category, id) => (
            <FilterButton
              key={id}
              text={category}
              color={COLOR_SECD}
              onPress={() => toggleFilterCategory(category)}
            />
          ))}
        </View>
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
            <Button
              iconName="book-open"
              text="Retour au livre"
              onPress={() => setShowModal(false)}
              style={{ width: 200 }}
            />
          </View>
        </View>
      </Modal>
    </BackgroundWrapper>
  );
}

const FilterButton = ({ text, color, onPress, reverse = false }) => (
  <StateButton
    {...{ text, onPress }}
    activeContainerStyle={{
      opacity: reverse ? 1 : 0.2,
    }}
    containerStyle={{
      ...styles.filterButton,
      backgroundColor: color,
      opacity: reverse ? 0.2 : 1,
    }}
    textStyle={styles.filterButtonText}
  />
);

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
    ...globalStyle.flexRow,
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: "5%",
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 2,
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
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
  },
  tricksHeader: {
    ...globalStyle.flexRow,
    justifyContent: "space-between",
  },
  tricksName: {
    ...globalStyle.subTitle,
    marginLeft: 20,
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
