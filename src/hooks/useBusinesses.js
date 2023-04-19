import { useState, useEffect } from "react";
import api from "../api";

const useBusinesses = () => {
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

  return businesses;
};

export default useBusinesses;
