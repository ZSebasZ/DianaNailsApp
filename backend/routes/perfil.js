import express from "express"; //Importamos la libreria 'express'
import {updateDatosPersManicurista} from "./../controllers/perfilController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la ACTUALIZACION de los datos personales de una MANICURISTA
router.put("/update-datos-pers-manicurista/:id", updateDatosPersManicurista)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Manicurista actualizada",
        "apellidos": "Actualizada",
        "telefono": "600000000"
    }
*/

export default router;