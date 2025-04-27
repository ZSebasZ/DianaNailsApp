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

//Creamos la funcion que se encarga de la INSERCION de los PRODUCTOS
const nuevoProducto = (req, res) => {

    //Obtenemos los datos del nuevo producto
    const { url_imagen, nombre, descripcion, precio, stock } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Sentencia SQL para la insercion de un nuevo producto
    const insertNuevoProducto = "INSERT INTO productos (url_imagen, nombre, descripcion, precio, estrellas, stock) VALUES (?, ?, ?, ?, 5, ?)"

    //Hacemos la insercion del nuevo producto
    connection.query(insertNuevoProducto, [url_imagen, nombre, descripcion, precio, stock], (error, result) => {
        
        //Si ocurre algun error en la insercion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al insertar el nuevo producto" });
        }

        //Obtenemos el id del producto insertado
        const idProductoInsertado = result.insertId;

        //Si todo el proceso fue exitoso, monstramos un mensaje
        res.status(201).json({ mensaje: "Producto insertado con exito. ID producto: " +  idProductoInsertado});
    })

}

export {getProductos, nuevoProducto}