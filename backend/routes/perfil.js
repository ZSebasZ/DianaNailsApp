import express from "express"; //Importamos la libreria 'express'
import { getDatosPerfil, updateFotoUsuario, updateDatosPersManicurista, updateDatosPersCliente, deleteCliente} from "./../controllers/perfilController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la ACTUALIZACION de los datos personales de una MANICURISTA
router.post("/datos-perfil", getDatosPerfil)
//JSON DE PRUEBA
/*
    {
        "tipo": 2,
        "idUsuario": 5
    }
*/

//Creamos la ruta para la ACTUALIZACION de los datos personales de una MANICURISTA
router.post("/update-foto-usuario", updateFotoUsuario)
//JSON DE PRUEBA
/*
    {
        "idUsario": 12,
        "urlImagen": "https://images.pexels.com/photos/31449901/pexels-photo-31449901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
*/

//Creamos la ruta para la ACTUALIZACION de los datos personales de una MANICURISTA
router.put("/update-datos-pers-manicurista/:id", updateDatosPersManicurista)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Manicurista actualizada",
        "apellidos": "Actualizada",
        "telefono": "600000000"
    }
*/

//Creamos la ruta para la ACTUALIZACION de los datos personales de un CLIENTE
router.put("/update-datos-pers-cliente/:id", updateDatosPersCliente)
//JSON DE PRUEBA
/*
    {
        "url_imagen": "",
        "nombre": "Cliente1",
        "apellidos": "Actualizado",
        "telefono": "611111111",
        "direccion_envio": "direccion actualizada"
    }
*/

//Creamos la ruta para la ELIMINACION de un CLIENTE
router.delete("/delete-cliente/:idCliente", deleteCliente)
//JSON DE PRUEBA
/*
    {
        "idCliente": 5
    }
*/

export default router;