import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
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
        const storedId = await AsyncStorage.getItem("userId");
        const storedDisplayName = await AsyncStorage.getItem("displayName");
        const storedEmail = await AsyncStorage.getItem("email");

        if (storedDisplayName || storedEmail) {
          setUser({
            id: storedId,
            displayName: storedDisplayName,
            email: storedEmail,
          });

          // Initialize updatedName and updatedEmail with the current user's name and email
          setUpdatedName(storedDisplayName);
          setUpdatedEmail(storedEmail);
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
  };

  const updateProfile = async () => {
    try {
      console.log("Old name:", await AsyncStorage.getItem("displayName")); //  this line to check the user ID

      const response = await api.put("/users/update", {
        id: await AsyncStorage.getItem("userId"),
        newName: updatedName,
        newEmail: updatedEmail,
      });

      setUser(response.data.user);
      await AsyncStorage.setItem("displayName", response.data.user.displayName);
      await AsyncStorage.setItem("email", response.data.user.email);
      setEditing(false);

      console.log("New Name:", response.data.user.displayName);

      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: {user.displayName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Favorites: {favorites.length}</Text>
      <Button title="Edit Profile" onPress={toggleEdit} />
      {editing && (
        <>
          <TextInput
            style={styles.input}
            value={updatedName}
            onChangeText={(text) => setUpdatedName(text)}
            editable={editing}
          />
          <TextInput
            style={styles.input}
            value={updatedEmail}
            onChangeText={(text) => setUpdatedEmail(text)}
            editable={editing}
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
