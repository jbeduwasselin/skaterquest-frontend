// Import des composants de React-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/Feather";

// Imports des screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import GosPlayScreen from "./screens/GosPlayScreen";
import GosVersusScreen from "./screens/GosVersusScreen";
import GosVersusScreenBis from "./screens/GosVersusScreenBis";
import MapScreen from "./screens/MapScreen";
import FriendScreen from "./screens/FriendScreen";
import CrewScreen from "./screens/CrewScreen";
import VideoScreen from "./screens/VideoScreen";
import TricksScreen from "./screens/TricksScreenZB";
import AppSettingsScreen from "./screens/AppSettingsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AddSpotScreen from "./screens/AddSpotScreen";
import SpotScreen from "./screens/SpotScreen";

// Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { PersistGate } from "redux-persist/integration/react";
import { combineReducers } from "redux";

import user from "./reducers/user";
import spot from "./reducers/spot";
import tricks from "./reducers/tricks";

// Persist config
// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// };

// const rootReducer = combineReducers({ user });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// const persistor = persistStore(store);
const store = configureStore({
  reducer: {
    user,
    tricks,
    spot,
  },
});

// Création de la navigation
// Création de la navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1e1e1e",
          borderTopWidth: 0,
          height: 70,
          elevation: 10,
          shadowColor: "#FF650C",
          shadowOpacity: 0.25,
          shadowRadius: 6,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "GoS":
              iconName = "target";
              break;
            case "Spots":
              iconName = "map";
              break;
            case "Amis":
              iconName = "users";
              break;
          }
          return (
            <Icon
              name={iconName}
              size={focused ? 28 : 24}
              color={focused ? "#FF650C" : "#fff"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="GoS" component={GosPlayScreen} />
      <Tab.Screen name="Spots" component={MapScreen} />
      <Tab.Screen name="Amis" component={FriendScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
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
          <Stack.Screen name="AddSpotScreen" component={AddSpotScreen} />
          <Stack.Screen name="SpotScreen" component={SpotScreen} />
          <Stack.Screen name="GosVersusScreen" component={GosVersusScreen} />
          <Stack.Screen
            name="GosVersusScreenBis"
            component={GosVersusScreenBis}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}
