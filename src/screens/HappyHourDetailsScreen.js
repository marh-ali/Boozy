import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Rating from "../components/Rating";

const HappyHourDetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Happy Hour Name</Text>
      <Rating rating={4.5} />
      <Text style={styles.description}>
        Happy Hour description and details...
      </Text>
      <Button title="Add to Favorites" onPress={() => {}} />
      <Button title="Rate" onPress={() => {}} />
      <Button title="Write a Review" onPress={() => {}} />
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
  description: {
    marginBottom: 20,
  },
});

export default HappyHourDetailsScreen;
