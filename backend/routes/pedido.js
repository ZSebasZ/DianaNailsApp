import express from "express"; //Importamos la libreria 'express'
import {insertPedidoCliente, deletePedidoCliente} from "./../controllers/pedidoController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la INSERCION de un PEDIDO
router.patch("/nuevo-pedido-cliente", insertPedidoCliente)
//JSON DE PRUEBA
/*
    {
        "idCarrito": 1,
        "idCliente": 7,
        "idMetodoPago": 5,
        "total": 55.5
    }
*/

//Creamos la ruta para el BORRADO(cancelar) de un PEDIDO
router.delete("/delete-pedido-cliente/:idPedido", deletePedidoCliente)


export default router;