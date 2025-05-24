import express from "express"; //Importamos la libreria 'express'
import { getManicuristas, nuevaManicurista, getManicurista, updateManicurista } from "../controllers/manicuristasController.js";

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de las MANICURISTAS
router.post("/get-manicuristas", getManicuristas)

//Creamos la ruta para el REGISTER-CLIENTE de la aplicacion
router.post("/nueva-manicurista", nuevaManicurista)
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

//Creamos la ruta para la OBTENCION de la MANICURISTAS
router.post("/get-manicurista", getManicurista)

//Creamos la ruta para el ACTUALIZAR la MANICURISTA
router.put("/update-manicurista", updateManicurista)

export default router;