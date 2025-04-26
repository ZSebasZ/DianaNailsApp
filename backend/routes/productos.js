import express from "express"; //Importamos la libreria 'express'
import {getProductos} from "./../controllers/productosController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de los SERVICIOS
router.get("/get-productos", getProductos)

export default router;