import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    async function handleLogin (correo, password) {      
      try {
        const response = await fetch("http://192.168.20.165:8080/iniciarSesion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo, password })
        });

        const data = await response.json();
        
        if (data.Acceso) {
          navigation.replace("Index", data.Response)
        } else {
          Alert.alert("Error", "Correo o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error al iniciar sesión");
        Alert.alert("Error", "No se pudo conectar con el servidor");
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../img/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Follow Pet</Text>
        <Text style={styles.subtitle}>SOCIAL MEDIA</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#A4A4A4"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#A4A4A4"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password)}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6F2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F8B13C",
  },
  subtitle: {
    fontSize: 14,
    color: "#555555",
  },
  form: {
    width: "100%",
    backgroundColor: "#F8B13C",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#000000",
  },
  button: {
    backgroundColor: "#032B30",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
