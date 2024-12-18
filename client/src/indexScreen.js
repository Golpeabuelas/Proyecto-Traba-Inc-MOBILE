import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity, Animated, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function indexScreen({ route, navigation }) {
  const [barraVisible, setBarraVisible] = useState(false);
  const [filtroSel, setFiltroSel] = useState("Reciente");
  const [publicaciones, setPublicaciones] = useState([]);
  const [valorBusqueda, setValorBusqueda] = useState('');

  useEffect(() => {
    getOtherPosts(route.params.id_usuario)
  }, [])

  async function getOtherPosts( id_usuario ) {
    const response = await fetch("http://192.168.20.165:8080/readOtherPosts", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_usuario })
    })

    const publicaciones = await response.json()

    const formatoPublicacion = []
    for (let i = 0; i < publicaciones.informacion_Desaparicion.length; i++) {
      if ( publicaciones.informacion_Desaparicion[i].estatus_desaparicion== true ) {
        formatoPublicacion.push({
          id: publicaciones.informacion_Publicacion[i].id_publicacion, 
          nombre: publicaciones.informacion_Mascota[i].nombre_mascota, 
          especie: publicaciones.informacion_Mascota[i].especie_mascota, 
          detalle: publicaciones.informacion_Mascota[i].distintivo_mascota, 
          img: publicaciones.informacion_Mascota[i].imagen_mascota,
          fecha_desaparición: publicaciones.informacion_Desaparicion[i].fecha_desaparicion
        })
      }
    }
    setPublicaciones(formatoPublicacion)
  }

  const filtros = ["Reciente", "Antiguos", "Perdidos", "Encontrados"];
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

  const cambiarFiltroReciente = async (id_usuario) => {
    const response = await fetch("http://192.168.20.165:8080/readOtherPosts", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_usuario })
    })

    const publicaciones = await response.json()
    const formatoPublicacion = []

    for (let i = 0; i < publicaciones.informacion_Desaparicion.length; i++) {
      if ( publicaciones.informacion_Desaparicion[i].estatus_desaparicion == true ) {
        formatoPublicacion.push({
          id: publicaciones.informacion_Publicacion[i].id_publicacion, 
          nombre: publicaciones.informacion_Mascota[i].nombre_mascota, 
          especie: publicaciones.informacion_Mascota[i].especie_mascota, 
          detalle: publicaciones.informacion_Mascota[i].distintivo_mascota, 
          img: publicaciones.informacion_Mascota[i].imagen_mascota,
          fecha_desaparición: publicaciones.informacion_Desaparicion[i].fecha_desaparicion
        })
      }
    }

    const publicacionesOrdenadas = ordenarPorFecha(formatoPublicacion);

    setPublicaciones(publicacionesOrdenadas)
  }
  
  const ordenarPorFecha = (publicaciones) => {
    return publicaciones.sort((a, b) => {
      const fechaA = new Date(a.fecha_desaparición)
      const fechaB = new Date(b.fecha_desaparición)
  
      return fechaB - fechaA
    })
  }
  
  const ordenarPorFechaAntigua = (publicaciones) => {
    return publicaciones.sort((a, b) => {
      const fechaA = new Date(a.fecha_desaparición);
      const fechaB = new Date(b.fecha_desaparición);
      return fechaA - fechaB;
    })
  }

  const cambiarFiltroAntiguos = async (id_usuario) => {
    const response = await fetch("http://192.168.20.165:8080/readOtherPosts", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_usuario })
    })

    const publicaciones = await response.json()
    const formatoPublicacion = []

    for (let i = 0; i < publicaciones.informacion_Desaparicion.length; i++) {
      if ( publicaciones.informacion_Desaparicion[i].estatus_desaparicion == true ) {
        formatoPublicacion.push({
          id: publicaciones.informacion_Publicacion[i].id_publicacion, 
          nombre: publicaciones.informacion_Mascota[i].nombre_mascota, 
          especie: publicaciones.informacion_Mascota[i].especie_mascota, 
          detalle: publicaciones.informacion_Mascota[i].distintivo_mascota, 
          img: publicaciones.informacion_Mascota[i].imagen_mascota,
          fecha_desaparición: publicaciones.informacion_Desaparicion[i].fecha_desaparicion
        })
      }
    }

    const publicacionesOrdenadas = ordenarPorFechaAntigua(formatoPublicacion);

    setPublicaciones(publicacionesOrdenadas)
  }
  
  const cambiarFiltroPerdidos = async (id_usuario) => {
    const response = await fetch("http://192.168.20.165:8080/readOtherPosts", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_usuario })
    })

    const publicaciones = await response.json()

    const formatoPublicacion = []
    for (let i = 0; i < publicaciones.informacion_Desaparicion.length; i++) {      
      

      if ( publicaciones.informacion_Desaparicion[i].estatus_desaparicion == true ) {
        if ( publicaciones.informacion_Desaparicion[i].estatus_reporte == true) {
          formatoPublicacion.push({
            id: publicaciones.informacion_Publicacion[i].id_publicacion, 
            nombre: publicaciones.informacion_Mascota[i].nombre_mascota, 
            especie: publicaciones.informacion_Mascota[i].especie_mascota, 
            detalle: publicaciones.informacion_Mascota[i].distintivo_mascota, 
            img: publicaciones.informacion_Mascota[i].imagen_mascota,
            fecha_desaparición: publicaciones.informacion_Desaparicion[i].fecha_desaparicion
          })
        }
      }
    }
    setPublicaciones(formatoPublicacion)
  }
  
  const cambiarFiltroEncontrados = async (id_usuario) => {
    const response = await fetch("http://192.168.20.165:8080/readOtherPosts", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_usuario })
    })

    const publicaciones = await response.json()

    const formatoPublicacion = []
    for (let i = 0; i < publicaciones.informacion_Desaparicion.length; i++) {
      if ( publicaciones.informacion_Desaparicion[i].estatus_desaparicion== true) {
        if ( publicaciones.informacion_Desaparicion[i].estatus_reporte == false) {
          formatoPublicacion.push({
            id: publicaciones.informacion_Publicacion[i].id_publicacion, 
            nombre: publicaciones.informacion_Mascota[i].nombre_mascota, 
            especie: publicaciones.informacion_Mascota[i].especie_mascota, 
            detalle: publicaciones.informacion_Mascota[i].distintivo_mascota, 
            img: publicaciones.informacion_Mascota[i].imagen_mascota,
            fecha_desaparición: publicaciones.informacion_Desaparicion[i].fecha_desaparicion
          })
        }
      }
    }
    setPublicaciones(formatoPublicacion)
  }

  const buscarPorNombre = async (id_usuario, nombre) => {
    const response = await fetch('http://192.168.20.165:8080/buscarPorNombre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_usuario, nombre })
    })

    const publicaciones = await response.json()

    const formatoPublicacion = []
    for (let i = 0; i < publicaciones.informacion_Desaparicion.length; i++) {
      if ( publicaciones.informacion_Desaparicion[i].estatus_desaparicion == true) {
        if ( publicaciones.informacion_Desaparicion[i].estatus_reporte == true) {
          formatoPublicacion.push({
            id: publicaciones.informacion_Publicacion[i].id_publicacion, 
            nombre: publicaciones.informacion_Mascota[i].nombre_mascota, 
            especie: publicaciones.informacion_Mascota[i].especie_mascota, 
            detalle: publicaciones.informacion_Mascota[i].distintivo_mascota, 
            img: publicaciones.informacion_Mascota[i].imagen_mascota,
            fecha_desaparición: publicaciones.informacion_Desaparicion[i].fecha_desaparicion
          })
        }
      }
    }
    setPublicaciones(formatoPublicacion)
  }

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
          <TouchableOpacity style={estilos.btn_l} onPress={() => {navigation.replace("Profile", route.params)}}>
            <Icon name="add-circle-outline" size={24} color="#FFFFFF" style={estilos.icono_btn} />
            <Text style={estilos.texto_btn}>Ir a tu perfil</Text>
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
          <TextInput style={estilos.busqueda_i} placeholder="¿Qué quieres hacer?" placeholderTextColor="#999" value={valorBusqueda} onChangeText={setValorBusqueda}/>
          <TouchableOpacity onPress={() => buscarPorNombre(route.params.id_usuario, valorBusqueda)}>
            Buscar por Nombre
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {navigation.replace("Profile", route.params)}}>
          <Image source={route.params.foto_usuario} style={estilos.perfil_i} />
        </TouchableOpacity>
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
          <View key={item.id} style={estilos.tarjeta_c}>
            <Image source={item.img} style={estilos.tarjeta_i} />
            <View style={estilos.tarjeta_cont}>
              <Text style={estilos.tarjeta_t}>Nombre: {item.nombre}</Text>
              <Text style={estilos.tarjeta_t}>Edad: {item.especie}</Text>
              <Text style={estilos.tarjeta_t}>Detalle: {item.detalle}</Text>
              <Text style={estilos.tarjeta_t}>Fecha desaparición: {item.fecha_desaparición}</Text>
            </View>
          </View>
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
});
 
