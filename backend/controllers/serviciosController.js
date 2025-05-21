import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la OBTENCION de los SERVICIOS
const getServicios = (req, res) => {

    //DE PRUEBA
    //return res.status(200).json({"mensaje": "exito"})

    //Sentencia SQL para la obtencion de los datos
    const queryObtenerServicios = "SELECT id, url_imagen, nombre, precio, horas_requeridas FROM servicios"

    //Hacemos la query para la obtencion de los servicios
    connection.query(queryObtenerServicios, (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if(error) {
            return res.status(500).json({ mensaje: "Error obtener los servicios" });
        }

        //De lo contrario, enviamos los servicios obtenidos
        res.status(200).json(results)
    })
}

//Creamos la funcion que se encarga de la INSERCION de los SERVICIOS
const nuevoServicio = (req, res) => {

    //Obtenemos los datos del nuevo servicio
    const { url_imagen, nombre, precio, horas_requeridas } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !precio || !horas_requeridas) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Sentencia SQL para la insercion de un nuevo servicio
    const insertNuevoServicio = "INSERT INTO servicios (url_imagen, nombre, precio, horas_requeridas) VALUES (?, ?, ?, ?)"

    //Hacemos la insercion del nuevo servicio
    connection.query(insertNuevoServicio, [url_imagen, nombre, precio, horas_requeridas], (error, result) => {
        //Si ocurre algun error en la insercion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al insertar el nuevo servicio" });
        }

        //Obtenemos el id del servicio insertado
        const idServicioInsertado = result.insertId;

        //Si todo el proceso fue exitoso, monstramos un mensaje
        res.status(201).json({ mensaje: "Servicio insertado con exito. ID servicio: " +  idServicioInsertado});
    })

}

//Creamos la funcion que se encarga de la ACTUALIZACION de los SERVICIOS
const updateServicio = (req, res) => {

    //Obtenemos el id del servicio a actualizat
    const { id } = req.params

    //Obtenemos los nuevos datos del servicio
    const { url_imagen, nombre, precio, horas_requeridas } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !precio || !horas_requeridas) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Sentencia SQL para actualizar el servicio
    const updateServicio = "UPDATE servicios SET url_imagen = ?, nombre = ?, precio = ?, horas_requeridas = ? WHERE id = ?"

    //Hacemos la actualizacion del servicio
    connection.query(updateServicio, [url_imagen, nombre, precio, horas_requeridas, id], (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar el servicio" });
        }

        //Comprobamos si alguna fila se actualizó
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }

        //Si todo el proceso fue exitoso, monstramos un mensaje
        res.status(200).json({ message: "Servicio actualizado correctamente" });
    })

}

export {getServicios, nuevoServicio, updateServicio}