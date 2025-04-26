import express from "express"; //Importamos la libreria 'express'
import {nuevaOpinion} from "./../controllers/opinionesController.js"

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

export default router;