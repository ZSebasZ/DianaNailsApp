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
    const insertPedidoCliente = "INSERT INTO pedidos (id_cliente, id_metodo_pago, total, estado, fecha) VALUES (?, ?, ?, 'Pendiente de envío', CURRENT_TIMESTAMP())"
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
    const { idPedido } = req.body;

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

//PEDIENTE DE APLICAR SQL CON FILTROS
//Creamos la funcion que se encarga de OBTENER todos los PEDIDOS de un CLIENTE
const getPedidosCliente = (req, res) => {
    //Obtenemos el id del cliente
    const { idCliente, filtro } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCliente || !filtro) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Obtenemos el numero total de pedidos del cliente
    const queryTotalPedidosCliente = "SELECT COUNT(id) AS totalPedidos FROM pedidos WHERE id_cliente = ?"
    connection.query(queryTotalPedidosCliente, [idCliente], (error, result) => {
        //Si ocurre algun error mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al obtener el total del pedidos del cliente" });
        }

        const totalPedidosCliente = parseInt(result[0].totalPedidos)

        if (totalPedidosCliente == 0) {
            //Si el subtotal es 0, indicamos que no hay productos en el carrito
            return res.status(200).json({ mensaje: "No hay pedidos" });
        } else {
            //De lo contrario, obtenemos todos los pedidos del cliente
            const queryPedidosCliente = "SELECT p.id AS idPedido, p.fecha as fechaPedido, p.estado as estadoPedido, pr.nombre as productoNombre, pr.precio as productoPrecio, pp.cantidad as productoCantidad, ROUND(p.total, 2) AS totalPedido FROM pedidos AS p JOIN pedidos_productos AS pp ON p.id = pp.id_pedido JOIN productos AS pr ON pp.id_producto = pr.id WHERE p.id_cliente = ? AND p.estado = ?"
            connection.query(queryPedidosCliente, [idCliente, filtro], (error, results) => {
                //Si ocurre algun error mostramos un mensaje
                if (error) {
                    return res.status(500).json({ mensaje: "Error al obtener los pedidos" });
                }

                // Creamos el JSON de los pedidos del cliente
                const pedidosCliente = [];

                // Creamos un mapa temporal para agrupar pedidos
                const pedidosMap = {};

                results.forEach(row => {
                    const idPedido = row.idPedido;

                    // Si el pedido no existe en el mapa, lo creamos
                    if (!pedidosMap[idPedido]) {
                        pedidosMap[idPedido] = {

                            id: idPedido,
                            fecha: row.fechaPedido,
                            estado: row.estadoPedido,
                            total: row.totalPedido,
                            productos: []

                        };

                        // Lo añadimos al array principal
                        pedidosCliente.push(pedidosMap[idPedido]);
                    }

                    // Añadimos el producto actual al pedido correspondiente
                    pedidosMap[idPedido].productos.push({

                        nombre: row.productoNombre,
                        precio: row.productoPrecio,
                        cantidad: row.productoCantidad

                    });
                });

                //Si todo salio bien, enviamos los datos
                res.status(200).json(pedidosCliente)

            })

        }
    })

}

//Creamos la funcion que se encarga de OBTENER los detalles del PEDIDO de un CLIENTE
const getDetallesPedidosCliente = (req, res) => {
    //Obtenemos el id del cliente y del pedido
    const { idCliente, idPedido, idAdmin } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCliente || !idPedido) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Obtenemos todos los pedidos del cliente
    let queryDetallesPedidoCliente = ""
    if (idAdmin == 1) {
        queryDetallesPedidoCliente = "SELECT CONCAT(u.nombre, ' ', u.apellidos) AS cliente, p.id AS idPedido, p.fecha AS fechaPedido, p.estado AS estadoPedido, pr.nombre AS productoNombre, pp.cantidad AS productoCantidad, ROUND(p.total, 2) AS totalPedido, pr.url_imagen AS urlImgProducto, ROUND((pp.cantidad * pr.precio), 2) AS totalProducto FROM pedidos AS p JOIN clientes AS cl ON p.id_cliente = cl.id JOIN usuarios AS u ON cl.id = u.id JOIN pedidos_productos AS pp ON p.id = pp.id_pedido JOIN productos AS pr ON pp.id_producto = pr.id WHERE p.id_cliente = ? AND p.id = ?"
    } else {
        queryDetallesPedidoCliente = "SELECT p.id AS idPedido, p.fecha as fechaPedido, p.estado as estadoPedido, pr.nombre as productoNombre, pp.cantidad as productoCantidad, ROUND(p.total, 2) AS totalPedido, pr.url_imagen as urlImgProducto, ROUND((pp.cantidad * pr.precio), 2) as totalProducto FROM pedidos AS p JOIN pedidos_productos AS pp ON p.id = pp.id_pedido JOIN productos AS pr ON pp.id_producto = pr.id WHERE p.id_cliente = ? AND p.id = ?"
    }

    connection.query(queryDetallesPedidoCliente, [idCliente, idPedido], (error, results) => {
        //Si ocurre algun error mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al obtener los detalles del pedido" });
        }

        // Creamos el JSON de los pedidos del cliente
        const detallesPedidoCliente = {
            pedido: {},
        };

        // Tomamos el primer resultado para los datos generales del pedido
        const pedidoInfo = results[0];

        if (idAdmin == 1) {
            detallesPedidoCliente.pedido = {
                cliente: pedidoInfo.cliente,
                id: pedidoInfo.idPedido,
                fecha: pedidoInfo.fechaPedido,
                estado: pedidoInfo.estadoPedido,
                total: pedidoInfo.totalPedido,
                productos: []
            };
        } else {
            detallesPedidoCliente.pedido = {
                id: pedidoInfo.idPedido,
                fecha: pedidoInfo.fechaPedido,
                estado: pedidoInfo.estadoPedido,
                total: pedidoInfo.totalPedido,
                productos: []
            };
        }



        // Recorremos todos los productos asociados al pedido
        results.forEach(row => {
            detallesPedidoCliente.pedido.productos.push({
                producto: {
                    imagen: row.urlImgProducto,
                    nombre: row.productoNombre,
                    cantidad: row.productoCantidad,
                    total: row.totalProducto
                }
            });
        });

        //Si todo salio bien, enviamos los datos
        res.status(200).json(detallesPedidoCliente)

    })

}

//PEDIENTE DE APLICAR SQL CON FILTROS
//Creamos la funcion que se encarga de OBTENER todos los PEDIDOS de un CLIENTE
const getPedidosClientes = (req, res) => {
    //Obtenemos el id del admin
    const { idAdmin, filtro } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idAdmin || !filtro) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Obtenemos el numero total de pedidos
    const queryTotalPedidosClientes = "SELECT COUNT(id) AS totalPedidos FROM pedidos"
    connection.query(queryTotalPedidosClientes, (error, result) => {
        //Si ocurre algun error mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al obtener el total del pedidos" });
        }

        const totalPedidosClientes = parseInt(result[0].totalPedidos)

        if (totalPedidosClientes == 0) {
            //Si el subtotal es 0, indicamos que no hay productos en el carrito
            return res.status(200).json({ mensaje: "No hay pedidos" });
        } else {
            //De lo contrario, obtenemos todos los pedidos
            const queryPedidosClientes = `
                SELECT
    CONCAT(u.nombre, ' ', u.apellidos) AS cliente,
    u.url_imagen AS clienteImg,
    p.id AS idPedido,
    p.fecha AS fechaPedido,
    p.estado AS estadoPedido,
    pr.nombre AS productoNombre,
    pr.precio AS productoPrecio,
    pp.cantidad AS productoCantidad,
    ROUND(p.total, 2) AS totalPedido

FROM pedidos AS p

-- JOIN con productos del pedido
JOIN pedidos_productos AS pp ON p.id = pp.id_pedido
JOIN productos AS pr ON pp.id_producto = pr.id

-- JOIN con cliente y usuario
JOIN clientes AS c ON p.id_cliente = c.id
JOIN usuarios AS u ON c.id = u.id

-- Filtro por estado
WHERE p.estado = ?

            `
            connection.query(queryPedidosClientes, [filtro], (error, results) => {
                //Si ocurre algun error mostramos un mensaje
                if (error) {
                    return res.status(500).json({ mensaje: "Error al obtener los pedidos" });
                }

                /// Creamos el JSON de los pedidos del cliente
                const pedidosClientes = [];

                // Creamos un mapa temporal para agrupar pedidos
                const pedidosMap = {};

                results.forEach(row => {
                    const idPedido = row.idPedido;

                    // Si el pedido no existe en el mapa, lo creamos
                    if (!pedidosMap[idPedido]) {
                        pedidosMap[idPedido] = {

                            id: idPedido,
                            cliente: row.cliente,
                            clienteImg: row.clienteImg,
                            fecha: row.fechaPedido,
                            estado: row.estadoPedido,
                            total: row.totalPedido,
                            productos: []

                        };

                        // Lo añadimos al array principal
                        pedidosClientes.push(pedidosMap[idPedido]);
                    }

                    // Añadimos el producto actual al pedido correspondiente
                    pedidosMap[idPedido].productos.push({

                        nombre: row.productoNombre,
                        precio: row.productoPrecio,
                        cantidad: row.productoCantidad

                    });
                });

                //Si todo salio bien, enviamos los datos
                res.status(200).json(pedidosClientes)

            })

        }
    })

}

//Creamos la funcion para ACTUALIZAR le ESTADO del PEDIDO de un CLIENTE
const updateEstadoPedido = (req, res) => {

    //Obtenemos los datos del nuevo producto en el carrito
    const { idPedido, filtro } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idPedido || !filtro) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    let updateEstadoPedido = ""

    switch (filtro) {
        case "Pendiente de envío":
            updateEstadoPedido = "UPDATE pedidos SET estado = 'Enviado' WHERE id = ?"
            break;
        case "Enviado":
            updateEstadoPedido = "UPDATE pedidos SET estado = 'Recibido' WHERE id = ?"
            break;
    }

    connection.query(updateEstadoPedido, [idPedido], (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar el estado del pedido" });
        }

        //De lo contrario, enviamos un mensaje de exito
        res.status(200).json({ mensaje: "Estado del pedido actualizado con exito" })
    })
}

export { insertPedidoCliente, deletePedidoCliente, getPedidosCliente, getDetallesPedidosCliente, getPedidosClientes, updateEstadoPedido }