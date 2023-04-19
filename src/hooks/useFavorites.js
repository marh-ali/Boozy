import { useState } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (business) => {
    const updatedFavorites = [...favorites, business];
    setFavorites(updatedFavorites);
    // TODO: handle duplicates and remove functionality if needed
  };

  return { favorites, addToFavorites };
};

export default useFavorites;
