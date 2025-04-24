import express from "express"; //Importamos la libreria 'express'
import {getServicios, nuevoServicio, updateServicio} from "./../controllers/serviciosController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de los SERVICIOS
router.get("/get-servicios", getServicios)

//Creamos la ruta para la INSERCION de un nuevo SERVICIO
router.post("/nuevo-servicio", nuevoServicio)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Servicio prueba",
        "precio": 10,
        "horas_requeridas": 2
    }
*/

//Creamos la ruta para la ACTUALIZACION de un nuevo SERVICIO
router.put("/update-servicio/:id", updateServicio)
//JSON DE PRUEBA
/*
    {

        "url_imagen": "",
        "nombre": "Servicio prueba actualizado",
        "precio": 10,
        "horas_requeridas": 2
    }
*/

export default router;