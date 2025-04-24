import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLOR_MAIN } from "../globalStyle";
import { useEffect, useState } from "react";
import { Image } from "react-native";

///Ces deux boutons sont ceux à utiliser

//Un bouton avec du text et une icone
export function Button({
  iconName,
  size = 20,
  color = "black",
  text = "",
  textStyle,
  containerStyle,
  gap = 0,
  onPress = () => {},
  iconLeft = false,
}) {
  text && iconName && (gap = 15);
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        justifyContent: "space-evenly",
        ...containerStyle,
      }}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {iconLeft ? (
        <>
          {iconName && <Icon name={iconName} size={size} color={color}></Icon>}
          {text && (
            <Text style={{ marginLeft: gap, ...styles.text, ...textStyle }}>
              {text}
            </Text>
          )}
        </>
      ) : (
        <>
          {text && (
            <Text style={{ marginRight: gap, ...styles.text, ...textStyle }}>
              {text}
            </Text>
          )}
          {iconName && <Icon name={iconName} size={size} color={color}></Icon>}
        </>
      )}
    </TouchableOpacity>
  );
}

export function StateButton({
  iconName,
  activeIconName,
  size = 20,
  color = "black",
  activeColor,
  text = "",
  activeText,
  textStyle,
  activeTextStyle,
  containerStyle,
  activeContainerStyle,
  gap,
  onPress = () => {},
  iconLeft = false,
  value,
}) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(value);
  }, [value]);
  return (
    <Button
      onPress={() => {
        onPress(!isActive);
        setIsActive(!isActive);
      }}
      iconName={isActive ? (activeIconName ?? iconName) : iconName}
      color={isActive ? (activeColor ?? color) : color}
      text={isActive ? (activeText ?? text) : text}
      textStyle={ {...textStyle , ...(isActive && activeTextStyle ) }}
      containerStyle={{
        ...containerStyle,
        ...(isActive && activeContainerStyle),
      }}
      {...{
        size,
        gap,
        iconLeft,
      }}
    />
  );
}
//Un Bouton avec une image et un étéat interne (on/off)
export function StateImageButton({
  source,
  value,
  onPress,
  imageStyle,
  activeImageStyle,
  containerStyle,
  textStyle,
  activeTextStyle,
  text,
}) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(value);
  }, [value]);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(!isActive);
        setIsActive(!isActive);
      }}
      style={{ ...styles.container, ...containerStyle }}
    >
      <Image
        {...{ source }}
        style={{ ...imageStyle, ...(isActive && activeImageStyle) }}
      ></Image>
      <Text
        style={{
          ...styles.text,
          ...textStyle,
          ...(isActive && activeTextStyle),
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR_MAIN,
    borderRadius: 10,
    padding: 12,
    margin: 5,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 800,
  },
});
