import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que OBTIENE las proximas CITAS de un CLIENTE
const getCitasCliente = (req, res) => {
    //Obtenemos el id del cliente
    const { idCliente } = req.body;

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



export { getCitasCliente }