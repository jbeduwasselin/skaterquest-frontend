import { Dimensions, StyleSheet } from "react-native";
export const COLOR_BACK = "#858585FF";
export const COLOR_MODAL = "#292929CE";
export const COLOR_MAIN = "#FF650C";
export const DEFAULT_AVATAR = require("./assets/Trasher.png");

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    backgroundColor: COLOR_MODAL,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLOR_MAIN,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: "#FFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  subTitle: {
    fontWeight: 800,
    fontSize: 18,
  },
  subSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  textInput: {
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    placeholderTextColor: "white",
    marginBottom: 15,
    width: "90%",
    textAlign: "center",
  },
  errorModal: {
    padding: 20,
  },
  errorText: {
    ...globalStyle.subSubTitle,
    margin: "2%",
  },
  errorButton: {
    maxWidth: 50,
  },
});

export default globalStyle;
