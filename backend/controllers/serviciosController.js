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

export {getServicios}