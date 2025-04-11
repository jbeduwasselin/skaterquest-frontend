import React from "react";
import {
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Text,
} from "react-native";

export interface TextButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  activeOpacity?: number | null;
  containerStyle?: (StyleProp<ViewStyle> & object) | null;
  textStyle?: (StyleProp<ViewStyle> & object) | null;
}

export default function TextButton({
  onPress,
  activeOpacity,
  containerStyle = null,
  textStyle = null,
  title,
}: TextButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.6}
      style={{ ...styles.container, ...containerStyle }}
    >
      <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight : 30,
    minWidth : 30,
    backgroundColor : "red",
    borderRadius : 5,
    borderColor : "black",
    borderWidth : 2,
    padding : 5,
    margin : 2 
  },
  text: {
    textAlign : "center"
  },
});
