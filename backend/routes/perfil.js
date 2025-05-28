import express from "express"; //Importamos la libreria 'express'
import { getDatosPerfil, updateFotoUsuario, updateDatosPersManicurista, updateDatosPersCliente, deleteCliente} from "./../controllers/perfilController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de los datos personales
router.post("/datos-perfil", getDatosPerfil)

//Creamos la ruta para la ACTUALIZACION de la FOTO de un USUARIO
router.post("/update-foto-usuario", updateFotoUsuario)

//Creamos la ruta para la ACTUALIZACION de los datos personales de una MANICURISTA
router.put("/update-datos-pers-manicurista/:id", updateDatosPersManicurista)

//Creamos la ruta para la ACTUALIZACION de los datos personales de un CLIENTE
router.put("/update-datos-pers-cliente/:id", updateDatosPersCliente)

//Creamos la ruta para la ELIMINACION de un CLIENTE
router.delete("/delete-cliente", deleteCliente)

export default router;