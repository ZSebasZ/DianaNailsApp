import express from "express"; //Importamos la libreria 'express'
import {getServicios, nuevoServicio} from "./../controllers/serviciosController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la obtencion de los SERVICIOS
router.get("/get-servicios", getServicios)

//Creamos la ruta para la insercion de un nuevo SERVICIO
router.post("/nuevo-servicio", nuevoServicio)

export default router;