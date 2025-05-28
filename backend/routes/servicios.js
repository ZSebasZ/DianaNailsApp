import express from "express"; //Importamos la libreria 'express'
import {getServicios, nuevoServicio, getServicio, updateServicio} from "./../controllers/serviciosController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de los SERVICIOS
router.get("/get-servicios", getServicios)

//Creamos la ruta para la INSERCION de un nuevo SERVICIO
router.post("/nuevo-servicio", nuevoServicio)

//Creamos la ruta para la OBTENCION de los SERVICIOS - ADMIN
router.post("/get-servicio", getServicio)

//Creamos la ruta para la ACTUALIZACION de un nuevo SERVICIO
router.put("/update-servicio", updateServicio)

export default router;