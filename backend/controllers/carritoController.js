import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la AGREGAR un PRODUCTO en el CARRITO
const insertCarritoProducto = (req, res) => {

    //Obtenemos los datos del nuevo producto en el carrito
    const { idCarrito, idProducto, cantidad } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCarrito || !idProducto || !cantidad) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Insertamos el nuevo producto al carrito
    const insertCarritoProducto = "INSERT INTO carritos_productos (id_carrito, id_producto, cantidad) VALUES (?, ?, ?)"
    connection.query(insertCarritoProducto, [idCarrito, idProducto, cantidad], (error, result) => {
        //Si ocurre algun error en la insercion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al insertar el nuevo producto en el carrito" });
        }

        //De lo contrario, enviamos un mensaje de exito
        res.status(200).json({ mensaje: "Producto añadido al carrito con exito" })

    })
}

//Creamos la funcion que se encarga de la ACTUALIZAR un PRODUCTO en el CARRITO
const updateCarritoProducto = (req, res) => {

    //Obtenemos los datos del producto en el carrito
    const { idCarrito, idProducto, cantidad } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCarrito || !idProducto || cantidad < 0) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    if (cantidad == 0) {
        //Si la cantidad es 0, borramos el producto del carrito
        const deleteCarritoProducto = "DELETE FROM carritos_productos WHERE id_carrito = ? AND id_producto = ?"
        connection.query(deleteCarritoProducto, [idCarrito, idProducto], (error, result) => {
            //Si ocurre algun error en el borrado, mostramos un mensaje
            if (error) {
                return res.status(500).json({ mensaje: "Error al borrar el producto del carrito" });
            }

            //De lo contrario, enviamos un mensaje de exito
            res.status(200).json({ mensaje: "Producto elimado del carrito" })
        })
    } else {
        //De lo contrario, actualizamos el producto del carrito
        const updateCarritoProducto = "UPDATE carritos_productos SET cantidad = ? WHERE id_carrito = ? AND id_producto = ?"
        connection.query(updateCarritoProducto, [cantidad, idCarrito, idProducto], (error, result) => {
            //Si ocurre algun error en el actualizado, mostramos un mensaje
            if (error) {
                return res.status(500).json({ mensaje: "Error al actualizar el producto del carrito" });
            }

            //De lo contrario, enviamos un mensaje de exito
            res.status(200).json({ mensaje: "Producto actualizado en el carrito" })
        })
    }
}

//Creamos la funcion que se encarga de BORRAR un PRODUCTO en el CARRITO
const deleteCarritoProducto = (req, res) => {

    //Obtenemos los datos del producto en el carrito
    const { idCarrito, idProducto } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCarrito || !idProducto) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Borramos el producto del carrito
    const deleteCarritoProducto = "DELETE FROM carritos_productos WHERE id_carrito = ? AND id_producto = ?"
    connection.query(deleteCarritoProducto, [idCarrito, idProducto], (error, result) => {
        //Si ocurre algun error en el borrado, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al borrar el producto del carrito" });
        }

        //De lo contrario, enviamos un mensaje de exito
        res.status(200).json({ mensaje: "Producto borrado del carrito carrito con exito" })

    })
}

export { insertCarritoProducto, updateCarritoProducto, deleteCarritoProducto }