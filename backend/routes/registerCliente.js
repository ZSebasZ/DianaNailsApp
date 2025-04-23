import express from "express"; //Importamos la libreria 'express'
import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para el REGISTER-CLIENTE de la aplicacion
router.post("/register-cliente", (req, res) => {
    //Obtenemos el email y contraseña que el frontend nos envia
    const { url_imagen, nombre, apellidos, telefono, email, contrasena, direccion_envio } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !apellidos || !telefono || !email || !contrasena) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Hacemos la query en la base de datos para saber si el email ya existe
    const queryEmailExiste = "SELECT email FROM usuarios WHERE email = ?"
    connection.query(queryEmailExiste, [email], (error, results) => {

        //Si existe enviamos un mensaje de aviso
        if (results.length != 0) {
            return res.status(401).json({ mensaje: "Un cliente con este correo ya existe" })
        }

        //De lo contrario insertamos el nuevo usuario-cliente
        const insertNuevoUsuario = "INSERT INTO usuarios(url_imagen, nombre, apellidos, telefono, email, contrasena) VALUES (?, ?, ?, ?, ?, ?)"
        connection.query(insertNuevoUsuario, [url_imagen, nombre, apellidos, telefono, email, contrasena], (error, result) => {
            //Si ocurre algun error en la insercion, mostramos un mensaje
            if (error) {
                return res.status(500).json({ mensaje: "Error al registrar el usuario" });
            }

            //Obtenemos el id del usuario insertado
            const idUsuarioInsertado = result.insertId;

            //Hacemos la insercion del nuevo cliente
            const insertNuevoCliente = "INSERT INTO clientes(id, direccion_envio) VALUES (?, ?)"
            connection.query(insertNuevoCliente, [idUsuarioInsertado, direccion_envio], (error, result) => {
                //Si ocurre algun error en la insercion, mostramos un mensaje
                if (error) {
                    return res.status(500).json({ mensaje: "Error al registrar el cliente" });
                }

                //Si todo el proceso fue exitoso, monstramos un mensaje
                res.status(201).json({ mensaje: "Cliente registrado con exito. ID usuario: " +  idUsuarioInsertado + " - ID cliente: " + idUsuarioInsertado});
            })
        })
    })
})

export default router;