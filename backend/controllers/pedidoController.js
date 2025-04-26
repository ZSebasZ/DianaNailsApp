import connection from "../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la INSERTAR un nuevo PEDIDO
const insertPedidoCliente = (req, res) => {

    //Obtenemos los datos del nuevo producto en el carrito
    const { idCarrito, idCliente, idMetodoPago, total } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCarrito || !idCliente || !idMetodoPago || !total) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Insertamos el nuevo pedido
    const insertPedidoCliente = "INSERT INTO pedidos (id_cliente, id_metodo_pago, total, estado, fecha) VALUES (?, ?, ?, 'Pedido hecho', CURRENT_TIMESTAMP())"
    connection.query(insertPedidoCliente, [idCliente, idMetodoPago, total], (error, result) => {
        //Si ocurre algun error en la insercion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al insertar el nuevo pedido del cliente" });
        }

        //Vaciamos el carrito
        const deleteCarritoProductos = "DELETE FROM carritos_productos WHERE id_carrito = ?"
        connection.query(deleteCarritoProductos, [idCarrito], (error, result) => {
            //Si ocurre algun error en el borrado
            if (error) {
                return res.status(500).json({ mensaje: "Error al vaciar el carrito" });
            }

            //De lo contrario, enviamos un mensaje de exito
            res.status(200).json({ mensaje: "Pedido hecho con exito" })
        })
    })
}

//Creamos la funcion que se encarga de CANCELAR(borrar) un PEDIDO
const deletePedidoCliente = (req, res) => {
    //Obtenemos los datos del nuevo producto en el carrito
    const { idPedido } = req.params;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idPedido) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Iniciamos una transaccion
    connection.beginTransaction((errorPedidoCliente) => {
        //Si hay un error al iniciar la transaccion mostramos un mensaje
        if (errorPedidoCliente) return res.status(500).json({ mensaje: "Error al iniciar la transacción" });

        //Borramos los productos del pedido
        const deleteProductosPedidoCliente = "DELETE FROM pedidos_productos WHERE id_pedido = ?"
        connection.query(deleteProductosPedidoCliente, [idPedido], (error, result) => {
            //Si surge algun error, avisamos con un mensaje
            if (error) {
                return connection.rollback(() => {
                    res.status(500).json({ mensaje: "Error al ejecutar: " + deleteProductosPedidoCliente });
                })
            }

            //Borramos el pedido
            const deletePedidoCliente = "DELETE FROM pedidos WHERE id = ?"
            connection.query(deletePedidoCliente, [idPedido], (error, result) => {
                //Si surge algun error, avisamos con un mensaje
                if (error) {
                    return connection.rollback(() => {
                        res.status(500).json({ mensaje: "Error al ejecutar: " + deletePedidoCliente });
                    })
                }

                // Si todo salió bien, confirmamos la transacción
                connection.commit((error) => {
                    if (error) {
                        return connection.rollback(() => {
                            res.status(500).json({ mensaje: "Error al confirmar la transacción" });
                        });
                    }

                    res.status(201).json({ mensaje: "Pedido cancelado con exito" });
                });

            })

        })

    })
}

export { insertPedidoCliente, deletePedidoCliente }