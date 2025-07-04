import express from "express"; //Importamos la libreria 'express'
import {insertCarritoProducto, updateCarritoProducto, deleteCarritoProducto, getCarritoProductos, vaciarCarrito} from "./../controllers/carritoController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la INSERCION de un PRODUCTO en el CARRITO
router.post("/nuevo-carrito-producto", insertCarritoProducto)

//Creamos la ruta para la ACTUALIZACION (o borrado) de un PRODUCTO en el CARRITO
router.patch("/update-carrito-producto", updateCarritoProducto)

//Creamos la ruta para el BORRADO de un PRODUCTO en el CARRITO
router.delete("/delete-carrito-producto", deleteCarritoProducto)

//Creamos la ruta que OBTIENE todos los PRODUCTOS del CARRITO de un CLIENTE
router.post("/get-carrito-productos", getCarritoProductos)

//Creamos la ruta para el BORRADO de todos los PRODUCTOS en el CARRITO
router.delete("/vaciar-carrito", vaciarCarrito)


export default router;