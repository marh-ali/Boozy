import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
} from "react-native";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import api from "../../api";
import styles from "./styles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Modal from "react-native-modal";

const API_KEY = process.env.API_KEY;

// #TODO: Fix Google autocomplete

const BusinessSignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [offersFood, setOffersFood] = useState(false);
  const [offersDrinks, setOffersDrinks] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [menu, setMenu] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleBusinessSignUp = async () => {
    try {
      const response = await api.post("/businesses", {
        name,
        email,
        password,
        location: {
          address,
          city,
          state,
          country,
          postalCode,
          coordinates, // Coordinates should now be set by the GooglePlacesAutocomplete component
        },
        happyHour: {
          offersFood,
          offersDrinks,
          times: [
            {
              dayOfWeek,
              start,
              end,
            },
          ],
          menu,
        },
      });

      if (response.status === 201) {
        alert("Business registration successful!");
        navigation.navigate("LogIn");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      alert("Error registering business. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.welcomeText}>Thank you for joining Boozy!</Text>
      <Text style={styles.title}>Business Sign Up</Text>
      <InputField
        value={name}
        onChangeText={setName}
        placeholder="Business Name"
        style={styles.input}
      />
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
      <TouchableOpacity onPress={toggleModal}>
        <InputField
          value={address}
          editable={false}
          placeholder="Search for the address"
          style={styles.input}
        />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              setAddress(details.formatted_address);
              toggleModal();
            }}
            query={{
              key: API_KEY,
              language: "en",
              components: "country:us",
              fetchDetails: true,
            }}
          />
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>

      <InputField
        value={menu}
        onChangeText={setMenu}
        placeholder="Happy Hour Menu URL"
        style={styles.input}
      />
      <Text style={styles.label}>Offers Food</Text>

      <Switch
        value={offersFood}
        onValueChange={setOffersFood}
        style={styles.switch}
      />

      <Text style={styles.label}>Offers Drinks</Text>
      <Switch
        value={offersDrinks}
        onValueChange={setOffersDrinks}
        style={styles.switch}
      />

      <InputField
        value={dayOfWeek}
        onChangeText={setDayOfWeek}
        placeholder="Happy Hour Day (e.g. Monday)"
        style={styles.input}
      />
      <InputField
        value={start}
        onChangeText={setStart}
        placeholder="Happy Hour Start Time (e.g. 17:00)"
        style={styles.input}
      />
      <InputField
        value={end}
        onChangeText={setEnd}
        placeholder="Happy Hour End Time (e.g. 19:00)"
        style={styles.input}
      />

      <Button title="Sign Up" onPress={handleBusinessSignUp} />
    </KeyboardAvoidingView>
  );
};

export default BusinessSignUpScreen;
