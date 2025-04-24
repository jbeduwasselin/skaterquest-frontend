import { Dimensions, StyleSheet } from "react-native";
export const COLOR_PLACEHOLDER = "rgba(255, 255, 255, 0.6)";
export const COLOR_BACK = "#858585FF";
export const COLOR_GREY = "#535353FF";
export const COLOR_MODAL = "#292929E5";
export const COLOR_MAIN = "#FF650C";
export const COLOR_CANCEL = "#858585FF";
export const COLOR_CONFIRM = "#dc3545";

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
  skaterTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1e1e1e",
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
    color: "white",
  },
  textInput: {
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
    color: "red",
    margin: "2%",
  },
  errorButton: {
    backgroundColor: COLOR_GREY,
  },
  errorButtonText: {
    color: "black",
  },
  confirmationModal: {
    backgroundColor: COLOR_MODAL,
    padding: 20,
    borderRadius: 15,
    display : "flex",
    alignItems : "center"
  },
  confirmationText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    margin: "2%",

  },
  cancelButton: {
    backgroundColor: COLOR_BACK,
  },
  confirmButton: {
    backgroundColor: COLOR_CONFIRM,
  },
});

export default globalStyle;
