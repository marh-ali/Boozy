import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

const BusinessDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Dashboard</Text>
      <Button title="Add/Update Happy Hour" onPress={() => {}} />
      <Button title="View Reviews" onPress={() => {}} />
      <Button title="Manage Account" onPress={() => {}} />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
});

export default BusinessDashboardScreen;
