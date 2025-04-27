import e from "express";
import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga del LOGIN
const login = (req, res) => {

    //Obtenemos el email y contraseña que el frontend nos envia
    const { email, contrasena } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!email || !contrasena) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Hacemos la query en la base de datos para saber si el email existe
    const queryUsuario = "SELECT * FROM usuarios WHERE email = ?"
    connection.query(queryUsuario, [email], (error, results) => {

        //Si no existe enviamos un mensaje de error
        if (results.length == 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" })
        }

        //De lo contrario obtenemos el usuario
        const usuario = results[0]

        //Si la contraseña no es la correcta enviamos un mensaje de aviso
        if (usuario.contrasena != contrasena) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" })
        }

        //Hacemos la consulta para determinar si es administrador, manicurista o cliente
        const queryTipoUsuario = "SELECT CASE WHEN EXISTS (SELECT 1 FROM administradores WHERE id = ?) THEN 0 WHEN EXISTS (SELECT 1 FROM manicuristas WHERE id = ?) THEN 1 WHEN EXISTS (SELECT 1 FROM clientes WHERE id = ?) THEN 2 ELSE -1 END AS tipo_usuario"
        connection.query(queryTipoUsuario, [usuario.id, usuario.id, usuario.id], (error, result) => {
            //Si no existe enviamos un mensaje de error
            if (result.length == 0) {
                return res.status(404).json({ mensaje: "Error al determinar el tipo de usuario" })
            }

            //Si todo salio bien, devolvemos los datos correspondientes
            const tipoUsuario = parseInt(result[0].tipo_usuario)
            switch (tipoUsuario) {
                //En caso de ser administrador
                case 0:
                    res.json({
                        mensaje: "Sesion iniciada",
                        tipoUsuario: tipoUsuario,
                        usuario: {
                            id: usuario.id,
                            url_umagen: usuario.url_imagen,
                            nombre: usuario.nombre,
                            apellidos: usuario.apellidos,
                            telefono: usuario.telefono,
                            //email: usuario.email,
                        }
                    })
                    break;
                //En caso de ser manicurista
                case 1:
                    //Obtenemos los datos faltantes sobre la manicurista
                    const queryDatosManicurista = "SELECT dni FROM manicuristas WHERE id = ?"
                    connection.query(queryDatosManicurista, [usuario.id], (error, results) => {
                        //Si no existe enviamos un mensaje de error
                        if (results.length == 0) {
                            return res.status(404).json({ mensaje: "Error al obtener los datos de la manicurista" })
                        }

                        res.json({
                            mensaje: "Sesion iniciada",
                            tipoUsuario: tipoUsuario,
                            usuario: {
                                id: usuario.id,
                                url_imagen: usuario.url_imagen,
                                nombre: usuario.nombre,
                                apellidos: usuario.apellidos,
                                telefono: usuario.telefono,
                                //email: usuario.email,
                                dni: results[0].dni,
                            }
                        })
                    })
                    break;
                //En caso de ser cliente
                case 2:
                    //Obtenemos los datos faltantes sobre la manicurista
                    const queryDatosCliente = "SELECT direccion_envio, (SELECT id FROM carritos WHERE id_cliente = ?) as id_carrito FROM clientes WHERE id = ?;"
                    connection.query(queryDatosCliente, [usuario.id, usuario.id], (error, results) => {
                        //Si no existe enviamos un mensaje de error
                        if (results.length == 0) {
                            return res.status(404).json({ mensaje: "Error al obtener los datos del cliente" })
                        }

                        res.json({
                            mensaje: "Sesion iniciada",
                            tipoUsuario: tipoUsuario,
                            usuario: {
                                id: usuario.id,
                                url_umagen: usuario.url_imagen,
                                nombre: usuario.nombre,
                                apellidos: usuario.apellidos,
                                telefono: usuario.telefono,
                                email: usuario.email,
                                direccion_envio: results[0].direccion_envio,
                                id_carrito: results[0].id_carrito
                            }
                        })
                    })
                    break;
            }

        })
    })
}

//Creamos la funcion que se encarga del REGISTRO de USUARIOS-CLIENTES
//Ademas de crear su correspondiente CARRITO
const registerCliente = (req, res) => {

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


                //Hacemos la insercion del carrito del cliente registrado
                const insertCarritoCliente = "INSERT INTO carritos (id_cliente, subtotal) VALUES (?, 0)"
                connection.query(insertCarritoCliente, [idUsuarioInsertado], (error, result) => {
                    //Si ocurre algun error en la insercion, mostramos un mensaje
                    if (error) {
                        return res.status(500).json({ mensaje: "Error al crear el carrito del cliente" });
                    }

                    const idCarritoInsertado = result.insertId;

                    //Si todo el proceso fue exitoso, monstramos un mensaje
                    res.status(201).json({ mensaje: "Cliente registrado con exito. ID usuario: " + idUsuarioInsertado + " - ID cliente: " + idUsuarioInsertado + " - ID carrito: " + idCarritoInsertado });

                })
            })
        })
    })
}

//Creamos la funcion que se encarga del REGISTRO de USUARIOS-MANICURISTAS
const registerManicurista = (req, res) => {

    //Obtenemos el email y contraseña que el frontend nos envia
    const { url_imagen, nombre, apellidos, telefono, email, contrasena, dni } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !apellidos || !telefono || !email || !contrasena || !dni) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Hacemos la query en la base de datos para saber si el email ya existe
    const queryEmailExiste = "SELECT email FROM usuarios WHERE email = ?"
    connection.query(queryEmailExiste, [email], (error, results) => {

        //Si existe enviamos un mensaje de aviso
        if (results.length != 0) {
            return res.status(401).json({ mensaje: "Un usuario con este correo ya existe" })
        }

        //De lo contrario insertamos el nuevo usuario-manicurista
        const insertNuevoUsuario = "INSERT INTO usuarios(url_imagen, nombre, apellidos, telefono, email, contrasena) VALUES (?, ?, ?, ?, ?, ?)"
        connection.query(insertNuevoUsuario, [url_imagen, nombre, apellidos, telefono, email, contrasena], (error, result) => {
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
}

//Creamos la funcion que se encarga de la OBTENCION de las MANICURISTAS
const getManicuristas = (req, res) => {
    //Obtenemos el id del admin
    const { idAdmin } = req.params;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idAdmin && idAdmin == 1) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Obtenemos todas las manicuristas
    const getManicuristas = `SELECT m.id as id_manicurista, url_imagen, nombre, apellidos, telefono, email, dni FROM usuarios as u, manicuristas as m WHERE u.id = m.id`
    connection.query(getManicuristas, (error, results) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al obtener las manicuristas" });
        }
            //Si todo salio bien, enviamos los datos
            res.status(200).json(results)
    })

}

export { login, registerCliente, registerManicurista, getManicuristas }