import { Button, StyleSheet, Text, View } from "react-native";
// import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  return (
    <View>
      <Text>Login Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("TabNavigator")}
      />
    </View>
  );
}
