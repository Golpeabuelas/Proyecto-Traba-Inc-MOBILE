import { Router } from "express";
import connection from "../connection.js";

const userLoader = Router()

userLoader.post('/buscarSesionExistente', async (req, res) => {
    const correo = req.body.correo

    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE correo = ?', [correo])

        if ( response.rows.length === 0) { 
            return res.json({ correoDisponible: true })
        }

        if ( response.rows.length > 0) {
            return res.json({ correoDisponible: false })
        }
    } catch (error) {
        return res.send(console.log('Error al buscar sesión'))
    }
})

userLoader.post('/otorgarPermisos', (req, res) => {
    const password = req.body.password

    if( password === 'Tr4b4_1nc_4dm1n1str4d0r' ){
        return res.json({ permisos: true })
    }

    return res.json({ permisos: false })
})

userLoader.post('/iniciarSesion', async (req, res) => {
    const correo = req.body.correo
    const password = req.body.password

    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE correo = ?', [correo])

        if ( response.rows.length === 0 ) {
            return res.json({ Correo: false, Acceso: false})
        }

        if ( password === response.rows[0].password) {
            return res.json({ Response: response.rows[0], Acceso: true })
        }

        if ( password !== response.rows[0].password) {
            return res.json({ Acceso: false })
        }
    } catch (error) {
        return console.log('Ocurrió un error al iniciar sesión', error)
    }
})

userLoader.post('/getUserID', async (req, res) => {
    const correo = req.body.correo

    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE correo = ?', [correo])

        return res.json({ id_usuario: response.rows[0].id_usuario })
    } catch (error) {
        return res.send(console.log('Error al buscar la id del usuario'))
    }
})

userLoader.post('/getUserInformation', async (req, res) => {
    const id_usuario = req.body.id_usuario
    
    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario])

        return res.json({ nombre: response.rows[0].nombre, foto: response.rows[0].foto_usuario, id_dueño: id_usuario })
    } catch (error) {
        return res.send(console.log('Error al buscar la información del usuario'))
    }
})

userLoader.post('/aniadirUsuario', async  (req, res) => {
    const nombre = req.body.nombre
    const correo = req.body.correo
    const password = req.body.password
    const foto_usuario = req.body.foto_usuario
    const permisos = req.body.permisos
    const latitud = req.body.latitud
    const longitud = req.body.longitud

    try {
        const response = await connection.execute('INSERT INTO usuario (nombre, correo, password, foto_usuario, permisos) VALUES (?, ?, ?, ?, ?)', [nombre, correo, password, foto_usuario, permisos])

        const id_usuario = response.lastInsertRowid

        await connection.execute('INSERT INTO ubicacion_usuario (id_usuario, latitud, longitud) VALUES (?, ?, ?)', [id_usuario, latitud, longitud])

        return res.json({ id_usuario: parseInt(id_usuario) })
    } catch (error) {
        return res.send(console.log('Error al añadir nueva sesión', error))
    }
})

userLoader.post('/editarUsuario', (req, res) => {
    const id_usuario = req.body.id_usuario
    const nombre = req.body.nombre
    const password = req.body.password
    const permisos = req.body.permisos

    connection.query('UPDATE usuario SET (nombre = ?, password = ?, permisos = ? WHERE id_usuario = ?)', [nombre, password, permisos, id_usuario], (error, response) => {
        if ( error ) {
            res.status(400).send(console.log('Error al editar datos del usuario', error))
        }

        if ( response.affectedRows === 0 ) {
            res.status(404).send(console.log('Usuario no encontrado'))
        }

        console.log('Sesión actualizada exitosamente')
        res.json(response)
    })
})

userLoader.post('/borrarUsuario', (req, res) => {
    id_usuario = req.body.id_usuario

    connection.query('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], (error, response) => {
        if ( error ) {
            res.status(400).send(console.log('Error al eliminar la sesión', error))
        }

        if ( response.affectedRows === 0 ) {
            res.status(404).send(console.log('Usuario no encontrado'))
        }

        res.send(console.log('Usuario eliminado exitosamente'))
    })
})

export default userLoader