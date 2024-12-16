import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/home_screen";
import LoginScreen from "./src/sign_in_screen"; 
import RegistroScreen from "./src/sign_up_screen"; 
import indexScreen from "./src/indexScreen";
import profileScreen from "./src/profileScreen";
const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Index" : "Home"}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Iniciar Sesión" }}
        />
        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
          options={{ title: "Regístrate" }} 
        />
        <Stack.Screen
          name="Index"
          component={indexScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Profile"
          component={profileScreen}
          options={{ title: "Perfil" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
