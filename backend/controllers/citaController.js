import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la OBTENCION de las HORAS REQUERIDAS y PRECIO TOTAL de los SERVICIOS seleccionados
const getPrecioTotalHorasRequeridas = (req, res) => {

    //Obtenemos los servicios seleccionados
    const { servicios } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!servicios) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Convertimos el array en un sring para la sentencia SQL
    const serviciosString = servicios.join(",")

    //Sentencia SQL para obtener el precio total de los servicios seleccionados y las horas requeridas
    const queryObtenerPrecioHorsReqs = `SELECT SUM(precio) as precioTotal, SUM(horas_requeridas) as horasRequeridas FROM servicios WHERE id IN (${serviciosString})`
    connection.query(queryObtenerPrecioHorsReqs, (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error obtener el precio total y horas requeridas" });
        }

        //De lo contrario, enviamos el precio total y horas requeridas
        res.status(200).json(results)
    })
}

//Creamos la funcion que se encarga de la OBTENCION de las HORAS REQUERIDAS y PRECIO TOTAL de los SERVICIOS seleccionados
const getHorasDisponiblesManicuristasDisponibles = (req, res) => {

    //Obtenemos la fecha y servicios seleccionados
    const { idCliente, fecha, servicios } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCliente || !fecha || !servicios) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Convertimos el array en un sring para la sentencia SQL
    const serviciosString = servicios.join(",")

    //Sentencia SQL para obtener las horas requeridas
    const queryObtenerHorsReqs = `SELECT SUM(horas_requeridas) as horasRequeridas FROM servicios WHERE id IN (${serviciosString})`

    //Hacemos la query
    let horsReqs = 0
    connection.query(queryObtenerHorsReqs, (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error obtener las horas requeridas" });
        }

        //De lo contrario, guardamos las horas requeridas en una variable
        horsReqs = parseInt(results[0].horasRequeridas)
    })

    //Sentencia SQL para obtener las citas que hay para la fecha escogida
    const queryCitasFechaEscogida = `SELECT COUNT(id) as totalCitas FROM citas WHERE fecha = '${fecha}'`

    //Hacemos la query
    connection.query(queryCitasFechaEscogida, (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error obtener las citas de la misma fecha" });
        }

        //De lo contrario, guardamos las horas requeridas en una variable
        let totalCitas = parseInt(results[0].totalCitas)

        //Guardamos la fecha y hora actuales
        //Ffecha actual en formato 'Y-m-d' (año-mes-dia)
        const fechaActual = new Date().toLocaleDateString('en-CA');

        //Obtener la hora actual en formato 'H:i' (hora:minuto)
        const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        //Si hay citas en la fecha escogida

        if (totalCitas >= 0) {
            //Sentencia SQL para obtener las horas disponibles junto a su correspodiente manicurista
            let horasManicuristasDisponibles = `WITH manicuristasLibres AS (SELECT m.id AS id_manicurista, m.nombre_manicurista, m.url_imagen, h.id AS id_hora, h.hora AS hora, h.es_laboral AS esLaboral FROM vManicuristas m JOIN horas h ON h.es_laboral = 1 WHERE NOT EXISTS (SELECT 1 FROM citas_horas r JOIN citas c1 ON r.id_cita = c1.id WHERE c1.id_manicurista = m.id AND r.id_hora = h.id AND c1.fecha = '${fecha}') AND h.id NOT IN (SELECT horasYaPedidas FROM (SELECT ch.id_hora AS horasYaPedidas FROM citas_horas AS ch JOIN citas AS c ON c.id = ch.id_cita WHERE c.id_cliente = ${idCliente} AND c.fecha = '${fecha}') AS subquery) AND (CASE WHEN '${fechaActual}' = '${fecha}' THEN h.hora > '${horaActual}' ELSE TRUE END) ORDER BY id_manicurista, id_hora) SELECT DISTINCT p1.id_manicurista, p1.nombre_manicurista, p1.url_imagen, p1.id_hora, p1.hora FROM manicuristasLibres AS p1 `

            //Variable para ir formando la otra parte de la sentencia
            let serMismaManicurista = ""

            for (let i = 1; i <= horsReqs; i++) {
                if (i == 1 && horsReqs != 1) {
                    serMismaManicurista += ` WHERE p1.id_manicurista = p${i + 1}.id_manicurista`
                } else if (i + 1 <= horsReqs) {
                    serMismaManicurista += ` and p${i}.id_manicurista = p${i + 1}.id_manicurista`
                }

                if (i > 1) {
                    horasManicuristasDisponibles += ` JOIN manicuristasLibres p${i}  ON p${i}.id_hora = p1.id_hora + ${i - 1}`
                }
            }

            horasManicuristasDisponibles += serMismaManicurista + " ORDER BY p1.id_manicurista, p1.id_hora"

            //res.status(200).json({ mensaje: horasManicuristasDisponibles })

            //Hacemos la query para obtener las horas disponibles junto a su correspodiente manicurista

            connection.query(horasManicuristasDisponibles, (error, results) => {

                //Si surge algun error, avisamos con un mensaje
                if (error) {
                    return res.status(500).json({ mensaje: "Error obtener las horas y manicuristas disponibles" });
                }

                const totalHorsManicuritasDisponibles = results.length

                if (totalHorsManicuritasDisponibles > 0) {
                    let horas = {}

                    results.forEach((row) => {
                        //Verificamos si la hora ya existe en el objeto horas
                        if (!horas[row.id_hora]) {
                            //Si no existe, la creamos con la estructura basica
                            horas[row.id_hora] = {
                                idHora: row.id_hora,
                                hora: row.hora,
                                manicuristas: [
                                    {
                                        url_imagen: row.url_imagen,
                                        id: row.id_manicurista,
                                        nombre: row.nombre_manicurista
                                    }
                                ]
                            };
                        } else {
                            //Si ya existe, añadimos la nuevo manicurista a la lista
                            horas[row.id_hora].manicuristas.push({
                                url_imagen: row.url_imagen,
                                id: row.id_manicurista,
                                nombre: row.nombre_manicurista
                            });
                        }
                    })



                    //Si todo salio bien, enviamos los datos
                    res.status(200).json(horas)

                } else {
                    res.status(200).json({ mensaje: "noHoras" })
                }
            })

        } else {
            /*
            let horasManicuristasDisponibles = `WITH manicuristasLibres AS (
  SELECT
    m.id AS id_manicurista,
    CONCAT(u.nombre, ' ', u.apellidos) AS nombre_manicurista,
    u.url_imagen AS url_imagen,
    h.id AS id_hora,
    h.hora AS hora,
    h.es_laboral AS esLaboral
  FROM manicuristas m
  JOIN usuarios u ON m.id = u.id
  JOIN horas h ON h.es_laboral = 1
  WHERE h.id NOT IN (
    SELECT ch.id_hora
    FROM citas_horas ch
    JOIN citas c ON c.id = ch.id_cita
    WHERE c.id_cliente = ${idCliente}
      AND c.fecha = '${fecha}'
  )
  AND (
    CASE
      WHEN '${fechaActual}' = '${fecha}' THEN h.hora > '${horaActual}'
      ELSE TRUE
    END
  )
)
SELECT
  p.id_manicurista,
  p.nombre_manicurista,
  p.url_imagen,
  p.id_hora,
  p.hora,
  p.esLaboral
FROM manicuristasLibres p
ORDER BY p.id_manicurista, p.id_hora;
`
*/
            //Sentencia SQL para obtener las horas disponibles junto a su correspodiente manicurista
            
            let horasManicuristasDisponibles = `WITH manicuristasLibres AS (SELECT m.id AS id_manicurista, CONCAT(u.nombre, ' ', u.apellidos) AS nombre_manicurista, u.url_imagen AS url_imagen, h.id AS id_hora, h.hora AS hora, h.es_laboral AS esLaboral FROM manicuristas m JOIN usuarios u ON m.id = u.id JOIN horas h ON h.es_laboral = 1 WHERE h.id NOT IN (SELECT horasYaPedidas FROM (SELECT ch.id_hora AS horasYaPedidas FROM citas_horas AS ch JOIN citas AS c ON c.id = ch.id_cita WHERE c.id_cliente = ${idCliente} AND c.fecha = '${fecha}') AS subquery) AND (CASE WHEN '${fechaActual}' = '${fecha}' THEN h.hora > '${horaActual}' ELSE TRUE END) ORDER BY id_manicurista, id_hora) SELECT DISTINCT p1.id_manicurista, p1.nombre_manicurista, p1.url_imagen, p1.id_hora, p1.hora FROM manicuristasLibres AS p1 `

            for (let i = 1; i <= horsReqs; i++) {
                if (i > 1) {
                    horasManicuristasDisponibles += ` JOIN manicuristasLibres p${i}  ON p${i}.id_hora = p1.id_hora + ${i - 1} `
                }
            }

            //horasManicuristasDisponibles += " ORDER BY p1.id_manicurista, p1.id_hora"

            //res.status(200).json({ mensaje: horasManicuristasDisponibles })

            //Hacemos la query para obtener las horas disponibles junto a su correspodiente manicurista

            
            connection.query(horasManicuristasDisponibles, (error, results) => {

                //Si surge algun error, avisamos con un mensaje
                if (error) {
                    return res.status(500).json({ mensaje: "Error obtener las horas y manicuristas disponibles" });
                }

                const totalHorsManicuritasDisponibles = results.length

                if (totalHorsManicuritasDisponibles > 0) {
                    
                    let horas = {}

                    results.forEach((row) => {
                        //Verificamos si la hora ya existe en el objeto horas
                        if (!horas[row.id_hora]) {
                            //Si no existe, la creamos con la estructura basica
                            horas[row.id_hora] = {
                                idHora: row.id_hora,
                                hora: row.hora,
                                manicuristas: [
                                    {
                                        url_imagen: row.url_imagen,
                                        id: row.id_manicurista,
                                        nombre: row.nombre_manicurista
                                    }
                                ]
                            };
                        } else {
                            //Si ya existe, añadimos la nuevo manicurista a la lista
                            horas[row.id_hora].manicuristas.push({
                                url_imagen: row.url_imagen,
                                id: row.id_manicurista,
                                nombre: row.nombre_manicurista
                            });
                        }
                    })
                    
                    /*
                    const horas = {};
                    const manicuristasMap = new Map();

                    // Agrupar horas por manicurista
                    results.forEach(row => {
                        const id = row.id_manicurista;
                        if (!manicuristasMap.has(id)) {
                            manicuristasMap.set(id, []);
                        }
                        manicuristasMap.get(id).push({
                            id: row.id_hora,
                            hora: row.hora,
                            esLaboral: row.esLaboral,
                            nombre: row.nombre_manicurista,
                            url_imagen: row.url_imagen
                        });
                    });

                    for (let [id_manicurista, horasManicurista] of manicuristasMap.entries()) {
                        const sortedHoras = horasManicurista.sort((a, b) => a.id - b.id);
                        const nombre = sortedHoras[0].nombre;
                        const url_imagen = sortedHoras[0].url_imagen;

                        if (horsReqs === 1) {
                            sortedHoras.forEach(horaObj => {
                                if (!horas[horaObj.id]) {
                                    horas[horaObj.id] = {
                                        idHora: horaObj.id,
                                        hora: horaObj.hora,
                                        manicuristas: []
                                    };
                                }
                                horas[horaObj.id].manicuristas.push({
                                    id: parseInt(id_manicurista),
                                    nombre,
                                    url_imagen
                                });
                            });
                        } else {
                            for (let i = 0; i <= sortedHoras.length - horsReqs; i++) {
                                const bloque = sortedHoras.slice(i, i + horsReqs);

                                let bloqueValido = true;
                                for (let j = 0; j < bloque.length; j++) {
                                    if (!bloque[j].esLaboral) {
                                        bloqueValido = false;
                                        break;
                                    }
                                    if (j > 0 && bloque[j].id !== bloque[j - 1].id + 1) {
                                        bloqueValido = false;
                                        break;
                                    }
                                }

                                if (bloqueValido) {
                                    // Agregar este bloque completo al objeto horas
                                    bloque.forEach(horaObj => {
                                        if (!horas[horaObj.id]) {
                                            horas[horaObj.id] = {
                                                idHora: horaObj.id,
                                                hora: horaObj.hora,
                                                manicuristas: []
                                            };
                                        }
                                        horas[horaObj.id].manicuristas.push({
                                            id: parseInt(id_manicurista),
                                            nombre,
                                            url_imagen
                                        });
                                    });

                                    // Saltar las siguientes horsReqs - 1 posiciones para evitar solapamientos
                                    i += horsReqs - 1;
                                }
                            }
                        }
                    }
                    */






                    //Si todo salio bien, enviamos los datos
                    res.status(200).json(horas)

                } else {
                    res.status(200).json({ mensaje: "noHoras" })
                }
            })

        }

    })
}

//Creamos la funcion para la INSERCION de una nueva CITA
const nuevaCita = (req, res) => {

    //Obtenemos los datos de la cita
    const { idCliente, servicios, fecha, idHora, idManicurista, precio, idMetodoPago } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCliente || !servicios || !fecha || !idHora || !idManicurista || !idMetodoPago) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //console.log(fecha)

    //Convertimos el array en un sring para la sentencia SQL
    const serviciosString = servicios.join(",")

    //Iniciamos una transaccion
    connection.beginTransaction((errorInsertNuevaCita) => {
        //Si hay un error al iniciar la transaccion mostramos un mensaje
        if (errorInsertNuevaCita) return res.status(500).json({ mensaje: "Error al iniciar la transacción" });

        //Sentencia SQL para obtener las horas requeridas
        const queryObtenerHorsReqs = `SELECT SUM(horas_requeridas) as horasRequeridas FROM servicios WHERE id IN (${serviciosString})`

        //Hacemos la query
        let horsReqs = 0
        connection.query(queryObtenerHorsReqs, (error, results) => {
            //Si surge algun error, avisamos con un mensaje
            if (error) {
                connection.rollback(() => {

                })
                return res.status(500).json({ mensaje: "Error al ejecutar: " + queryObtenerHorsReqs });
            }

            //De lo contrario, guardamos las horas requeridas en una variable
            horsReqs = parseInt(results[0].horasRequeridas)

            //Setencia SQL para saber si ya la manicurista tiene una cita en el intervalo de las horas de la nueva cita
            let queryManicuristaOcupada = `SELECT c.id, c.fecha, c.id_manicurista, ch.id_hora FROM citas_horas ch JOIN citas c ON ch.id_cita = c.id WHERE c.id_manicurista = ${idManicurista} AND c.fecha = '${fecha}' AND ch.id_hora `;

            if (horsReqs == 1) {
                queryManicuristaOcupada += `= ${idHora}`;
            } else {
                queryManicuristaOcupada += `IN (SELECT id FROM (SELECT id FROM horas LIMIT ${horsReqs} OFFSET ${idHora - 1}) AS subquery)`;
            }

            //Hacemos la consulta SQL
            connection.query(queryManicuristaOcupada, (error, results) => {

                //Si ocurre algun error mostramos un mensaje
                if (error) {
                    connection.rollback(() => {

                    })
                    return res.status(500).json({ mensaje: "Error al ejecutar: " + queryManicuristaOcupada });
                }

                if (results.length > 0) {
                    connection.rollback(() => {

                    })
                    return res.status(409).json({ mensaje: "La cita ya está reservada." });
                }

                //Sentencia SQL para insertar una nueva cita
                const insertNuevaCita = "INSERT INTO citas (id_manicurista, id_cliente, fecha, precio, id_metodo_pago) VALUES (?, ?, ?, ?, ?)"

                //Hacemos la insercion de la cita
                connection.query(insertNuevaCita, [idManicurista, idCliente, fecha, precio, idMetodoPago], (error, result) => {
                    //Si ocurre algun error mostramos un mensaje
                    if (error) {
                        connection.rollback(() => {

                        })
                        return res.status(500).json({ mensaje: "Error al ejecutar: " + insertNuevaCita });
                    }

                    const idNuevaCita = result.insertId

                    //Setencia SQL para obtener las horas que va a requerir la cita
                    const queryIdsHorsReqs = `SELECT id FROM horas WHERE id >= ${idHora} LIMIT ${horsReqs}`
                    //Hacemos la sentencia SQL
                    connection.query(queryIdsHorsReqs, (error, resultsIdsHoras) => {
                        //Si ocurre algun error mostramos un mensaje
                        if (error) {
                            connection.rollback(() => {

                            })
                            return res.status(500).json({ mensaje: "Error al ejecutar: " + queryIdsHorsReqs });
                        }

                        //Preparamos la sentencia SQL para insertar los datos en la tabla citas_horas
                        let insertCitaHoras = "INSERT INTO citas_horas (id_cita, id_hora) VALUES "
                        for (let i = 0; i < horsReqs; i++) {
                            insertCitaHoras += `(${idNuevaCita}, ?),`
                        }

                        insertCitaHoras = insertCitaHoras.slice(0, -1)
                        let paramsIdsHoras = []
                        resultsIdsHoras.forEach((row) => {
                            paramsIdsHoras.push(row.id)
                        })

                        //Hacemos la insercion en la tabla de citas_horas
                        connection.query(insertCitaHoras, paramsIdsHoras, (error, result) => {
                            //Si ocurre algun error mostramos un mensaje
                            if (error) {
                                connection.rollback(() => {

                                })

                                return res.status(500).json({ mensaje: "Error al ejecutar: " + insertCitaHoras });
                            }

                            //Preparamos la sentencia SQL para insertar los datos en la tabla citas_servicios
                            let insertCitaServicios = "INSERT INTO citas_servicios (id_cita, id_servicio) VALUES "
                            for (let i = 0; i < servicios.length; i++) {
                                insertCitaServicios += `(${idNuevaCita}, ?),`
                            }

                            insertCitaServicios = insertCitaServicios.slice(0, -1)

                            //Hacemos la insercion en la tabla de citas_horas
                            connection.query(insertCitaServicios, servicios, (error, result) => {
                                //Si ocurre algun error mostramos un mensaje
                                if (error) {
                                    connection.rollback(() => {
                                    })
                                    return res.status(500).json({ mensaje: "Error al ejecutar: " + insertCitaServicios });

                                }

                                // Si todo salió bien, confirmamos la transacción
                                connection.commit((error) => {
                                    if (error) {
                                        connection.rollback(() => {

                                        });
                                        return res.status(500).json({ mensaje: "Error al confirmar la transacción" });
                                    }

                                    res.status(201).json({ mensaje: "Cita registrada exitosamente. ID cita: " + idNuevaCita });
                                });

                            })

                        })

                    })
                })


            })
        })
    })
}

export { getPrecioTotalHorasRequeridas, getHorasDisponiblesManicuristasDisponibles, nuevaCita }

