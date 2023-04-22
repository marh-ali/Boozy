import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSignOut = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("displayName");
      setIsSignedOut(true);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    isSignedOut,
    signOut,
  };
};

export default useSignOut;
