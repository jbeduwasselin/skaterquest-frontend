import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexRow : {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF650C",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: "#FFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  subTitle : {
    fontWeight: 800,
    fontSize: 18,
  },

  subSubTitle : {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default globalStyle;
export const COLOR_BACKGROUND = "#3B3B3B";
export const COLOR_MODAL = "#49D2EA";
export const COLOR_MAIN = "#FEA185";
