import express from "express"; //Importamos la libreria 'express'
import {nuevaOpinion, getOpiniones} from "./../controllers/opinionesController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la INSERCION de una nueva OPINION
router.post("/nueva-opinion", nuevaOpinion)
//JSON DE PRUEBA
/*
    {
        "idCliente": 8,
        "titulo": "Opinion prueba",
        "descripcion": "Descripcion opinion",
        "estrellas": 4
    }
*/

//Creamos la ruta para la OBTENCION de las opiniones
router.get("/get-opiniones", getOpiniones)
//JSON DE PRUEBA
/*
    {
        "estrellas": 0,
        "antiguedad": "recientes"
    }
*/

export default router;