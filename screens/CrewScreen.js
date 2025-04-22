import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import BackgroundWrapper from "../components/background";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getOwnUserInfo } from "../lib/request";
import Icon from "react-native-vector-icons/MaterialIcons";
import globalStyle from "../globalStyle";

export default function CrewScreen() {
  const [userData, setUserData] = useState(null);
  const { token } = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, [isFocused]);

  if (userData?.crew) {
    const isUserAdmin = userData.crew.admins.includes(userData.uID);
    return (
      <BackgroundWrapper>
        <Text style={styles.title}>{userData.crew.name}</Text>
        <FlatList
          data={userData.crew.members}
          renderItem={({ item }) => {
            return (
              <MemberCard
                memberData={item}
                isAdmin={userData.crew.admins.includes(item.uID)}
                isUser={userData.uID == item.uID}
                isUserAdmin={isUserAdmin}
              />
            );
          }}
          contentContainerStyle={styles.memberContainer}
        />
      </BackgroundWrapper>
    );
  }
  return <BackgroundWrapper></BackgroundWrapper>;
}

function MemberCard({ memberData, isAdmin, isUser, isUserAdmin }) {
  console.log(styles.memberCard);
  return (
    <View style={styles.memberCard}>
      <Image
        source={
          memberData.avatar
            ? { uri: memberData.avatar }
            : require("../assets/Trasher.png")
        }
        height={50}
        width={50}
        style={styles.userAvatar}
      />
      <Text>{memberData.username}</Text>
      <View style={styles.controlContainer}>
        {isUserAdmin && (
          <>
            <IconButton iconName="admin-panel-settings" />
            <IconButton iconName="cancel" />
          </>
        )}
        {isUser && <IconButton iconName="door-back" />}
      </View>
    </View>
  );
}

function IconButton({
  iconName = "user",
  size = 20,
  color = "black",
  containerStyle,
}) {
  return (
    <TouchableOpacity style={containerStyle}>
      <Icon name={iconName} size={size} color={color}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  memberContainer: {
    height: "80%",
    width: "80%",
  },
  memberCard: {
      ...globalStyle.flewRow,
    width: "80%",
    justifyContent : "space-between"
  },
  controlContainer: {
    width: "20%",
    justifyContent : "space-evenly",
    ...globalStyle.flewRow,
  },
});
