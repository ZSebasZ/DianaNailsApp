import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la OBTENCION de los PRODUCTOS
const getProductos = (req, res) => {

    //Sentencia SQL para la obtencion de los productos
    const queryObtenerProductos = "SELECT id, url_imagen, nombre, descripcion, precio, estrellas, stock FROM productos"

    //Hacemos la query para la obtencion de los productos
    connection.query(queryObtenerProductos, (error, results) => {
        //Si surge algun error, avisamos con un mensaje
        if(error) {
            return res.status(500).json({ mensaje: "Error obtener los productos" });
        }

        //De lo contrario, enviamos los servicios obtenidos
        res.status(200).json(results)
    })
}

export {getProductos}