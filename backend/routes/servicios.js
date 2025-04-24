import express from "express"; //Importamos la libreria 'express'
import {getServicios} from "./../controllers/serviciosController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para el la obtencion de los SERVICIOS
router.post("/get-servicios", getServicios)

export default router;