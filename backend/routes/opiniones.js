import express from "express"; //Importamos la libreria 'express'
import {nuevaOpinion, getOpiniones} from "./../controllers/opinionesController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la INSERCION de una nueva OPINION
router.post("/nueva-opinion", nuevaOpinion)

//Creamos la ruta para la OBTENCION de las opiniones
router.get("/get-opiniones", getOpiniones)

export default router;