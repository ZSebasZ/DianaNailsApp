import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la obtencion de los servicios
const getServicios = (req, res) => {

    //Sentencia SQL para la obtencion de los datos
    const queryObtenerServicios = "SELECT url_imagen, nombre, precio, horas_requeridas FROM servicios"

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

export {getServicios, nuevoServicio}