  import React from "react";
  import { View, StyleSheet, Text, Image } from "react-native";
  import * as Animatable from "react-native-animatable";

  const SplashScreen = () => {
    return (
      <View style={styles.container}>
        <Animatable.Image
          animation="bounce"
          iterationCount="infinite"
          source={require("../img/pet.png")}
          style={styles.logo}
        />
      <Animatable.Text animation="fadeIn" delay={500} style={styles.title}>  
          Follow Pet
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={1000}
          style={styles.subtitle}
        > <Text style={styles.text}>Cuídate a ti y a tu mascota, sé feliz junto a ella</Text>
        </Animatable.Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#032B30",
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    subtitle: {
      fontSize: 16,
      color: "#FFFFFF",
      textAlign: "center",
      marginTop: 10,
    },
    text: {
      marginInline: 5
    }
  });

  export default SplashScreen;
