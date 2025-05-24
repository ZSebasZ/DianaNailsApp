import express from "express"; //Importamos la libreria 'express'
import {insertPedidoCliente, deletePedidoCliente, getPedidosCliente, getDetallesPedidosCliente, getPedidosClientes, updateEstadoPedido} from "./../controllers/pedidoController.js"

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
router.delete("/delete-pedido-cliente", deletePedidoCliente)

//Creamos la ruta para la OBTENCION de los PEDIDOS del CLIENTE
router.post("/get-pedidos-cliente", getPedidosCliente)
//JSON DE PRUEBA
/*
    {
        "idCliente": 8
    }
*/

//Creamos la ruta para la OBTENCION de los PEDIDOS del CLIENTE
router.get("/get-detalles-pedido-cliente", getDetallesPedidosCliente)
//JSON DE PRUEBA
/*
    {
        "idCliente": 8,
        "idPedido": 6
    }

    //Para administrador
    {
        "idCliente": 8,
        "idPedido": 6,
        "idAdmin": 1
    }
*/

//Creamos la ruta para la OBTENCION de los PEDIDOS
router.post("/get-pedidos-clientes", getPedidosClientes)
//JSON DE PRUEBA
/*
    {
        "idAdmin": 1
    }
*/

//Creamos la ruta para la OBTENCION de los PEDIDOS
router.put("/update-estado-pedido", updateEstadoPedido)
//JSON DE PRUEBA
/*
    {
        "idPedido": 5
    }
*/

export default router;