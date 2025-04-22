import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import globalStyle from "../globalStyle";

export default function BackgroundWrapper({ children }) {
  return (
    <ImageBackground
      source={require("../assets/Autre fond.png")}
      style={globalStyle.container}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyle.container}>{children}</SafeAreaView>
    </ImageBackground>
  );
}
