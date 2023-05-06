import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import styles from "./styles";

const API_KEY = process.env.GOOGLE_API;

const AddressSearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for the address"
        onPress={(data, details = null) => {
          navigation.navigate("BusinessSignUp", {
            address: details.formatted_address,
          });
        }}
        query={{
          key: API_KEY,
          language: "en",
        }}
        styles={{
          container: {
            width: "100%",
          },
          textInputContainer: {
            backgroundColor: "transparent",
          },
          textInput: {
            ...styles.input,
          },
        }}
      />
    </View>
  );
};

export default AddressSearchScreen;
