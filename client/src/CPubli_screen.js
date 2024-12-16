import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

 
const PostScreen_c = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    description: "",
    image: "",
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Formulario enviado:", form);
  };

  return (
    <View style={styles.Contenedor_p}>
      <View style={styles.Header_c}>
        <Text style={styles.Titulo_t}>Publicar</Text>
        <TouchableOpacity>
          <Icon name="close-outline" size={width * 0.07} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contenido_c={styles.Formulario_c}>
        <TextInput
          style={styles.Input_f}
          placeholder="Nombre del perro"
          placeholderTextColor="#999"
          value={form.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />

        <TextInput
          style={styles.Input_f}
          placeholder="Edad (ej. 2 años)"
          placeholderTextColor="#999"
          value={form.age}
          onChangeText={(text) => handleInputChange("age", text)}
        />

        <TextInput
          style={[styles.Input_f, styles.TextArea_f]}
          placeholder="Descripción o características"
          placeholderTextColor="#999"
          multiline
          value={form.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />

        <TouchableOpacity style={styles.ImagenSubir_b}>
          <Icon name="camera-outline" size={width * 0.06} color="#FFFFFF" />
          <Text style={styles.TextoBoton_t}>Subir imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.BotonPublicar_b} onPress={handleSubmit}>
          <Text style={styles.TextoPublicar_t}>Publicar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Contenedor_p: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  Header_c: {
    backgroundColor: "#F8B13C",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Titulo_t: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  Formulario_c: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  Input_f: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: width * 0.04,
    borderColor: "#DDD",
    borderWidth: 1,
    marginBottom: height * 0.02,
    color: "#333",
    fontSize: width * 0.04,
  },
  TextArea_f: {
    height: height * 0.15,
    textAlignVertical: "top",
  },
  ImagenSubir_b: {
    backgroundColor: "#032B30",
    borderRadius: 10,
    padding: width * 0.04,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  TextoBoton_t: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  BotonPublicar_b: {
    backgroundColor: "#F8B13C",
    borderRadius: 10,
    padding: width * 0.04,
    alignItems: "center",
  },
  TextoPublicar_t: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});

export default PostScreen_c;
