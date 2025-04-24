import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga del LOGIN
const login = (req, res) => {

    //Obtenemos el email y contraseña que el frontend nos envia
    const {email, contrasena} = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!email || !contrasena) {
        return res.status(400).json({mensaje: "Campos incompletos"})
    }

    //Hacemos la query en la base de datos para saber si el email existe
    const queryUsuario = "SELECT * FROM usuarios WHERE email = ?"
    connection.query(queryUsuario, [email], (error, results) => {
        
        //Si no existe enviamos un mensaje de error
        if(results.length == 0) {
            return res.status(404).json({mensaje: "Usuario no encontrado"})
        }

        //De lo contrario obtenemos el usuario
        const usuario = results[0]

        //Si la contraseña no es la correcta enviamos un mensaje de aviso
        if(usuario.contrasena != contrasena) {
            return res.status(401).json({mensaje: "Contraseña incorrecta"})
        }

        //Si todo esta correcta, enviamos un mensaje indicando el inicio correcto de sesion
        res.json({
            mensaje: "Sesion iniciada",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
            }
        })
    })
}

//Creamos la funcion que se encarga del REGISTRO de USUARIOS-CLIENTES
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

                //Si todo el proceso fue exitoso, monstramos un mensaje
                res.status(201).json({ mensaje: "Cliente registrado con exito. ID usuario: " +  idUsuarioInsertado + " - ID cliente: " + idUsuarioInsertado});
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

            //Hacemos la insercion del nuevo cliente
            const insertNuevoCliente = "INSERT INTO manicuristas(id, dni, estrellas) VALUES (?, ?, ?)"
            connection.query(insertNuevoCliente, [idUsuarioInsertado, dni, 5], (error, result) => {
                //Si ocurre algun error en la insercion, mostramos un mensaje
                if (error) {
                    return res.status(500).json({ mensaje: "Error al registrar la manicurista" });
                }

                //Si todo el proceso fue exitoso, monstramos un mensaje
                res.status(201).json({ mensaje: "Manicurista registrada con exito. ID usuario: " +  idUsuarioInsertado + " - ID manicurista: " + idUsuarioInsertado});
            })
        })
    })
}

export {login, registerCliente, registerManicurista}