import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Boozy</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
        style={styles.button}
      />
      <Button
        title="Log In"
        onPress={() => navigation.navigate("LogIn")}
        style={styles.button}
      />
      <Button
        title="Continue as Guest"
        onPress={() => navigation.navigate("Main")}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    marginBottom: 10,
  },
});

export default WelcomeScreen;
