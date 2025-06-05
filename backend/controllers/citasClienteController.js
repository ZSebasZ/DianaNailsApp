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
    const fechaActual = new Date().toLocaleDateString('en-CA');

    //Obtener la hora actual en formato 'H:i' (hora:minuto)
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //Obtenemos todas las citas del cliente, a partir de la fecha y hora actuales
    const getCitasCliente = `SELECT
                                c.id_cliente,
                                c.id AS id_cita,
                                c.fecha AS fecha_cita,
                                c.precio,
                                s.nombre,
                                CONCAT(u.nombre, ' ', u.apellidos) AS manicurista,
                                u.url_imagen AS manicuristaImg,
                                h_inicio.hora AS horaInicio,
                                h_fin.hora AS horaFin,
                                mp.metodo as metodoPago
                            FROM citas c
                            JOIN citas_servicios cs ON c.id = cs.id_cita
                            JOIN servicios s ON cs.id_servicio = s.id
                            JOIN manicuristas m ON c.id_manicurista = m.id
                            JOIN usuarios u ON m.id = u.id
                            LEFT JOIN (
                                SELECT ch.id_cita, MIN(h.hora) AS hora
                                FROM citas_horas ch
                                JOIN horas h ON ch.id_hora = h.id
                                GROUP BY ch.id_cita
                            ) h_inicio ON h_inicio.id_cita = c.id
                            LEFT JOIN (
                                SELECT ch.id_cita, MAX(h2.hora) AS hora
                                FROM citas_horas ch
                                JOIN horas h ON ch.id_hora = h.id
                                JOIN horas h2 ON h2.id = h.id + 1
                                GROUP BY ch.id_cita
                            ) h_fin ON h_fin.id_cita = c.id
                            JOIN metodos_pago mp ON c.id_metodo_pago = mp.id
                            WHERE
                                c.id_cliente = ${idCliente}
                                AND (
                                    c.fecha > '${fechaActual}' OR (
                                        c.fecha = '${fechaActual}' AND h_inicio.hora > '${horaActual}'
                                    )
                                )
                            ORDER BY
                                c.fecha ASC,
                                h_inicio.hora ASC;
`
    connection.query(getCitasCliente, (error, results) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: error });
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
                    //console.log(row.fecha_cita);
                    citasCliente.citas.push({
                        cita: {
                            id: row.id_cita,
                            fecha: row.fecha_cita,
                            precio: row.precio,
                            servicios: [row.nombre],
                            horaInicio: row.horaInicio,
                            horaFin: row.horaFin,
                            manicurista: row.manicurista,
                            manicuristaImg: row.manicuristaImg,
                            metodoPago: row.metodoPago
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
            connection.beginTransaction((errorEliminarCita) => {
                //Si hay un error al iniciar la transaccion mostramos un mensaje
                if (errorEliminarCita) return res.status(500).json({ mensaje: "Error al iniciar la transacción" });

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

//Creamos la funcion que OBTIENE las proximas CITAS de un CLIENTE
const getCitasClientes = (req, res) => {
    //Obtenemos el id del admin
    const { idAdmin } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idAdmin && idAdmin == 1) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Guardamos la fecha y hora actuales
    //Ffecha actual en formato 'Y-m-d' (año-mes-dia)
    const fechaActual = new Date().toLocaleDateString('en-CA');

    //Obtener la hora actual en formato 'H:i' (hora:minuto)
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //console.log(new Date().toLocaleDateString('en-CA'))

    //Obtenemos todas las citas del cliente, a partir de la fecha y hora actuales
    const getCitasCliente = `SELECT
                                c.id_cliente,
                                c.id AS id_cita,
                                c.fecha AS fecha_cita,
                                c.precio,
                                s.nombre,
                                
                                -- Manicurista
                                CONCAT(u.nombre, ' ', u.apellidos) AS manicurista,
                                u.url_imagen AS manicuristaImg,
                                
                                -- Cliente
                                CONCAT(uc.nombre, ' ', uc.apellidos) AS cliente,
                                uc.url_imagen AS clienteImg,

                                h_inicio.hora AS horaInicio,
                                h_fin.hora AS horaFin,
                                mp.metodo as metodoPago

                            FROM citas c

                            -- Servicios
                            JOIN citas_servicios cs ON c.id = cs.id_cita
                            JOIN servicios s ON cs.id_servicio = s.id

                            -- Manicurista
                            JOIN manicuristas m ON c.id_manicurista = m.id
                            JOIN usuarios u ON m.id = u.id

                            -- Cliente (nuevo JOIN)
                            JOIN clientes cl ON c.id_cliente = cl.id
                            JOIN usuarios uc ON cl.id = uc.id  -- uc = usuario cliente

                            -- Horas de inicio y fin
                            LEFT JOIN (
                                SELECT ch.id_cita, MIN(h.hora) AS hora
                                FROM citas_horas ch
                                JOIN horas h ON ch.id_hora = h.id
                                GROUP BY ch.id_cita
                            ) h_inicio ON h_inicio.id_cita = c.id
                            LEFT JOIN (
                                SELECT ch.id_cita, MAX(h2.hora) AS hora
                                FROM citas_horas ch
                                JOIN horas h ON ch.id_hora = h.id
                                JOIN horas h2 ON h2.id = h.id + 1
                                GROUP BY ch.id_cita
                            ) h_fin ON h_fin.id_cita = c.id
                            JOIN metodos_pago mp ON c.id_metodo_pago = mp.id

                            -- Condiciones de fecha y hora
                            WHERE (
                                c.fecha > '${fechaActual}' OR (
                                    c.fecha = '${fechaActual}' AND h_inicio.hora > '${horaActual}'
                                )
                            )

                            ORDER BY
                                c.fecha ASC,
                                h_inicio.hora ASC;`
    connection.query(getCitasCliente, (error, results) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: error });
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
                            horaFin: row.horaFin,
                            manicurista: row.manicurista,
                            manicuristaImg: row.manicuristaImg,
                            cliente: row.cliente,
                            clienteImg: row.clienteImg,
                            metodoPago: row.metodoPago
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

//Creamos la funcion que OBTIENE las proximas CITAS asignadas a una MANICURISTA
const getCitasClientesPorManicurista = (req, res) => {
    //Obtenemos el id del admin
    const { idManicurista } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idManicurista) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Guardamos la fecha y hora actuales
    //Ffecha actual en formato 'Y-m-d' (año-mes-dia)
    const fechaActual = new Date().toLocaleDateString('en-CA');

    //Obtener la hora actual en formato 'H:i' (hora:minuto)
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //Obtenemos todas las citas del cliente, a partir de la fecha y hora actuales
    const getCitasCliente = `SELECT
                                c.id_cliente,
                                c.id AS id_cita,
                                c.fecha AS fecha_cita,
                                c.precio,
                                s.nombre,
                                
                                -- Cliente
                                CONCAT(uc.nombre, ' ', uc.apellidos) AS cliente,
                                uc.url_imagen AS clienteImg,

                                h_inicio.hora AS horaInicio,
                                h_fin.hora AS horaFin,
                                mp.metodo as metodoPago

                            FROM citas c

                            -- Servicios
                            JOIN citas_servicios cs ON c.id = cs.id_cita
                            JOIN servicios s ON cs.id_servicio = s.id

                            -- Cliente (nuevo JOIN)
                            JOIN clientes cl ON c.id_cliente = cl.id
                            JOIN usuarios uc ON cl.id = uc.id  -- uc = usuario cliente

                            -- Horas de inicio y fin
                            LEFT JOIN (
                                SELECT ch.id_cita, MIN(h.hora) AS hora
                                FROM citas_horas ch
                                JOIN horas h ON ch.id_hora = h.id
                                GROUP BY ch.id_cita
                            ) h_inicio ON h_inicio.id_cita = c.id
                            LEFT JOIN (
                                SELECT ch.id_cita, MAX(h2.hora) AS hora
                                FROM citas_horas ch
                                JOIN horas h ON ch.id_hora = h.id
                                JOIN horas h2 ON h2.id = h.id + 1
                                GROUP BY ch.id_cita
                            ) h_fin ON h_fin.id_cita = c.id
                            JOIN metodos_pago mp ON c.id_metodo_pago = mp.id

                            -- Condiciones de fecha y hora
                            WHERE c.id_manicurista = ? AND (
                                c.fecha > '${fechaActual}' OR (
                                    c.fecha = '${fechaActual}' AND h_inicio.hora > '${horaActual}'
                                )
                            )

                            ORDER BY
                                c.fecha ASC,
                                h_inicio.hora ASC;`
    connection.query(getCitasCliente, [idManicurista], (error, results) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: error });
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
                            horaFin: row.horaFin,
                            cliente: row.cliente,
                            clienteImg: row.clienteImg,
                            metodoPago: row.metodoPago
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

export { getCitasCliente, deleteCitaCliente, getCitasClientes, getCitasClientesPorManicurista }