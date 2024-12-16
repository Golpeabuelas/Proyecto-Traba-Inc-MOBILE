import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity, Animated, Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons"

export default function profileScreen({ route, navigation }) {
    const [barraVisible, setBarraVisible] = useState(false)
    const [filtroSel, setFiltroSel] = useState("Reciente")
    const [publicaciones, setPublicaciones] = useState([])
    const [showSlider, setShowSlider] = useState(false)
    
    const handleLongPress = () => {
        setShowSlider(true);
    };

    const removePost = (id) => {
        setShowSlider(false)
    };

    const saveChanges = async (id_publicacion) => {
        const response = await fetch("http://192.168.0.2:8080/readAPost", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_publicacion })
        })

        const publicacion = await response.json()
        const estatus_desaparicion = publicacion.informacion_desaparicion.estatus_desaparicion
        
        editChanges(id_publicacion, !estatus_desaparicion)
    };

    const editChanges = async (id_publicacion, estatus_desaparicion) => {
        await fetch("http://192.168.0.2:8080/updatePostStatus", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_publicacion, estatus_desaparicion })
        })
    };


    useEffect(() => {
        getOwnPosts(route.params.id_usuario)
    }, [])

    async function getOwnPosts( id_usuario ) {
        const response = await fetch("http://192.168.0.2:8080/readOwnPosts", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario })
        })

        const publicaciones = await response.json()

        const formatoPublicacion = []
        for (let i = 0; i < publicaciones.informacion_Desaparicion.length; i++) {
            formatoPublicacion.push({
                id: publicaciones.informacion_Publicacion[i].id_publicacion, 
                nombre: publicaciones.informacion_Mascota[i].nombre_mascota, 
                especie: publicaciones.informacion_Mascota[i].especie_mascota, 
                detalle: publicaciones.informacion_Mascota[i].distintivo_mascota, 
                img: publicaciones.informacion_Mascota[i].imagen_mascota,
                fecha_desaparición: publicaciones.informacion_Desaparicion[i].fecha_desaparicion,
                estatus_desaparicion: publicaciones.informacion_Desaparicion[i].estatus_desaparicion
            })
        }
        setPublicaciones(formatoPublicacion)
    }

    const animBarra = useState(new Animated.Value(-250))[0];

    const alternarBarra = () => {
        if (barraVisible) {
            Animated.timing(animBarra, {
                toValue: -250,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setBarraVisible(false));
        } else {
            setBarraVisible(true);
            Animated.timing(animBarra, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };
  

  return (
    <View style={estilos.cont_p}>
    
        {barraVisible && (
            <Animated.View style={[estilos.barra_l, { left: animBarra }]}>
            <TouchableOpacity style={estilos.btn_cerrar} onPress={alternarBarra}>
                <Icon name="close-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          
            <TouchableOpacity style={estilos.btn_l}>
                <Icon name="settings-outline" size={24} color="#FFFFFF" style={estilos.icono_btn} />
                <Text style={estilos.texto_btn}>Configuración</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={estilos.btn_l} onPress={() => {navigation.replace("Index", route.params)}}>
                <Icon name="add-circle-outline" size={24} color="#FFFFFF" style={estilos.icono_btn} />
                <Text style={estilos.texto_btn}>Regresar al lobby</Text>
            </TouchableOpacity>
        </Animated.View>
      )}

      
      <View style={estilos.encabezado_c}>
            <TouchableOpacity onPress={alternarBarra}>
                <Icon name="menu" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={estilos.iconos_c}>
                <TouchableOpacity>
                    <Icon name="calendar-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="document-text-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="search-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity>
                <Icon name="chatbubble-ellipses-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
      </View>

      
      <View style={estilos.saludo_c}>
        <View>
            <Text style={estilos.texto_s}>¡Hola {route.params.nombre + '!'}</Text>
            <TextInput
                style={estilos.busqueda_i}
                placeholder="¿Qué quieres hacer?"
                placeholderTextColor="#999"
            />
        </View>
        <Image source={route.params.foto_usuario} style={estilos.perfil_i} />
      </View>

      <View style={estilos.seccion_e}>
            <Text style={estilos.texto_s}>¿Los has visto?</Text>
            <TouchableOpacity>
                <Text style={estilos.ver_todo}>Ver todo</Text>
            </TouchableOpacity>
      </View>

      <ScrollView horizontal style={estilos.filtros_c}>
        <TouchableOpacity
            style={[
                estilos.filtro_btn,
                filtroSel === "Reciente" ? estilos.filtro_act : null,
            ]}
            onPress={() => {
                setFiltroSel("Reciente");
                cambiarFiltroReciente(route.params.id_usuario);
            }}
        >
            <Text
                style={
                filtroSel === "Reciente" ? estilos.filtro_t_a : estilos.texto_f
                }
            >
                Reciente
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
                estilos.filtro_btn,
                filtroSel === "Antiguos" ? estilos.filtro_act : null,
            ]}
            onPress={() => {
                setFiltroSel("Antiguos");
                cambiarFiltroAntiguos(route.params.id_usuario);
            }}
        >
            <Text
                style={
                filtroSel === "Antiguos" ? estilos.filtro_t_a : estilos.texto_f
                }
            >
                Antiguos
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
                estilos.filtro_btn,
                filtroSel === "Perdidos" ? estilos.filtro_act : null,
            ]}
            onPress={() => {
                setFiltroSel("Perdidos");
                cambiarFiltroPerdidos(route.params.id_usuario);
            }}
        >
            <Text
                style={
                filtroSel === "Perdidos" ? estilos.filtro_t_a : estilos.texto_f
                }
            >
                Perdidos
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
                estilos.filtro_btn,
                filtroSel === "Encontrados" ? estilos.filtro_act : null,
            ]}
            onPress={() => {
                setFiltroSel("Encontrados");
                cambiarFiltroEncontrados(route.params.id_usuario);
            }}
        >
            <Text
                style={
                filtroSel === "Encontrados" ? estilos.filtro_t_a : estilos.texto_f
                }
            >
            Encontrados
            </Text>
        </TouchableOpacity>
      </ScrollView>


        <ScrollView contentContainerStyle={estilos.tarjetas_c}>
            {publicaciones.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onLongPress={() => handleLongPress()} 
                >
                    <View style={estilos.tarjeta_c}>
                        <Image source={{ uri: item.img }} style={estilos.tarjeta_i} />
                        <View style={estilos.tarjeta_cont}>
                            <Text style={estilos.tarjeta_t}>Nombre: {item.nombre}</Text>
                            <Text style={estilos.tarjeta_t}>Especie: {item.especie}</Text>
                            <Text style={estilos.tarjeta_t}>Detalle: {item.detalle}</Text>
                            <Text style={estilos.tarjeta_t}>Fecha desaparición: {item.fecha_desaparición}</Text>
                        </View>

                        {showSlider && (
                        <View style={estilos.sliderContainer}>
                            <TouchableOpacity onPress={() => removePost(item.id)} style={estilos.tacheContainer}>
                                <MaterialIcons name="close" size={24} color="red" />
                            </TouchableOpacity>
                            <Text>{item.estatus_desaparicion == true ? '¿Reporte solucionado?' : 'Activar Reporte'}</Text>

                            <TouchableOpacity onPress={() => saveChanges(item.id)} style={estilos.guardarBtn}>
                                <Text style={estilos.guardarBtnText}>Guardar cambios</Text>
                            </TouchableOpacity>
                        </View>
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>

      
      <TouchableOpacity style={estilos.btn_f}>
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )
}

const estilos = StyleSheet.create({
  cont_p: { 
    flex: 1, 
    backgroundColor: "#F9F9F9" 
  },

  barra_l: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#F8B13C",
    zIndex: 1000,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  btn_cerrar: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  btn_l: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#444",
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },

  icono_btn: { 
    marginRight: 10 
  },

  texto_btn: { 
    fontSize: 16, 
    color: "#FFFFFF", 
    fontWeight: "bold" 
  },

  encabezado_c: {
    backgroundColor: "#F8B13C",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconos_c: { 
    flexDirection: "row", 
    gap: 15 
  },

  saludo_c: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },

  texto_s: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#333" 
  },

  busqueda_i: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    borderColor: "#DDD",
    borderWidth: 1,
    width: 250,
  },

  perfil_i: { 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  },

  seccion_e: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },

  ver_todo: { 
    fontSize: 14, 
    color: "#F8B13C" 
  },

  filtros_c: { 
    flexDirection: "row", 
    paddingHorizontal: 15,
    marginBottom: 10 
  },

  filtro_btn: {
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 30,
  },

  filtro_act: { 
    backgroundColor: "#032B30" 
  },

  texto_f: { 
    color: "#333", 
    fontWeight: "bold", 
    fontSize: 12 
  },

  filtro_t_a: { 
    color: "#FFFFFF", 
    fontWeight: "bold", 
    fontSize: 12 
  },

  tarjetas_c: { 
    paddingHorizontal: 15 
  },

  tarjeta_c: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
    flexDirection: "row",
  },

  tarjeta_i: { 
    width: 120, 
    height: 120, 
    borderRadius: 10 
  },

  tarjeta_cont: { 
    marginLeft: 15, 
    flex: 1, 
    justifyContent: "center" 
  },

  tarjeta_t: { 
    fontSize: 14, 
    color: "#333" 
  },

  btn_f: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F8B13C",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  tacheContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  sliderContainer: {
    width: '20%',
    marginTop: 15,
    alignItems: 'center',
  },
  guardarBtn: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    height: '30',
    alignItems: 'center',
  },
  guardarBtnText: {
    color: '#fff',
    fontSize: 16,
  },
});
 
