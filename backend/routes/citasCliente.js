import express from "express"; //Importamos la libreria 'express'
import {getCitasCliente} from "./../controllers/citasClienteController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de las CITAS de un CLIENTE
router.get("/get-citas-cliente/:id", getCitasCliente)
//JSON DE PRUEBA
/*
    {
        "idCliente": 8
    }
*/

export default router;