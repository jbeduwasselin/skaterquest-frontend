import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  addUserToCrew,
  createCrew,
  getOwnUserInfo,
  leaveCrew,
  promoteToCrewAdmin,
  removeUserFromCrew,
  searchUser,
} from "../lib/request";
import Icon from "react-native-vector-icons/MaterialIcons";
import globalStyle from "../globalStyle";
import { TextInput } from "react-native-paper";

export default function CrewScreen() {
  const [updateWatcher, forceUpdate] = useReducer((p) => p + 1, 0);
  const isFocused = useIsFocused();
  //Recup les info utilisateur
  const { token } = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getOwnUserInfo(token).then(({ result, data }) => {
      result && setUserData(data);
    });
  }, [isFocused, updateWatcher]);

  const [newCrewName, setNewCrewName] = useState("");
  const [searchResults, setSearchResult] = useState([]);

  async function handleCreateCrew() {
    const { result, reason } = await createCrew(token, newCrewName);
    console.log(result, reason);
    result && forceUpdate();
  }

  async function handleSearchResult(searchText) {
    if (searchText.length < 3) {
      setSearchResult([]);
      return;
    }
    const { data } = await searchUser(token, searchText);
    console.log(data);
    setSearchResult(data.filter((user) => !user.crew));
  }

  async function handleAddMember(userID) {
    const { result } = await addUserToCrew(token, userID);
    result && forceUpdate();
  }

  //Listes des utilisateurs et ajout
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
                forceUpdate={forceUpdate}
              />
            );
          }}
          contentContainerStyle={styles.memberContainer}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Nouveau membre"
          onChangeText={handleSearchResult}
        />
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View style={styles.memberCard}>
              <Image
                source={
                  item.avatar
                    ? { uri: item.avatar }
                    : require("../assets/Trasher.png")
                }
                height={50}
                width={50}
                style={styles.userAvatar}
              />
              <Text>{item.username}</Text>
              <IconButton
                iconName="group-add"
                onPress={() => handleAddMember(item.uID)}
              />
            </View>
          )}
        />
      </BackgroundWrapper>
    );
  }
  //Creation d'un crew
  return (
    <BackgroundWrapper>
      <Text style={styles.title}>
        Tu n'as pas de crew, fais toi inviter ou crée en un !
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setNewCrewName}
        placeholder=" Nom de Ton crew"
      ></TextInput>
      <IconButton
        iconName="send"
        color="yellow"
        size={70}
        onPress={handleCreateCrew}
      />
    </BackgroundWrapper>
  );
}

function MemberCard({ memberData, isAdmin, isUser, isUserAdmin, forceUpdate }) {
  const { token } = useSelector((state) => state.user.value);

  async function handleLeaveCrew() {
    const { result } = await leaveCrew(token);
    console.log(result);
    result && forceUpdate();
  }

  async function handleAdmin(isAdmin) {
    const { result } = isAdmin
      ? await promoteToCrewAdmin(token, memberData.uID)
      : await demoteFromCrewAdmin(token, memberData.uID);
  }

  async function handleRemoveMember() {
    const { result } = await removeUserFromCrew(token, memberData.uID);
    console.log(result);
    result && forceUpdate();
  }

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
        {isUserAdmin && !isUser && (
          <>
            <StateIconButton
              iconName="admin-panel-settings"
              value={isAdmin}
              onPress={handleAdmin}
            />
            <IconButton iconName="cancel" onPress={handleRemoveMember} />
          </>
        )}
        {isUser && (
          <IconButton iconName="door-back" onPress={handleLeaveCrew} />
        )}
      </View>
    </View>
  );
}

function StateIconButton({
  iconName = "user",
  size = 20,
  inactiveColor = "black",
  activeColor = "blue",
  containerStyle,
  value,
  onPress = () => {},
}) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(value);
  }, [value]);

  return (
    <IconButton
      color={isActive ? activeColor : inactiveColor}
      onPress={() => {
        onPress(!isActive);
        setIsActive(!isActive);
      }}
      {...{
        iconName,
        size,
        containerStyle,
      }}
    />
  );
}

function IconButton({
  iconName = "user",
  size = 20,
  color = "black",
  containerStyle,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Icon name={iconName} size={size} color={color}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    ...globalStyle.screenTitle
  },
  memberContainer: {
    width: "80%",
  },
  memberCard: {
    ...globalStyle.flexRow,
    width: "80%",
    justifyContent: "space-between",
  },
  userAvatar: {
    height: 100,
    width: 100,
  },
  controlContainer: {
    width: "20%",
    justifyContent: "space-evenly",
    ...globalStyle.flexRow,
  },
  textInput: {
    maxHeight: 50,
    minHeight: 50,
    width : "80%",
    margin : "2%"
  },
});
