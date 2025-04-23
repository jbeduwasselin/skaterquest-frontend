import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import globalStyle from "../globalStyle";

export default function BackgroundWrapper({ children , flexJustify , flexAlign }) {
  return (
    <ImageBackground
      source={require("../assets/Autre fond.png")}
      style={globalStyle.container}
      resizeMode="cover"
    >
      <SafeAreaView
        style={{
          ...globalStyle.container,
          justifyContent: flexJustify ?? "flex-start",
          alignItems: flexAlign ?? "center",
        }}
      >
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}
