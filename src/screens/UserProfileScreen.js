import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import Button from "../components/Button";

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const storedDisplayName = await AsyncStorage.getItem("displayName");
        const storedEmail = await AsyncStorage.getItem("email");

        console.log("Stored Display Name:", storedDisplayName); // Add console log
        console.log("Stored Email:", storedEmail); // Add console log

        if (storedDisplayName || storedEmail) {
          setUser({ name: storedDisplayName, email: storedEmail });
        }
        // Fetch favorites (replace this with actual implementation)
        setFavorites([{ id: "1" }, { id: "2" }, { id: "3" }]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, []);

  const toggleEdit = () => {
    setEditing(!editing);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
  };

  const updateProfile = async () => {
    // Perform PUT request to update user profile
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Favorites: {favorites.length}</Text>
      <Button title="Edit Profile" onPress={toggleEdit} />
      {editing && (
        <>
          <TextInput
            style={styles.input}
            value={updatedName}
            onChangeText={setUpdatedName}
            placeholder="New Name"
          />
          <TextInput
            style={styles.input}
            value={updatedEmail}
            onChangeText={setUpdatedEmail}
            placeholder="New Email"
          />
          <Button title="Save Changes" onPress={updateProfile} />
        </>
      )}
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          // Replace this with your HappyHourDetailsScreen component
          <View>
            <Text>Favorite: {item.id}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
});

export default UserProfileScreen;
