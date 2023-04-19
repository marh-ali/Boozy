import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const response = await api.get("/businesses");
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    }

    fetchBusinesses();
  }, []);

  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    async function fetchDisplayName() {
      try {
        const storedDisplayName = await AsyncStorage.getItem("displayName");
        if (storedDisplayName) {
          setDisplayName(storedDisplayName);
        }
      } catch (error) {
        console.error("Error fetching display name:", error);
      }
    }

    fetchDisplayName();
  }, []);

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("displayName");
      setDisplayName(null);
      navigation.navigate("LogIn");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
    <Text style={styles.userProfileButton}>Profile</Text>
  </TouchableOpacity>;

  <TouchableOpacity onPress={signOut}>
    <Text style={styles.signOutButton}>Sign Out</Text>
  </TouchableOpacity>;

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        {displayName ? (
          <>
            <View style={styles.menu}>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserProfile")}
              >
                <Text style={styles.userProfileButton}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={signOut}>
                <Text style={styles.signOutButton}>Sign Out</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bannerText}>Hey, {displayName}!</Text>
          </>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Text style={styles.bannerText}>Login to save your spots!</Text>
          </TouchableOpacity>
        )}
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 38.89511, // Washington DC coordinates
          longitude: -77.03637,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {businesses.map((business) => (
          <Marker
            key={business._id}
            coordinate={{
              latitude: business.location.coordinates[1],
              longitude: business.location.coordinates[0],
            }}
          >
            <Callout>
              <View>
                <Text style={{ fontWeight: "bold" }}>{business.name}</Text>
                <Text>{business.location.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  banner: {
    backgroundColor: "rgba(95, 158, 160, 0.9)", // TODO: change the color
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 18,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  userProfileButton: {
    color: "#fff",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  signOutButton: {
    color: "#fff",
    fontSize: 18,
    textDecorationLine: "underline",
    marginLeft: 10,
  },
});

export default MainScreen;
