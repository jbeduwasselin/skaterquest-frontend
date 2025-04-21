import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { categories, difficultyLevels, tricksData } from "../data/trickList";
import { act, useState } from "react";
import BackgroundWrapper from "../components/background";
import { useDispatch, useSelector } from "react-redux";
import { toggleTrick } from "../reducers/tricks";
import ProgressBar from "../components/ProgressBar";

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

  const filteredTricks = tricksData.filter((trick) => {
    return (
      !settings.excludedCategory.includes(trick.category) &&
      !settings.excludedDificulty.includes(trick.difficulty)
    );
  });

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
      <ProgressBar label={"Tricks Validé"} />
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

      <View style={styles.settingsContainer}>
        {difficultyLevels.map((dificulty, id) => (
          <FilterButton
            key={id}
            text={dificulty}
            color={getDifficultyColor(dificulty)}
            onPress={() => toggleFilterDifficulty(dificulty)}
          />
        ))}
      </View>
      <FilterButton
        text="Validé"
        color="blue"
        onPress={() =>
          setSettings({ ...settings, onlyValidated: !settings.onlyValidated })
        }
      />

      <View style={styles.settingsContainer}></View>
      <FlatList
        data={filteredTricks}
        contentContainerStyle={styles.tricksList}
        renderItem={({ item }) => (
          <TricksCard {...item} hideUnvalidated={settings.onlyValidated} />
        )}
      />
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
    fontSize: 20,
    fontWeight: 800,
    marginVertical: 5,
  },
  settingsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    margin: 5,
  },
  filterButton: {
    padding: 2,
    borderRadius: 5,
  },
  filterButtonText: {
    fontSize: 18,
  },
  tricksList: {
    backgroundColor: "#A0A0A0A0",
    minWidth: "80%",
    maxWidth: "80%",
  },
  tricksContainer: {
    marginHorizontal: "5%",
    marginVertical: "2%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
  },
  tricksHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tricksName: {
    fontWeight: 800,
    fontSize: 18,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tricksDescription: {
    maxWidth: "80%",
    padding: "2%",
  },
});
