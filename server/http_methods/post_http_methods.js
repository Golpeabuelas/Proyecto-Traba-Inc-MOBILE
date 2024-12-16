import { Router } from "express"
import connection from "../connection.js"

const postLoader = Router()

postLoader.post('/crearPublicacion', async (req, res) => {
    const id_usuario = req.body.id_usuario
    const titulo_publicacion = req.body.titulo_publicacion
    const fecha_publicacion = req.body.fecha_publicacion
    const imagen_mascota = req.body.imagen_mascota
    const nombre_mascota = req.body. nombre_mascota
    const especie_mascota = req.body.especie_mascota
    const color_mascota = req.body.color_mascota
    const distintivo_mascota = req.body.distintivo_mascota
    const fecha_desaparicion = req.body.fecha_desaparicion
    const descripcion_desaparicion = req.body.descripcion_desaparicion
    const estatus_reporte = req.body.estatus_reporte
    const latitud = req.body.latitud
    const longitud = req.body.longitud

    try {
        const response = await connection.execute('INSERT INTO publicacion (id_usuario, titulo_publicacion, fecha_publicacion) VALUES (?, ?, ?)', [id_usuario, titulo_publicacion, fecha_publicacion])

        const id_publicacion = response.lastInsertRowid

        await connection.execute('INSERT INTO informacion_mascota (id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota) VALUES (?, ?, ?, ?, ?, ?)', [id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota])

        await connection.execute('INSERT INTO informacion_desaparicion (id_publicacion, fecha_desaparicion, descripcion_desaparicion, estatus_desaparicion, estatus_reporte) VALUES (?, ?, ?, ?, ?)', [id_publicacion, fecha_desaparicion, descripcion_desaparicion, true, estatus_reporte])

        await connection.execute('INSERT INTO ubicacion_desaparicion (id_publicacion, latitud, longitud) VALUES (?, ?, ?)', [id_publicacion, latitud, longitud])

        return res.send(console.log('Publicacion y relaciones hechas correctamente'))
    } catch (error) {
        return res.send(console.log('Error al crear tu publicación'))
    }
})

postLoader.post('/readOwnPosts', async (req, res) => {
    const id_usuario = req.body.id_usuario
    
    const respuesta = {
        informacion_Publicacion: [],
        informacion_Mascota: [],
        informacion_Desaparicion: []
    }

    try {
        const response = await connection.execute('SELECT * FROM publicacion WHERE id_usuario = ?', [id_usuario])

        for(let i = 0; i < response.rows.length; i++) {
            const informacionPublicacion = response.rows[i]
            const id_publicacion = response.rows[i].id_publicacion

            const informacionMascota = await connection.execute('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion])
            const informacionDesaparicion = await connection.execute('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])

            respuesta.informacion_Publicacion.push(informacionPublicacion)
            respuesta.informacion_Mascota.push(informacionMascota.rows[0])
            respuesta.informacion_Desaparicion.push(informacionDesaparicion.rows[0])
        }

        return res.json(respuesta)
    } catch (error) {
        return res.send(console.log('No pudimos traer tus publicaciones'));
    }
})

postLoader.post('/readOtherPosts', async (req, res) => {
    const id_usuario = req.body.id_usuario
    
    const respuesta = {
        informacion_Publicacion: [],
        informacion_Mascota: [],
        informacion_Desaparicion: []
    }

    try {
        const response = await connection.execute('SELECT * FROM publicacion WHERE id_usuario <> ?', [id_usuario])

        for(let i = 0; i < response.rows.length; i++) {
            const informacionPublicacion = response.rows[i]
            const id_publicacion = response.rows[i].id_publicacion

            const informacionMascota = await connection.execute('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion])
            const informacionDesaparicion = await connection.execute('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])

            respuesta.informacion_Publicacion.push(informacionPublicacion)
            respuesta.informacion_Mascota.push(informacionMascota.rows[0])
            respuesta.informacion_Desaparicion.push(informacionDesaparicion.rows[0])
        }

        return res.json(respuesta)
    } catch (error) {
        return res.send(console.log('No pudimos traer tus publicaciones'));
    }
});

postLoader.post('/readAPost', async (req, res) => {
    const id_publicacion = req.body.id_publicacion

    const respuesta = {
        informacion_publicacion: '',
        informacion_mascota: '',
        informacion_desaparicion: '',
        ubicacion_desaparicion: ''
    }

    try {
        const informacionPublicacion = await connection.execute('SELECT * FROM publicacion WHERE id_publicacion = ?', [id_publicacion])
        const informacionMascota = await connection.execute('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion])
        const informacionDesaparicion = await connection.execute('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])
        const ubicacionDesaparicion = await connection.execute('SELECT * FROM ubicacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])

        respuesta.informacion_publicacion = informacionPublicacion.rows[0]
        respuesta.informacion_mascota = informacionMascota.rows[0]
        respuesta.informacion_desaparicion = informacionDesaparicion.rows[0]
        respuesta.ubicacion_desaparicion = ubicacionDesaparicion.rows[0]

        return res.json(respuesta)
    } catch (error) {
        return res.send(console.log('No pudimos traer la información de tu publicación'))
    }
})

postLoader.post('/updatePostStatus', async (req, res) => {
    const id_publicacion = req.body.id_publicacion
    const estatus_desaparicion = req.body.estatus_desaparicion

    try {
        connection.execute('UPDATE informacion_desaparicion SET estatus_desaparicion = ? WHERE id_publicacion = ?', [estatus_desaparicion, id_publicacion])

        return res.send(console.log('Reporte actualizado exitosamente'))
    } catch (error) {
        return res.send(console.log('Error al actualizar tu publicación'))        
    }
})

export default postLoader
