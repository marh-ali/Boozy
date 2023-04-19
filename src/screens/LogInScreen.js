import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native"; // Add Alert here
import Button from "../components/Button";
import InputField from "../components/InputField";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("displayName", response.data.displayName);
      await AsyncStorage.setItem("email", response.data.email);
      await AsyncStorage.setItem("userId", response.data.userId);

      navigation.navigate("Main");
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <InputField
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <InputField
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Log In" onPress={handleLogIn} />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 15,
  },
});

export default LogInScreen;
