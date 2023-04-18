import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import InputField from "../components/InputField";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    // Implement log-in functionality here.
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
