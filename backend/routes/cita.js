import express from "express"; //Importamos la libreria 'express'
import {getPrecioTotalHorasRequeridas, getHorasDisponiblesManicuristasDisponibles, nuevaCita} from "./../controllers/citaController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION del PRECIO TOTAL y HORAS REQUERIDAS de los SERVICIOS seleccionados
router.get("/get-preciot-horsreqs", getPrecioTotalHorasRequeridas)

//Creamos la ruta para la OBTENCION de las HORAS y MANICURISTAS disponibles para la CITA
router.post("/get-hors-mancrts-disponibles", getHorasDisponiblesManicuristasDisponibles)

//Creamos la ruta para INSERTAR una CITA
router.post("/nueva-cita", nuevaCita)

export default router;