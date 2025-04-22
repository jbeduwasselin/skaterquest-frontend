import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
  },
  flewRow : {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
});

export default globalStyle;
export const COLOR_BACKGROUND = "#3B3B3B";
export const COLOR_MODAL = "#49D2EA";
export const COLOR_MAIN = "#FEA185";
