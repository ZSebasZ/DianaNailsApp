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
            return res.status(500).json({ mensaje: "Error obtener los servicios" });
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
            return res.status(500).json({ mensaje: "Error obtener los servicios" });
        }

        //De lo contrario, guardamos las horas requeridas en una variable
        horsReqs = parseInt(results[0].horasRequeridas)
    })

    //Sentencia SQL para obtener las citas que hay para la fecha escogida
    const queryCitasFechaEscogida = `SELECT COUNT(id) as totalCitas FROM citas WHERE fecha = ? `

    //Hacemos la query
    let totalCitas = 0
    connection.query(queryCitasFechaEscogida, [fecha], (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error obtener las citas de la misma fecha" });
        }

        //De lo contrario, guardamos las horas requeridas en una variable
        totalCitas = parseInt(results[0].totalCitas)
    })

    //Guardamos la fecha y hora actuales
    //Ffecha actual en formato 'Y-m-d' (año-mes-dia)
    const fechaActual = new Date().toISOString().split('T')[0];

    //Obtener la hora actual en formato 'H:i' (hora:minuto)
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    //Si hay citas en la fecha escogida
    if (totalCitas > 0) {
        //Sentencia SQL para obtener las horas disponibles junto a su correspodiente manicurista
        let horasManicuristasDisponibles = `WITH manicuristasLibres AS (SELECT m.id AS id_manicurista, CONCAT(u.nombre, ' ', u.apellidos) AS nombre_manicurista, h.id AS id_hora, h.hora AS hora, h.es_laboral AS esLaboral FROM manicuristas m JOIN usuarios u ON m.id = u.id JOIN horas h ON h.es_laboral = 1 WHERE NOT EXISTS (SELECT 1 FROM citas_horas r JOIN citas c1 ON r.id_cita = c1.id WHERE c1.id_manicurista = m.id AND r.id_hora = h.id AND c1.fecha = '${fecha}') AND h.id NOT IN (SELECT horasYaPedidas FROM (SELECT ch.id_hora AS horasYaPedidas FROM citas_horas AS ch JOIN citas AS c ON c.id = ch.id_cita WHERE c.id_cliente = ${idCliente} AND c.fecha = '${fecha}') AS subquery) AND (CASE WHEN '${fechaActual}' = '${fecha}' THEN h.hora > '${horaActual}' ELSE TRUE END) ORDER BY id_manicurista, id_hora) SELECT DISTINCT p1.id_manicurista, p1.nombre_manicurista, p1.id_hora, p1.hora FROM manicuristasLibres AS p1;`

        //Variable para ir formando la otra parte de la sentencia
        let serMismaManicurista = ""

        for (let i = 1; i <= horsReqs; i++) {
            if (i == 1 && horsReqs != 1) {
                serMismaManicurista += ` WHERE p1.id_manicurista = p${i + 1}.id_manicurista`
            } else if (i + 1 <= turnos) {
                serMismaManicurista += ` and p${i}.id_manicurista = p${i + 1}.id_manicurista`
            }

            if (i > 1) {
                horasManicuristasDisponibles += ` JOIN manicuristasLibres p${i}  ON p${i}.id_hora = p1.id_hora + ${i - 1}`
            }
        }

        horasManicuristasDisponibles += serMismaManicurista + " ORDER BY p1.id_manicurista, p1.id_hora"

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
                            hora: row.hora,
                            manicuristas: [
                                {
                                    id: row.id_manicurista,
                                    nombre: row.nombre_manicurista
                                }
                            ]
                        };
                    } else {
                        //Si ya existe, añadimos la nuevo manicurista a la lista
                        horas[row.id_hora].manicuristas.push({
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
        //Sentencia SQL para obtener las horas disponibles junto a su correspodiente manicurista
        let horasManicuristasDisponibles = `WITH manicuristasLibres AS (SELECT m.id AS id_manicurista, CONCAT(u.nombre, ' ', u.apellidos) AS nombre_manicurista, h.id AS id_hora, h.hora AS hora, h.es_laboral AS esLaboral FROM manicuristas m JOIN usuarios u ON m.id = u.id JOIN horas h ON h.es_laboral = 1 WHERE h.id NOT IN (SELECT horasYaPedidas FROM (SELECT ch.id_hora AS horasYaPedidas FROM citas_horas AS ch JOIN citas AS c ON c.id = ch.id_cita WHERE c.id_cliente = ${idCliente} AND c.fecha = '${fecha}') AS subquery) AND (CASE WHEN '${fechaActual}' = '${fecha}' THEN h.hora > '${horaActual}' ELSE TRUE END) ORDER BY id_manicurista, id_hora) SELECT DISTINCT p1.id_manicurista, p1.nombre_manicurista, p1.id_hora, p1.hora FROM manicuristasLibres AS p1;`

        for (let i = 1; i <= horsReqs; i++) {
            if (i > 1) {
                horasManicuristasDisponibles += ` JOIN manicuristasLibres p${i}  ON p${i}.id_hora = p1.id_hora + ${i - 1}`
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
                            hora: row.hora,
                            manicuristas: [
                                {
                                    id: row.id_manicurista,
                                    nombre: row.nombre_manicurista
                                }
                            ]
                        };
                    } else {
                        //Si ya existe, añadimos la nuevo manicurista a la lista
                        horas[row.id_hora].manicuristas.push({
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
        
    }

}

export { getPrecioTotalHorasRequeridas, getHorasDisponiblesManicuristasDisponibles }

