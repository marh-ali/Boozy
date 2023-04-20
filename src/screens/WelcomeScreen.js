import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Easing,
  Dimensions,
} from "react-native";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const gradientColors = ["#ff0084", "#33001b"];
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, { duration: 1500, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={gradientColors}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.logoContainer, animatedStyles]}>
          <Image
            source={require("../assets/logo.png")} // Replace with your own logo image
            style={styles.logo}
          />
          <Animated.Text
            style={[
              styles.appName,
              {
                opacity: scale.value,
              },
            ]}
          >
            Boozy
          </Animated.Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
            style={styles.button}
          />
          <Button
            title="Log In"
            onPress={() => navigation.navigate("LogIn")}
            style={styles.button}
          />
          <Button
            title="Continue as Guest"
            onPress={() => navigation.navigate("Main")}
            style={styles.button}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("BusinessSignUp")}
          >
            <Text style={styles.businessSignUpLink}>I'm a Business</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  gradientBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: width * 0.4,
    height: height * 0.4,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 25,
    paddingHorizontal: 25,
  },
  businessSignUpLink: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
