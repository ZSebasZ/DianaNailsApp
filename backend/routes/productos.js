import express from "express"; //Importamos la libreria 'express'
import {getProductos, getProductoDetalles, nuevoProducto} from "./../controllers/productosController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de los SERVICIOS
router.get("/get-productos", getProductos)

//Creamos la ruta para la OBTENCION de los SERVICIOS
router.get("/get-producto-detalles", getProductoDetalles)

//Creamos la ruta para la INSERCION de un nuevo PRODUCTO
router.post("/nuevo-producto", nuevoProducto)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Producto prueba",
        "descripcion": "Descripcion nuevo producto",
        "precio": 14.50,
        "stock": 10
    }
*/

export default router;