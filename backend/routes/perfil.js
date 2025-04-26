import express from "express"; //Importamos la libreria 'express'
import {updateDatosPersManicurista, updateDatosPersCliente, deleteCliente} from "./../controllers/perfilController.js"

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

//Creamos la ruta para la ACTUALIZACION de los datos personales de un CLIENTE
router.put("/update-datos-pers-cliente/:id", updateDatosPersCliente)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Cliente1",
        "apellidos": "Actualizado",
        "telefono": "611111111",
        "direccion_envio": "direccion actualizada"
    }
*/

//Creamos la ruta para la ELIMINACION de un CLIENTE
router.delete("/delete-cliente/:idCliente", deleteCliente)
//JSON DE PRUEBA
/*
    {
        "idCliente": 5
    }
*/

export default router;