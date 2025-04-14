// Import des composants de React-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Imports des screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import GosPlayScreen from "./screens/GosPlayScreen";
import MapScreen from "./screens/MapScreen";
import FriendScreen from "./screens/FriendScreen";
import CrewScreen from "./screens/CrewScreen";
import VideoScreen from "./screens/VideoScreen";
import TricksScreen from "./screens/TricksScreen";
import AppSettingsScreen from "./screens/AppSettingsScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Imports de Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import des états
import user from "./reducers/user";

// Initialisation du store
const store = configureStore({
  reducer: { user },
});

// Création de la navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="GosPlayScreen" component={GosPlayScreen} />
      <Tab.Screen name="MapScreen" component={MapScreen} />
      <Tab.Screen name="FriendScreen" component={FriendScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="CrewScreen" component={CrewScreen} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} />
          <Stack.Screen name="TricksScreen" component={TricksScreen} />
          <Stack.Screen
            name="AppSettingsScreen"
            component={AppSettingsScreen}
          />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
