import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import useBusinesses from "../../hooks/useBusinesses";
import useFavorites from "../../hooks/useFavorites";
import useLocationPermission from "../../hooks/useLocationPermission";

const MainScreen = ({ navigation }) => {
  const businesses = useBusinesses();
  const { favorites, addToFavorites } = useFavorites();
  const [selectedTab, setSelectedTab] = useState("nearby");

  useLocationPermission();

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
  useBusinesses();
  useFavorites();

  const renderTabContent = () => {
    if (selectedTab === "nearby") {
      return (
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
              onPress={() => addToFavorites(business)}
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
      );
    } else {
      return (
        <View style={styles.favoritesContainer}>
          {favorites.length > 0 ? (
            <FlatList
              data={favorites}
              renderItem={({ item }) => (
                <View style={styles.favoriteItem}>
                  <Text style={styles.favoriteName}>{item.name}</Text>
                  <Text style={styles.favoriteAddress}>
                    {item.location.address}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <Text style={styles.noFavoritesText}>
              Keep track of your favorite spots!
            </Text>
          )}
        </View>
      );
    }
  };

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
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "nearby" && styles.selectedTab]}
          onPress={() => setSelectedTab("nearby")}
        >
          <Text style={styles.tabText}>Businesses Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "favorites" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("favorites")}
        >
          <Text style={styles.tabText}>My Favorites</Text>
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  );
};

export default MainScreen;
