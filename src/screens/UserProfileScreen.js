import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

const UserProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: John Doe</Text>
      <Text>Email: john@example.com</Text>
      <Text>Favorites: 3</Text>
      <Text>Reviews: 5</Text>
      <Button title="Edit Profile" onPress={() => {}} />
      <Button title="Log Out" onPress={() => navigation.navigate("Welcome")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default UserProfileScreen;
