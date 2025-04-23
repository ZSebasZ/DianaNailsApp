import express from "express"; //Importamos la libreria 'express'
import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para el LOGIN de la aplicacion
router.post("/login", (req, res) => {
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
})

export default router;