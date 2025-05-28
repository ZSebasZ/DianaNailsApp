import express from "express"; //Importamos la libreria 'express'
import {getProductos, getProductosAdmin, getProductoDetalles, nuevoProducto, getProducto, updateProducto} from "./../controllers/productosController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de los SERVICIOS
router.get("/get-productos", getProductos)

//Creamos la ruta para la OBTENCION de los PRODUCTOS - ADMIN
router.post("/get-productos-admin", getProductosAdmin)

//Creamos la ruta para la OBTENCION de los detalles de un PRODUCTO
router.get("/get-producto-detalles", getProductoDetalles)

//Creamos la ruta para la INSERCION de un nuevo PRODUCTO
router.post("/nuevo-producto", nuevoProducto)

//Creamos la ruta para la OBTENCION de un PRODUCTO - ADMIN
router.post("/get-producto", getProducto)

//Creamos la ruta para la ACTUALIZACION de un nuevo PRODUUCTO
router.put("/update-producto", updateProducto)



export default router;