import React from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import globalStyle, { BACKGROUND } from "../globalStyle";

export default function BackgroundWrapper({
  children,
  flexJustify,
  flexAlign,
}) {
  return (
    <ImageBackground
      source={BACKGROUND}
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
