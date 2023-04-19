import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import LogInScreen from "./src/screens/LogInScreen";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import HappyHourDetailsScreen from "./src/screens/HappyHourDetailsScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import BusinessDashboardScreen from "./src/screens/BusinessDashboardScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HappyHourDetails"
          component={HappyHourDetailsScreen}
        />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen
          name="BusinessDashboard"
          component={BusinessDashboardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
