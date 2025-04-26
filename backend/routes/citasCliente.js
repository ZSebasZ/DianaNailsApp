import express from "express"; //Importamos la libreria 'express'
import {getCitasCliente, deleteCitaCliente} from "./../controllers/citasClienteController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de las CITAS de un CLIENTE
router.get("/get-citas-cliente/:idCliente", getCitasCliente)
//JSON DE PRUEBA
/*
    {
        "idCliente": 8
    }
*/

//Creamos la ruta para la OBTENCION de las CITAS de un CLIENTE
router.delete("/delete-cita-cliente/:idCliente/:idCita", deleteCitaCliente)
//JSON DE PRUEBA
/*
    {
        "idCliente": 8,
        "idCita": 1
    }
*/

export default router;