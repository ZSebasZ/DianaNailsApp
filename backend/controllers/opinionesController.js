import connection from "./../db/connection.js"; //Importamos nuestra conexion

//Creamos la funcion que se encarga de la INSERCION de una OPINION
const nuevaOpinion= (req, res) => {

    //Obtenemos los datos de la nueva opinon
    const { idCliente, titulo, descripcion, estrellas } = req.body;

    //Si alguno de los datos está vació o no se envia, mandamos un error
    if (!idCliente || !titulo || !descripcion || !estrellas) {
        return res.status(400).json({ mensaje: "Campos incompletos" })
    }

    //Sentencia SQL para la insercion de la nueva opinion
    const insertNuevaOpinion = "INSERT INTO opiniones (id_cliente, titulo, descripcion, estrellas, fecha) VALUES (?, ?, ?, ?, CURRENT_DATE())"

    //Hacemos la insercion del nuevo servicio
    connection.query(insertNuevaOpinion, [idCliente, titulo, descripcion, estrellas], (error, result) => {
        //Si ocurre algun error en la insercion, mostramos un mensaje
        if (error) {
            return res.status(500).json({ mensaje: "Error al insertar la nueva opinion" });
        }

        //Obtenemos el id del servicio insertado
        const idOpinionInsertada = result.insertId;

        //Si todo el proceso fue exitoso, monstramos un mensaje
        res.status(201).json({ mensaje: "Opinion insertada con exito. ID opinion: " +  idOpinionInsertada});
    })

}

export {nuevaOpinion}