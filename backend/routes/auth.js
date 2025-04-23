import express from "express"; //Importamos la libreria 'express'
import {login, registerCliente} from "./../controllers/authController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para el LOGIN de la aplicacion
router.post("/login", login)

//Creamos la ruta para el REGISTER-CLIENTE de la aplicacion
router.post("/register-cliente", registerCliente)

export default router;