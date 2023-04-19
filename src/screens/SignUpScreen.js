import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import InputField from "../components/InputField";
import api from "../api"; // import the API instance

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/users/signup", {
        email,
        password,
      });

      // If the sign-up is successful, navigate to the LogIn screen
      if (response.status === 201) {
        alert("Sign up successful. Please log in.");
        navigation.navigate("LogIn");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <InputField
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Log In"
        onPress={() => navigation.navigate("LogIn")}
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

export default SignUpScreen;
