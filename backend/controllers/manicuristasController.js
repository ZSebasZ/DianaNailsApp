import connection from "./../db/connection.js"; //Importamos nuestra conexion
import bcrypt from "bcrypt"; //Usamos bcrypt para encriptar la contraseña
import { regex } from "../utils/regexCamposUtils.js";

//Creamos la funcion que se encarga de la OBTENCION de las MANICURISTAS - ADMIN
const getManicuristas = (req, res) => {

    //Obtenemos el id del admin
    const { idAdmin } = req.body;

    if (!idAdmin) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Sentencia SQL para la obtencion de las manicuristas
    const queryObtenerManicuristas = `
        SELECT u.id, CONCAT(u.nombre, ' ', u.apellidos) as manicurista, u.url_imagen FROM usuarios as u JOIN manicuristas as m ON u.id = m.id
    `

    //Hacemos la query para la obtencion de las manicuristas
    connection.query(queryObtenerManicuristas, (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error obtener los productos" });
        }

        //De lo contrario, enviamos las manicuristas obtenidos
        res.status(200).json(results)
    })
}

//Creamos la funcion que se encarga del REGISTRO de USUARIOS-MANICURISTAS
const nuevaManicurista = (req, res) => {

    //Obtenemos el email y contraseña que el frontend nos envia
    const { url_imagen, nombre, apellidos, telefono, email, contrasena, dni } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !apellidos || !telefono || !email || !contrasena || !dni) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    if (!regex.nombre.test(nombre) || !regex.apellidos.test(apellidos) || !regex.telefono.test(telefono) || !regex.emailDianaNails.test(email) || !regex.dniNie.test(dni) || !regex.contrasena.test(contrasena)) {
        return res.status(400).json({ mensaje: "Los campos no cumplen con el formato correcto" })
    }

    //Hacemos la query en la base de datos para saber si el email ya existe
    const queryEmailExiste = "SELECT email FROM usuarios WHERE email = ?"
    connection.query(queryEmailExiste, [email], (error, results) => {

        //Si existe enviamos un mensaje de aviso
        if (results.length != 0) {
            return res.status(401).json({ mensaje: "Un usuario con este correo ya existe" })
        }

        bcrypt.hash(contrasena, 10, (error, hash) => {
            //Si ocurre algun error en la encriptacion, lo mostramos
            if (error) {
                return res.status(500).json({ mensaje: "Error al encriptar la contraseña" });
            }

            //De lo contrario insertamos el nuevo usuario-manicurista
            const insertNuevoUsuario = "INSERT INTO usuarios(url_imagen, nombre, apellidos, telefono, email, contrasena) VALUES (?, ?, ?, ?, ?, ?)"
            connection.query(insertNuevoUsuario, [url_imagen, nombre, apellidos, telefono, email, hash], (error, result) => {
                //Si ocurre algun error en la insercion, mostramos un mensaje
                if (error) {
                    return res.status(500).json({ mensaje: "Error al registrar el usuario" });
                }

                //Obtenemos el id del usuario insertado
                const idUsuarioInsertado = result.insertId;

                //Hacemos la insercion de la nueva manicurista
                const insertNuevoCliente = "INSERT INTO manicuristas(id, dni) VALUES (?, ?)"
                connection.query(insertNuevoCliente, [idUsuarioInsertado, dni], (error, result) => {
                    //Si ocurre algun error en la insercion, mostramos un mensaje
                    if (error) {
                        return res.status(500).json({ mensaje: "Error al registrar la manicurista" });
                    }

                    //Si todo el proceso fue exitoso, monstramos un mensaje
                    res.status(201).json({ mensaje: "Manicurista registrada con exito. ID usuario: " + idUsuarioInsertado + " - ID manicurista: " + idUsuarioInsertado });
                })
            })

        })

    })
}

const getManicurista = (req, res) => {

    //Obtenemos el id del admin
    const { idManicurista } = req.body;

    if (!idManicurista) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Sentencia SQL para la obtencion de las manicuristas
    const queryObtenerManicurista = `
        SELECT u.url_imagen, m.dni, u.nombre, u.apellidos, u.telefono, u.email FROM usuarios as u JOIN manicuristas as m ON u.id = m.id WHERE u.id = ?
    `

    //Hacemos la query para la obtencion de las manicuristas
    connection.query(queryObtenerManicurista, [idManicurista], (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error obtener los productos" });
        }

        //De lo contrario, enviamos las manicuristas obtenidos
        res.status(200).json(results)
    })
}

const updateManicurista = (req, res) => {

    //Obtenemos el id del servicio a actualizat
    const { idManicurista } = req.body

    //Obtenemos los nuevos datos del servicio
    const { url_imagen, nombre, apellidos, telefono } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!url_imagen || !nombre || !apellidos || !telefono) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    if (!regex.nombre.test(nombre) || !regex.apellidos.test(apellidos) || !regex.telefono.test(telefono)) {
        return res.status(400).json({ mensaje: "Los campos no cumplen con el formato correcto" })
    }

    //Sentencia SQL para actualizar el servicio
    const updateManicurista = "UPDATE usuarios SET url_imagen = ?, nombre = ?, apellidos = ?, telefono = ? WHERE id = ?"

    //Hacemos la actualizacion del servicio
    connection.query(updateManicurista, [url_imagen, nombre, apellidos, telefono, idManicurista], (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar la manicurista" });
        }

        //Comprobamos si alguna fila se actualizó
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "manicurista no encontrado" });
        }

        //Si todo el proceso fue exitoso, monstramos un mensaje
        res.status(200).json({ message: "manicurista actualizado correctamente" });
    })

}

export { getManicuristas, nuevaManicurista, getManicurista, updateManicurista }

