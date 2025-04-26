import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que OBTIENE las proximas CITAS de un CLIENTE
const getCitasCliente = (req, res) => {
    //Obtenemos el id del cliente
    const { idCliente } = req.params;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCliente) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Guardamos la fecha y hora actuales
    //Ffecha actual en formato 'Y-m-d' (año-mes-dia)
    const fechaActual = new Date().toISOString().split('T')[0];

    //Obtener la hora actual en formato 'H:i' (hora:minuto)
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //Obtenemos todas las citas del cliente, a partir de la fecha y hora actuales
    const getCitasCliente = `SELECT c.id_cliente, c.id AS id_cita, c.fecha AS fecha_cita, c.precio, s.nombre, (SELECT h.hora FROM citas_horas AS ch, horas AS h WHERE ch.id_cita = c.id AND h.id = ch.id_hora LIMIT 1) AS horaInicio, (SELECT h2.hora FROM citas_horas AS ch, horas AS h, horas AS h2 WHERE ch.id_hora = h.id AND h2.id = h.id + 1 AND ch.id_cita = c.id ORDER BY ch.id_hora DESC LIMIT 1) AS horaFin FROM citas AS c, citas_servicios AS cs, servicios AS s WHERE cs.id_servicio = s.id AND c.id = cs.id_cita AND c.id_cliente = ${idCliente} AND c.id IN (SELECT id FROM (SELECT id FROM citas WHERE id_cliente = ${idCliente} AND fecha >= '${fechaActual}') AS maxFilas) AND (c.fecha > '${fechaActual}' OR (c.fecha = '${fechaActual}' AND (SELECT h.hora FROM citas_horas AS ch, horas AS h WHERE ch.id_cita = c.id AND h.id = ch.id_hora LIMIT 1) > '${horaActual}')) ORDER BY c.fecha ASC, horaInicio ASC;`
    connection.query(getCitasCliente, (error, results) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al obtener las citas" });
        }

        //Formamos el JSON que vamos a enviar
        if (results.length > 0) {
            let citasCliente = {
                citas: []
            };
            let citaAnterior = "";
            let cont = -1;

            results.forEach(row => {
                if (row.id_cita !== citaAnterior) {
                    citasCliente.citas.push({
                        cita: {
                            id: row.id_cita,
                            fecha: row.fecha_cita,
                            precio: row.precio,
                            servicios: [row.nombre],
                            horaInicio: row.horaInicio,
                            horaFin: row.horaFin
                        }
                    });
                    citaAnterior = row.id_cita;
                    cont++;
                } else {
                    citasCliente.citas[cont].cita.servicios.push(row.nombre);
                }
            });


            //Si todo salio bien, enviamos los datos
            res.status(200).json(citasCliente)

        } else {
            res.status(200).json({ message: "No hay citas" });
        }
    })

}

//Creamos la funcion para BORRAR una CITA de un CLIENTE
const deleteCitaCliente = (req, res) => {
    //Obtenemos el id del cliente y de la cita
    const { idCliente, idCita } = req.params;

    //Guardamos la fecha y hora actuales
    //Ffecha actual en formato 'Y-m-d' (año-mes-dia)
    const fechaActual = new Date().toISOString().split('T')[0];

    //Obtener la hora actual en formato 'H:i' (hora:minuto)
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //Verificamos si la cita se puede borrar, segun la hora y fecha actual
    const queryBorrarCita = `SELECT CASE WHEN (SELECT c.fecha FROM citas AS c WHERE c.id = ${idCita}) > '${fechaActual}' THEN 1 WHEN (SELECT c.fecha FROM citas AS c WHERE c.id = 1) = '${fechaActual}' THEN CASE WHEN (SELECT h.hora FROM citas_horas AS ch JOIN horas AS h ON ch.id_hora = h.id WHERE ch.id_cita = 1 LIMIT 1) > '${horaActual}' THEN 1 ELSE 0 END ELSE 0 END AS resultado;`
    connection.query(queryBorrarCita, (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al ejecutar: " + queryBorrarCita });
        }

        //return res.status(200).json({ mensaje: result[0].resultado });

        if (result[0].resultado == 1) {
            //Iniciamos una transaccion
            connection.beginTransaction((errorEliminarCliente) => {
                //Si hay un error al iniciar la transaccion mostramos un mensaje
                if (errorEliminarCliente) return res.status(500).json({ mensaje: "Error al iniciar la transacción" });

                //Borramos todas las citas_horas del cliente
                const deleteCitasHorasCliente = "DELETE FROM citas_horas WHERE id_cita = ?"
                connection.query(deleteCitasHorasCliente, [idCita], (error, result) => {
                    //Si surge algun error, avisamos con un mensaje
                    if (error) {
                        return connection.rollback(() => {
                            res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCitasHorasCliente });
                        })
                    }

                    //Borramos todas las citas_servicios del cliente
                    const deleteCitasServiciosCliente = "DELETE FROM citas_servicios WHERE id_cita = ?"
                    connection.query(deleteCitasServiciosCliente, [idCita], (error, result) => {
                        //Si surge algun error, avisamos con un mensaje
                        if (error) {
                            return connection.rollback(() => {
                                res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCitasServiciosCliente });
                            })
                        }

                        //Borramos la cita del cliente
                        const deleteCitaCliente = "DELETE FROM citas WHERE id = ? AND id_cliente = ?"
                        connection.query(deleteCitaCliente, [idCita, idCliente], (error, result) => {
                            //Si surge algun error, avisamos con un mensaje
                            if (error) {
                                return connection.rollback(() => {
                                    res.status(500).json({ mensaje: "Error al ejecutar: " + deleteCitaCliente });
                                })
                            }

                            // Si todo salió bien, confirmamos la transacción
                            connection.commit((error) => {
                                if (error) {
                                    return connection.rollback(() => {
                                        res.status(500).json({ mensaje: "Error al confirmar la transacción" });
                                    });
                                }

                                res.status(201).json({ mensaje: "Cita eliminada correctamente" });
                            });

                        })

                    })
                })

            })
        } else {
            res.status(200).json({ mensaje: "La cita no puede ser borrada" });
        }

    })
}

export { getCitasCliente, deleteCitaCliente }