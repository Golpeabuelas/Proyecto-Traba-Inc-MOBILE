import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import SplashScreen from "./LoadScreen";
import Svg, { Circle } from "react-native-svg";
import * as Animatable from "react-native-animatable";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
        <Svg height="100%" width="100%" style={styles.svgBackground}>
            <Circle cx="50%" cy="15%" r="60" fill="#F8B13C" />
            <Circle cx="80%" cy="47%" r="80" fill="#FFE194" />
            <Circle cx="30%" cy="57%" r="80" fill="#F8B13C" />
            <Circle cx="80%" cy="76%" r="70" fill="#FFE194" />
            <Circle cx="10%" cy="30%" r="50" fill="#F8B13C" />
            <Circle cx="90%" cy="26%" r="60" fill="#FFE194" />
            <Circle cx="15%" cy="80%" r="50" fill="#F8B13C" />
            <Circle cx="50%" cy="90%" r="50" fill="#F8B13C" />
        </Svg>
          <Animatable.View animation="fadeInUp" delay={500} style={styles.content}>
            <Image source={require("../img/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Follow Pet</Text>
            <Text style={styles.subtitle}>SOCIAL MEDIA</Text>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate("Registro")}
            >
              <Text style={styles.buttonText}>Regístrate</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6F2",
    justifyContent: "center",
    alignItems: "center",
  },
  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    alignItems: "center",
    marginTop: -50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F8B13C",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#032B30",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#5AA2AB",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
