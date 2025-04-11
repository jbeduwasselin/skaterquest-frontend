import React from "react";
import {
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export interface IconButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  iconName: string;
  activeOpacity?: number | null;
  style?: (StyleProp<ViewStyle> & object) | null;
  iconColor?: string;
  iconSize?: number;
}

export default function IconButton({
  iconName,
  onPress,
  activeOpacity,
  style,
  iconColor = "black",
  iconSize = 20,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.6}
      style={{ ...styles.container, ...style }}
    >
      <FontAwesome name={iconName} color={iconColor} size={iconSize} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
