import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import globalStyle from "../globalStyle";

//Un button avec un icon
export function IconButton({
  iconName = "user",
  size = 20,
  color = "black",
  containerStyle,
  onPress = () => {},
}) {
  Icon;
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
//Un button avec du texte
export function TextButton({
  text = "",
  textStyle,
  containerStyle,
  onPress = () => {},
}) {
  Icon;
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

//Un bouton avec du text et une icone
export function IconTextButton({
  iconName = "user",
  size = 20,
  color = "black",
  text = "",
  textStyle,
  containerStyle,
  gap = 15,
  onPress = () => {},
  iconLeft = false,
}) {
  return (
    <TouchableOpacity
      style={{
        ...globalStyle.flexRow,
        justifyContent: "space-evenly",
        ...containerStyle,
      }}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {iconLeft ? (
        <>
          <Icon name={iconName} size={size} color={color}></Icon>
          <Text style={{ marginLeft: gap, ...textStyle }}>{text}</Text>
        </>
      ) : (
        <>
          <Text style={{ marginRight: gap, ...textStyle }}>{text}</Text>
          <Icon name={iconName} size={size} color={color}></Icon>
        </>
      )}
    </TouchableOpacity>
  );
}

//Un button avec un icone et un état interne (on/off)
export function StateIconButton({
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

//Un button avec du texte et un état interne (on/off)
export function StateTextButton({
  text = "",
  containerStyle,
  activeStyle,
  inactiveStyle,
  textStyle,
  value,
  onPress = () => {},
}) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(value);
  }, [value]);

  return (
    <TextButton
      onPress={() => {
        onPress(!isActive);
        setIsActive(!isActive);
      }}
      containerStyle={{
        ...containerStyle,
        ...(isActive ? activeStyle : inactiveStyle),
      }}
      {...{
        text,
        size,
        textStyle,
      }}
    />
  );
}
