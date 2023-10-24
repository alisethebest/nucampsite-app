import React from "react";
import { Platform, View } from "react-native";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import HomeScreen from "./HomeScreen";
import DirectoryScreen from "./DirectoryScreen";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import AboutScreen from "./AboutScreen" // Import AboutScreen
import ContactScreen from "./ContactScreen"; // Import ContactScreen

const HomeNavigator = () => {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "#5637DD" },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "#5637DD" },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ title: "Campsite Directory" }}
      />
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        options={({ route }) => ({
          title: route.params.campsite.name,
        })}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <HomeNavigator />
    </View>
  );
};

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      {/* Wrap your navigation with NavigationContainer */}
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{ title: "Directory" }}
        />
        <Drawer.Screen
          name="About" // Add About screen to Drawer Navigator
          component={AboutScreen}
          options={{ title: "About" }}
        />
        <Drawer.Screen
          name="Contact" // Add Contact screen to Drawer Navigator
          component={ContactScreen}
          options={{ title: "Contact Us" }}
        />
      </Drawer.Navigator>
    </NavigationContainer> // Close NavigationContainer
  );
};

export default MainNavigator;
