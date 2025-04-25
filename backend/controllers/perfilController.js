import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la ACTUALIZACION de los datos personales de una MANICURISTA
const updateDatosPersManicurista = (req, res) => {

    //Obtenemos el id de la manicurista a actualizat
    const { id } = req.params

    //Obtenemos los datos enviados
    const { url_imagen, nombre, apellidos, telefono } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !apellidos || !telefono) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Setencia SQL para actualizar los datos personales de la manicurista
    const updateDatosPersManicurista = "UPDATE usuarios SET url_imagen = ?, nombre = ?, apellidos = ?, telefono = ? WHERE id = ?"
    //Hacemos la actualizacion 
    connection.query(updateDatosPersManicurista, [url_imagen, nombre, apellidos, telefono, id], (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar los datos de la manicurista" });
        }

        //Comprobamos si alguna fila se actualizó
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Manicurista no encontrada" });
        }

        //Si todo el proceso fue exitoso, monstramos un mensaje
        res.status(200).json({ message: "Manicurista actualizada correctamente" });
    })
}

//Creamos la funcion que se encarga de la ACTUALIZACION de los datos personales de un CLIENTE
const updateDatosPersCliente = (req, res) => {

    //Obtenemos el id del cliente a actualizat
    const { id } = req.params

    //Obtenemos los datos enviados
    const { url_imagen, nombre, apellidos, telefono, direccion_envio } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!nombre || !apellidos || !telefono) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Setencia SQL para actualizar los datos personales del cliente
    const updateDatosPersCliente = "UPDATE usuarios SET url_imagen = ?, nombre = ?, apellidos = ?, telefono = ? WHERE id = ?"
    //Hacemos la actualizacion 
    connection.query(updateDatosPersCliente, [url_imagen, nombre, apellidos, telefono, id], (error, result) => {
        //Si ocurre algun error en la actualizacion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar los datos del cliente" });
        }

        //Comprobamos si alguna fila se actualizó
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        //Setencia SQL para actualizar la direccion de envio del cliente
        const updateDatosPersCliente = "UPDATE clientes SET direccion_envio = ? WHERE id = ?"
        //Hacemos la actualizacion 
        connection.query(updateDatosPersCliente, [direccion_envio, id], (error, result) => {
            //Si ocurre algun error en la actualizacion, mostramos un mensaje
            if (error) {
                return res.status(500).json({ mensaje: "Error al actualizar los datos del cliente" });
            }

            //Comprobamos si alguna fila se actualizó
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Cliente no encontrado" });
            }

            //Si todo el proceso fue exitoso, monstramos un mensaje
            res.status(200).json({ message: "Cliente actualizado correctamente" });
        })
    })
}



export { updateDatosPersManicurista, updateDatosPersCliente }