import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Rating = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: "#f1c40f",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Rating;
