import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackgroundWrapper from "../components/background";

export default function CrewScreen() {
  const [userData, setUserData] = useState(null);
  const { token } = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, [isFocused]);

  console.log(userData);
  if (userData.crew) {
    return <BackgroundWrapper></BackgroundWrapper>;
  }
  return <BackgroundWrapper></BackgroundWrapper>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
