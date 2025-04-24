import express from "express"; //Importamos la libreria 'express'
import {getPrecioTotalHorasRequeridas, getHorasDisponiblesManicuristasDisponibles, nuevaCita} from "./../controllers/citaController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION del PRECIO TOTAL y HORAS REQUERIDAS de los SERVICIOS seleccionados
router.get("/get-preciot-horsreqs", getPrecioTotalHorasRequeridas)
//JSON DE PRUEBA
/*
    {
        "servicios": [1, 2, 3, 4]
    }
*/

//Creamos la ruta para la OBTENCION de las HORAS y MANICURISTAS disponibles para la CITA
router.get("/get-hors-mancrts-disponibles", getHorasDisponiblesManicuristasDisponibles)
//JSON DE PRUEBA
/*
    {
        "idCliente": 5,
        "fecha": "2025-04-27",
        "servicios": [1, 2]
    }
*/

//Creamos la ruta para INSERTAR una CITA}
router.post("/nueva-cita", nuevaCita)
//JSON DE PRUEBA
/*
    {
        "idCliente": 5,
        "servicios": [1, 2],
        "fecha": "2025-04-27",
        "idHora": 1,
        "idManicurista": 2,
        "precio": 10
    }
*/

export default router;