import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import api from "../api"; // import the API instance

const MainScreen = () => {
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

  return (
    <View style={styles.container}>
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
});

export default MainScreen;
