import express from "express"; //Importamos la libreria 'express'
import {insertPedidoCliente, deletePedidoCliente, getPedidosCliente, getDetallesPedidosCliente, getPedidosClientes, updateEstadoPedido} from "./../controllers/pedidoController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la INSERCION de un PEDIDO
router.patch("/nuevo-pedido-cliente", insertPedidoCliente)

//Creamos la ruta para el BORRADO(cancelar) de un PEDIDO
router.delete("/delete-pedido-cliente", deletePedidoCliente)

//Creamos la ruta para la OBTENCION de los PEDIDOS del CLIENTE
router.post("/get-pedidos-cliente", getPedidosCliente)

//Creamos la ruta para la OBTENCION de los detalles del PEDIDOS del CLIENTE
router.get("/get-detalles-pedido-cliente", getDetallesPedidosCliente)

//Creamos la ruta para la OBTENCION de los PEDIDOS
router.post("/get-pedidos-clientes", getPedidosClientes)

//Creamos la ruta para la ACTUALIZACION del ESTADO de un PEDIDO
router.put("/update-estado-pedido", updateEstadoPedido)

export default router;