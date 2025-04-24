import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
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
  removeFromCrewAdmin,
  removeUserFromCrew,
  searchUser,
} from "../lib/request";
import globalStyle, { COLOR_MAIN, DEFAULT_AVATAR, COLOR_PLACEHOLDER } from "../globalStyle";
import { Button, StateButton } from "../components/Buttons";
import ModalContent from "../components/ModalContent";
import { useConfirmationModal } from "../components/ConfirmModal";

export default function CrewScreen() {
  //Rerender dans on mount et manuel
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
  const [searchVisible, setSearchVisible] = useState(false);

  const [setConfirm, ConfirmModal] = useConfirmationModal();
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

  async function handleLeaveCrew() {
    setConfirm({
      text: `Quiter le crew ${userData.crew.name} ?`,
      handle: async () => {
        const { result } = await leaveCrew(token);
        result && forceUpdate();
      },
    });
  }

  async function handleAdmin(isAdmin, memberData) {
    setConfirm({
      text: `${isAdmin ? "Promouvoir" : "Rétrograder"} ${memberData.username} du role administrateurs`,
      handle: async () => {
        const { result } = isAdmin
          ? await promoteToCrewAdmin(token, memberData.uID)
          : await removeFromCrewAdmin(token, memberData.uID);
      },
    });
  }

  async function handleRemoveMember(memberData) {
    setConfirm({
      text: `Retirer ${memberData.username} du crew ?`,
      handle: async () => {
        const { result } = await removeUserFromCrew(token, memberData.uID);
        result && forceUpdate();
      },
    });
  }

  function MemberCard({ memberData, isAdmin, isUser, isUserAdmin }) {
    return (
      <View style={styles.memberCard}>
        <Image
          source={{ uri: memberData.avatar ?? DEFAULT_AVATAR }}
          height={50}
          width={50}
          style={globalStyle.avatar}
        />
        <Text style={globalStyle.subTitle}>{memberData.username}</Text>
        <View style={styles.controlContainer}>
          {isUserAdmin && !isUser && (
            <>
              <StateButton
                iconName="admin-panel-settings"
                activeColor="blue"
                value={isAdmin}
                onPress={(isAdmin) => handleAdmin(isAdmin, memberData)}
                size={30}
                containerStyle={{
                  backgroundColor: "transparent",
                }}
              />
              <Button
                iconName="cancel"
                onPress={() => handleRemoveMember(memberData)}
                size={25}
                containerStyle={{
                  backgroundColor: "transparent",
                }}
              />
            </>
          )}
          {isUser && (
            <Button
              iconName="door-back"
              onPress={handleLeaveCrew}
              size={30}
              containerStyle={{
                backgroundColor: "transparent",
              }}
            />
          )}
        </View>
      </View>
    );
  }

  //Listes des utilisateurs et ajout
  if (userData?.crew) {
    const isUserAdmin = userData.crew.admins.includes(userData.uID);
    return (
      <BackgroundWrapper>
        <Text style={styles.title}>{userData.crew.name}</Text>
        <FlatList
          data={userData.crew.members}
          contentContainerStyle={styles.flatListContainer}
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
        />
        <ModalContent
          visibleState={searchVisible}
          closeHandler={() => setSearchVisible(false)}
          containerStyle={{ ...globalStyle.modalContainer, maxHeight: "95%" }}
        >
          <Button
            iconName="cancel"
            size={25}
            color="white"
            value={false}
            onPress={() => setSearchVisible(false)}
            containerStyle={{
              alignSelf: "flex-end",
              backgroundColor: "transparent",
            }}
          />
          <KeyboardAvoidingView>
            <TextInput
              style={globalStyle.textInput}
              placeholderTextColor={COLOR_PLACEHOLDER}
              placeholder="Nouveau membre"
              onChangeText={handleSearchResult}
            />
          </KeyboardAvoidingView>
          <FlatList
            data={searchResults}
            style={styles.flatListContainer}
            renderItem={({ item }) => (
              <View style={styles.memberCard}>
                <Image
                  source={{ uri: item.avatar ?? DEFAULT_AVATAR }}
                  height={40}
                  width={40}
                  style={globalStyle.avatar}
                />
                <Text style={globalStyle.subSubTitle}>{item.username}</Text>
                <Button
                  iconName="group-add"
                  onPress={() => handleAddMember(item.uID)}
                  color="white"
                  size={25}
                  containerStyle={{
                    backgroundColor: "transparent",
                  }}
                />
              </View>
            )}
          />
        </ModalContent>

        {isUserAdmin && (
          <Button
            iconName="group-add"
            text="Ajouter un membre"
            size={30}
            value={false}
            onPress={setSearchVisible}
            containerStyle={styles.searchButton}
          />
        )}
        {/* Modal de confirmation */}
        <ConfirmModal />
      </BackgroundWrapper>
    );
  }
  //Creation d'un crew
  return (
    <BackgroundWrapper>
      <Text style={globalStyle.screenTitle}>
        Tu n'as pas de crew, fais toi inviter ou crée en un !
      </Text>
      <TextInput
        style={globalStyle.textInput}
        placeholderTextColor={COLOR_PLACEHOLDER}
        onChangeText={setNewCrewName}
        placeholder=" Nom de Ton crew"
      ></TextInput>
      <Button
        iconName="send"
        text="Go"
        textStyle={{
          ...globalStyle.screenTitle,
          fontSize: 32,
          padding: 0,
          lineHeight: 32,
        }}
        containerStyle={styles.createButton}
        color={COLOR_MAIN}
        size={48}
        onPress={handleCreateCrew}
      />
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    ...globalStyle.screenTitle,
    lineHeight: 40,
    margin: 0,
  },
  flatListContainer: {
    width: "80%",
    margin: "2%",
  },
  memberCard: {
    ...globalStyle.flexRow,
    width: "100%",
    justifyContent: "space-between",
    marginVertical: "2%",
  },
  controlContainer: {
    justifyContent: "space-between",
    ...globalStyle.flexRow,
  },
  createButton: {
    padding: 12,
    backgroundColor: "black",
  },
});
