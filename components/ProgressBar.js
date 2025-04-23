import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { tricksData } from "../data/trickList";
import { COLOR_GREY } from "../globalStyle";

export default function ProgressBar() {
  const progress = useSelector((state) => state.tricks.value.length);
  const progressPercent = Math.round((progress / tricksData.length) * 1000)/10;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Tricks Validés: ${progressPercent}%`}</Text>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${progressPercent}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "80%",
  },
  label: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  barBackground: {
    height: 12,
    backgroundColor: COLOR_GREY,
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
});
