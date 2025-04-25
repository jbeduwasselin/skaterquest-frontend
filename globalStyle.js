import { StyleSheet } from "react-native";

export const COLOR_PLACEHOLDER = "#FFFFFF9A";
//THEME 1
export const COLOR_TEXT = "#000000FF";
export const COLOR_DEEP = "#000000";
export const COLOR_LIGHT = "#FFFFFF";
export const COLOR_MAIN = "#FF650C";
export const COLOR_SECD = "#535353FF";
export const COLOR_MODAL = "#292929E5";
export const COLOR_CANCEL = "#858585FF";
export const COLOR_CONFIRM = "#dc3545";
export const BACKGROUND = require("./assets/Background1.png");
//THEME 2
// export const COLOR_TEXT = "#000000";
// export const COLOR_DEEP = "#000000";
// export const COLOR_MAIN = "#a13d63";
// export const COLOR_SECD = "#a13d63";
// export const COLOR_MODAL = "#320b0ee8";
// export const COLOR_CANCEL = "#858585FF";
// export const COLOR_CONFIRM = "#dc3545";
// export const BACKGROUND = require("./assets/Background1.png");

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dl5e9wcse/image/upload/v1745437126/lfnxpwagw27derwlvc0f.png";
export const DEFAULT_THUMBNAIL =
  "https://res.cloudinary.com/dl5e9wcse/image/upload/v1745437126/lfnxpwagw27derwlvc0f.png";

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
    maxWidth: "90%",
    backgroundColor: COLOR_MODAL,
  },
  avatar: {
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "#fff",
    margin: 5,
  },
  button: {
    backgroundColor: COLOR_MAIN,
    borderRadius: 10,
    padding: 12,
    margin: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: COLOR_TEXT,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLOR_MAIN,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: COLOR_TEXT,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  skaterTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0000009A",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10, // Espacement avec l'avatar
  },
  subTitle: {
    fontWeight: 800,
    fontSize: 18,
  },
  subSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLOR_LIGHT,
  },
  textInput: {
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: COLOR_LIGHT,
    marginBottom: 15,
    width: "90%",
    textAlign: "center",
  },
  errorModal: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 15,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLOR_CONFIRM,
    margin: "2%",
  },
  errorButton: {
    backgroundColor: COLOR_SECD,
  },
  errorButtonText: {
    color: COLOR_DEEP,
  },
  confirmationModal: {
    backgroundColor: COLOR_MODAL,
    padding: 20,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
  },
  confirmationText: {
    fontWeight: "bold",
    color: COLOR_TEXT,
    fontSize: 18,
    margin: "2%",
  },
  cancelButton: {
    backgroundColor: COLOR_CANCEL,
  },
  confirmButton: {
    backgroundColor: COLOR_CONFIRM,
  },
});

export default globalStyle;
