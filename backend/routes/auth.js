import express from "express"; //Importamos la libreria 'express'
import {login, registerCliente, registerManicurista} from "./../controllers/authController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para el LOGIN de la aplicacion
router.post("/login", login)
//JSON DE PRUEBA
/*
    {
        "email": "prueba1@gmail.com",
        "contrasena": "abc123."
    }
*/

//Creamos la ruta para el REGISTER-CLIENTE de la aplicacion
router.post("/register-cliente", registerCliente)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Cliente Prueba",
        "apellidos": "Prueba Apellidos",
        "telefono": "666666660",
        "email": "prueba1@gmail.com",
        "contrasena": "abc123.",
        "direccion_envio": ""
    }
*/

//Creamos la ruta para el REGISTER-CLIENTE de la aplicacion
router.post("/register-manicurista", registerManicurista)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Manicurista Prueba",
        "apellidos": "Manicurita Apellidos",
        "telefono": "666666660",
        "email": "mprueba1@diananails.com",
        "contrasena": "abc123.",
        "dni": "11111111A"
    }
*/

export default router;