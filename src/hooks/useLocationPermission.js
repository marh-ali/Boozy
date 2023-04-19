import { useEffect } from "react";
import * as Location from "expo-location";

const useLocationPermission = () => {
  async function requestLocationPermission() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        // Fetch nearby businesses based on latitude and longitude
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);
};

export default useLocationPermission;
