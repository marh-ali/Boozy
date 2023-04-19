import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import styles from "../screens/MainScreen/styles";
const FavoriteButton = ({ business, favorites, setFavorites }) => {
  const isFavorited = favorites.some((fav) => fav.businessId === business._id);

  const handleHeartClick = async () => {
    const userId = await AsyncStorage.getItem("userId");

    if (isFavorited) {
      try {
        const response = await api.delete(
          `/users/${userId}/favorites/${business._id}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );

        if (response.status === 200) {
          const updatedFavorites = favorites.filter(
            (fav) => fav.businessId !== business._id
          );
          setFavorites(updatedFavorites);
        } else {
          console.error("Failed to remove favorite");
        }
      } catch (error) {
        console.error("Error:", error.response.data.message);
      }
    } else {
      try {
        const response = await api.post(
          `/users/${userId}/favorites/${business._id}`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );

        if (response.status === 200) {
          const newFavorite = response.data.favoriteSpot;
          setFavorites([...favorites, newFavorite]);
        } else {
          console.error("Failed to add favorite");
        }
      } catch (error) {
        console.error("Error:", error.response.data.message);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleHeartClick}>
      <Icon
        name="heart"
        size={24}
        color={isFavorited ? "lightpink" : "grey"}
        style={styles.heartIcon}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
