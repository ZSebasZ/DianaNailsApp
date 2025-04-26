import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la ACTUALIZACION de los datos personales de una MANICURISTA
const updateDatosPersManicurista = (req, res) => {

    //Obtenemos el id de la manicurista a actualizat
    const { id } = req.params

    //Obtenemos los datos enviados
    const { url_imagen, nombre, apellidos, telefono } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !apellidos || !telefono) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Setencia SQL para actualizar los datos personales de la manicurista
    const updateDatosPersManicurista = "UPDATE usuarios SET url_imagen = ?, nombre = ?, apellidos = ?, telefono = ? WHERE id = ?"
    //Hacemos la actualizacion 
    connection.query(updateDatosPersManicurista, [url_imagen, nombre, apellidos, telefono, id], (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar los datos de la manicurista" });
        }

        //Comprobamos si alguna fila se actualizó
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Manicurista no encontrada" });
        }

        //Si todo el proceso fue exitoso, monstramos un mensaje
        res.status(200).json({ message: "Manicurista actualizada correctamente" });
    })
}

//Creamos la funcion que se encarga de la ACTUALIZACION de los datos personales de un CLIENTE
const updateDatosPersCliente = (req, res) => {

    //Obtenemos el id del cliente a actualizat
    const { id } = req.params

    //Obtenemos los datos enviados
    const { url_imagen, nombre, apellidos, telefono, direccion_envio } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !apellidos || !telefono) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Setencia SQL para actualizar los datos personales del cliente
    const updateDatosPersCliente = "UPDATE usuarios SET url_imagen = ?, nombre = ?, apellidos = ?, telefono = ? WHERE id = ?"
    //Hacemos la actualizacion 
    connection.query(updateDatosPersCliente, [url_imagen, nombre, apellidos, telefono, id], (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar los datos del cliente" });
        }

        //Comprobamos si alguna fila se actualizó
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        //Setencia SQL para actualizar la direccion de envio del cliente
        const updateDatosPersCliente = "UPDATE clientes SET direccion_envio = ? WHERE id = ?"
        //Hacemos la actualizacion 
        connection.query(updateDatosPersCliente, [direccion_envio, id], (error, result) => {
            //Si ocurre algun error en la actualizacion, mostramos un mensaje
            if (error) {
                return res.status(500).json({ mensaje: "Error al actualizar los datos del cliente" });
            }

            //Comprobamos si alguna fila se actualizó
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Cliente no encontrado" });
            }

            //Si todo el proceso fue exitoso, monstramos un mensaje
            res.status(200).json({ message: "Cliente actualizado correctamente" });
        })
    })
}

//Creamos la funcion que se encarga de la ELIMINACION de la cuenta de un CLIENTE y todos sus datos relacionados
const deleteCliente = (req, res) => {

    //Obtenemos el id del cliente a eliminar
    const { idCliente } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCliente) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Iniciamos una transaccion
    connection.beginTransaction((errorEliminarCliente) => {
        //Si hay un error al iniciar la transaccion mostramos un mensaje
        if (errorEliminarCliente) return res.status(500).json({ mensaje: "Error al iniciar la transacción" });

        //Borramos todas las opiniones del cliente
        const deleteOpinionesCliente = "DELETE FROM opiniones WHERE id_cliente = ?"
        connection.query(deleteOpinionesCliente, [idCliente], (error, result) => {
            //Si surge algun error, avisamos con un mensaje
            if (error) {
                return connection.rollback(() => {
                    res.status(500).json({ mensaje: "Error al ejecutar: " + deleteOpinionesCliente });
                })
            }

            //Obtenemos todas las citas del cliente
            const queryCitasCliente = "SELECT id FROM citas WHERE id_cliente = ?"
            connection.query(queryCitasCliente, [idCliente], (error, results) => {
                //Si surge algun error, avisamos con un mensaje
                if (error) {
                    return connection.rollback(() => {
                        res.status(500).json({ mensaje: "Error al ejecutar: " + queryCitasCliente });
                    })
                }

                if (results.length > 0) {
                    const idsCitasCliente = results.map(row => row.id).join(",");

                    //Borramos todas las citas_horas del cliente
                    const deleteCitasHorasCliente = "DELETE FROM citas_horas WHERE id_cita IN (?)"
                    connection.query(deleteCitasHorasCliente, [idsCitasCliente], (error, result) => {
                        //Si surge algun error, avisamos con un mensaje
                        if (error) {
                            return connection.rollback(() => {
                                res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCitasHorasCliente });
                            })
                        }

                        //Borramos todas las citas_servicios del cliente
                        const deleteCitasServiciosCliente = "DELETE FROM citas_servicios WHERE id_cita IN (?)"
                        connection.query(deleteCitasServiciosCliente, [idsCitasCliente], (error, result) => {
                            //Si surge algun error, avisamos con un mensaje
                            if (error) {
                                return connection.rollback(() => {
                                    res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCitasServiciosCliente });
                                })
                            }
                        })
                    })
                } else {
                    //Borramos todas las citas del cliente
                    const deleteCitasCliente = "DELETE FROM citas WHERE id_cliente = ?"
                    connection.query(deleteCitasCliente, [idCliente], (error, result) => {
                        //Si surge algun error, avisamos con un mensaje
                        if (error) {
                            return connection.rollback(() => {
                                res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCitasCliente });
                            })
                        }

                        //Obtenemos todas las pedidos del cliente
                        const queryPedidosCliente = "SELECT id FROM pedidos WHERE id_cliente = ?"
                        connection.query(queryPedidosCliente, [idCliente], (error, results) => {
                            //Si surge algun error, avisamos con un mensaje
                            if (error) {
                                return connection.rollback(() => {
                                    res.status(500).json({ mensaje: "Error al ejecutar: " + queryPedidosCliente });
                                })
                            }

                            if (results.length > 0) {
                                const idsPedidosCliente = results.map(row => row.id).join(",");

                                //Borramos todos los pedidos_productos del cliente
                                const deletePedidosProductos = "DELETE FROM pedidos_productos WHERE id_pedido IN (?)"
                                connection.query(deletePedidosProductos, [idsPedidosCliente], (error, result) => {
                                    //Si surge algun error, avisamos con un mensaje
                                    if (error) {
                                        return connection.rollback(() => {
                                            res.status(500).json({ mensaje: "Error al ejecutar: " + deletePedidosProductos });
                                        })
                                    }
                                })
                            } else {
                                //Borramos todos los pedidos del cliente
                                const deletePedidos = "DELETE FROM pedidos WHERE id_cliente = ?"
                                connection.query(deletePedidos, [idCliente], (error, result) => {
                                    //Si surge algun error, avisamos con un mensaje
                                    if (error) {
                                        return connection.rollback(() => {
                                            res.status(500).json({ mensaje: "Error al ejecutar: " + deletePedidos });
                                        })
                                    }

                                    //Obtenemos el id del carrito del cliente
                                    const queryCarritoCliente = "SELECT id FROM carritos WHERE id_cliente = ?"
                                    connection.query(queryCarritoCliente, [idCliente], (error, result) => {
                                        //Si surge algun error, avisamos con un mensaje
                                        if (error) {
                                            return connection.rollback(() => {
                                                res.status(500).json({ mensaje: "Error al ejecutar: " + queryCarritoCliente });
                                            })
                                        }

                                        const idCarritoCliente = result.id

                                        //Borramos todos carritos_productos del cliente
                                        const deleteCarritosProductos = "DELETE FROM carritos_productos WHERE id_carrito = ?"
                                        connection.query(deleteCarritosProductos, [idCarritoCliente], (error, result) => {
                                            //Si surge algun error, avisamos con un mensaje
                                            if (error) {
                                                return connection.rollback(() => {
                                                    res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCarritosProductos });
                                                })
                                            }

                                            //Borramos el carrito del cliente
                                            const deleteCarritoCliente = "DELETE FROM carritos WHERE id_cliente = ?"
                                            connection.query(deleteCarritoCliente, [idCliente], (error, result) => {
                                                //Si surge algun error, avisamos con un mensaje
                                                if (error) {
                                                    return connection.rollback(() => {
                                                        res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCarritoCliente });
                                                    })
                                                }

                                                //Borramos el cliente
                                                const deleteCliente = "DELETE FROM clientes WHERE id = ?"
                                                connection.query(deleteCliente, [idCliente], (error, result) => {
                                                    //Si surge algun error, avisamos con un mensaje
                                                    if (error) {
                                                        return connection.rollback(() => {
                                                            res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCliente });
                                                        })
                                                    }

                                                    //Borramos el cliente
                                                    const deleteUsuario = "DELETE FROM usuarios WHERE id = ?"
                                                    connection.query(deleteUsuario, [idCliente], (error, result) => {
                                                        //Si surge algun error, avisamos con un mensaje
                                                        if (error) {
                                                            return connection.rollback(() => {
                                                                res.status(500).json({ mensaje: "Error al ejecutar: " + deleteUsuario });
                                                            })
                                                        }

                                                        // Si todo salió bien, confirmamos la transacción
                                                        connection.commit((error) => {
                                                            if (error) {
                                                                return connection.rollback(() => {
                                                                    res.status(500).json({ mensaje: "Error al confirmar la transacción" });
                                                                });
                                                            }

                                                            res.status(201).json({ mensaje: "Cliente eliminado junto a toda su informacion" });
                                                        });
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })
                    })
                }
            })
        })
    })
}

//PENDIENTE actualiza contraseña

export { updateDatosPersManicurista, updateDatosPersCliente, deleteCliente }