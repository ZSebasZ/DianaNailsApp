import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la OBTENCION de los datos del USUARIO
const updateDatosPersManicurista = (req, res) => {

    //Obtenemos el id de la manicurista a actualizat
    const { id } = req.params

    //Obtenemos los servicios seleccionados
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

export {updateDatosPersManicurista}